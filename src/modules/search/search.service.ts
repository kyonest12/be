import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../../database/entities/post.entity';
import { Repository } from 'typeorm';
import { User } from '../../database/entities/user.entity';
import { SearchDto } from './dto/search.dto';
import { AppException } from '../../exceptions/app.exception';
import { Comment } from '../../database/entities/comment.entity';
import { Search } from '../../database/entities/search.entity';
import { GetSavedSearchDto } from './dto/get-saved-search.dto';
import { DeleteSavedSearchDto } from './dto/delete-saved-search.dto';

@Injectable()
export class SearchService {
    constructor(
        @InjectRepository(Search)
        private searchRepo: Repository<Search>,
        @InjectRepository(Post)
        private postRepo: Repository<Post>,
        @InjectRepository(Comment)
        private commentRepo: Repository<Comment>,
    ) {}

    async search(user: User, { keyword, index, count }: SearchDto) {
        const search = new Search({
            keyword,
            userId: user.id,
        });
        await this.searchRepo.save(search);

        keyword = '%' + keyword.replace(/\s+/g, '%') + '%';
        const query = this.postRepo
            .createQueryBuilder('post')
            .innerJoinAndSelect('post.author', 'author')
            .leftJoinAndSelect('post.images', 'image')
            .leftJoinAndSelect('post.video', 'video')
            .loadRelationCountAndMap('post.feelsCount', 'post.feels', 'feels_count')
            .loadRelationCountAndMap('post.marksCount', 'post.marks', 'marks_count')
            .leftJoinAndMapOne('post.feelOfUser', 'post.feels', 'feel_of_user', 'feel_of_user.userId = :userId', {
                userId: user.id,
            })
            .leftJoinAndSelect('author.blocked', 'blocked', 'blocked.userId = :userId', {
                userId: user.id,
            })
            .leftJoinAndSelect('author.blocking', 'blocking', 'blocking.targetId = :userId', {
                userId: user.id,
            })
            .orderBy({
                'post.id': 'DESC',
                'image.order': 'ASC',
            })
            .where('blocked.id IS NULL')
            .andWhere('blocking.id IS NULL')
            .andWhere('(author.username ILIKE :keyword OR post.description ILIKE :keyword )', { keyword })
            .skip(index)
            .take(count);

        const posts = await query.getMany();

        if (!posts.length) {
            throw new AppException(9994);
        }

        for (const post of posts) {
            if (post.marksCount) {
                post.commentsCount = await this.commentRepo
                    .createQueryBuilder('comment')
                    .innerJoin('comment.mark', 'mark')
                    .where({ 'mark.postId': post.id })
                    .getCount();
            } else {
                post.commentsCount = 0;
            }
        }

        return posts.map((post) => ({
            id: String(post.id),
            name: '',
            image: post.images.map((e) => ({
                id: String(e.order),
                url: e.url,
            })),
            video: post.video ? { url: post.video.url } : undefined,
            described: post.description || '',
            created: post.createdAt,
            feel: String(post.feelsCount),
            mark_comment: String(post.marksCount + post.commentsCount),
            is_felt: post.feelOfUser ? '1' : '0',
            state: post.status || '',
            author: {
                id: String(post.author.id),
                name: post.author.username || '',
                avatar: post.author.avatar || '',
            },
        }));
    }

    async getSavedSearches(user: User, { index, count }: GetSavedSearchDto) {
        const searches = await this.searchRepo.find({
            where: { userId: user.id },
            skip: index,
            take: count,
            order: { id: 'DESC' },
        });

        return searches.map((search) => ({
            id: String(search.id),
            keyword: search.keyword,
            created: search.createdAt,
        }));
    }

    async deleteSavedSearch(user: User, { search_id, all }: DeleteSavedSearchDto) {
        if (all) {
            await this.searchRepo.delete({ userId: user.id });
        } else {
            await this.searchRepo.delete({ userId: user.id, id: search_id });
        }
        return {};
    }
}
