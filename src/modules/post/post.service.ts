import { Injectable } from '@nestjs/common';
import { AddPostDto } from './dto/add-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../../database/entities/post.entity';
import { MoreThan, Repository } from 'typeorm';
import { PostVideo } from '../../database/entities/post-video.entity';
import { getFilePath } from '../../utils/get-file-path.util';
import { PostImage } from '../../database/entities/post-image.entity';
import { User } from '../../database/entities/user.entity';
import { AppException } from '../../exceptions/app.exception';
import { GetPostDto } from './dto/get-post.dto';
import { FeelType } from '../../constants/feel-type.enum';
import { MarkType } from '../../constants/mark-type.enum';
import { costs } from '../../constants/costs.constant';
import {
    getBanned,
    getCanEdit,
    getCanMark,
    getCanRate,
    getCategory,
    getIsBlocked,
} from '../../utils/get-post-subdata.util';
import { GetListPostsDto } from './dto/get-list-posts.dto';
import { Comment } from '../../database/entities/comment.entity';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,
        @InjectRepository(Post)
        private postRepo: Repository<Post>,
        @InjectRepository(Comment)
        private commentRepo: Repository<Comment>,
    ) {}

    async addPost(user: User, body: AddPostDto, images?: Array<Express.Multer.File>, video?: Express.Multer.File) {
        if (user.coins < 10) {
            throw new AppException(2001);
        }

        const post = new Post({
            authorId: user.id,
            description: body.described,
            status: body.status,
            images: [],
        });
        if (video) {
            post.video = new PostVideo({ url: getFilePath(video) });
        } else if (images?.length) {
            post.images = images.map((image, i) => {
                return new PostImage({
                    url: getFilePath(image),
                    order: i + 1,
                });
            });
        }
        user.coins -= costs.createPost;

        await this.userRepo.save(user);
        await this.postRepo.save(post);

        return {
            id: String(post.id),
            coins: String(user.coins),
        };
    }

    async getPost(user: User, { id }: GetPostDto) {
        const post = await this.postRepo
            .createQueryBuilder('post')
            .innerJoinAndSelect('post.author', 'author')
            .leftJoinAndSelect('post.images', 'image')
            .leftJoinAndSelect('post.video', 'video')
            .loadRelationCountAndMap('post.kudosCount', 'post.feels', 'feel_kudos', (qb) =>
                qb.where({ type: FeelType.Kudos }),
            )
            .loadRelationCountAndMap('post.disappointedCount', 'post.feels', 'feel_disappointed', (qb) =>
                qb.where({ type: FeelType.Disappointed }),
            )
            .loadRelationCountAndMap('post.trustCount', 'post.marks', 'mark_trust', (qb) =>
                qb.where({ type: MarkType.Trust }),
            )
            .loadRelationCountAndMap('post.fakeCount', 'post.marks', 'mark_fake', (qb) =>
                qb.where({ type: MarkType.Fake }),
            )
            .leftJoinAndMapOne('post.feelOfUser', 'post.feels', 'feel_of_user', 'feel_of_user.userId = :userId', {
                userId: user.id,
            })
            .leftJoinAndMapOne('post.markOfUser', 'post.marks', 'mark_of_user', 'mark_of_user.userId = :userId', {
                userId: user.id,
            })
            .leftJoinAndSelect('author.blocked', 'blocked', 'blocked.userId = :userId', {
                userId: user.id,
            })
            .leftJoinAndSelect('author.blocking', 'blocking', 'blocking.targetId = :userId', {
                userId: user.id,
            })
            .where({ id })
            .getOne();

        if (!post) {
            throw new AppException(9994);
        }

        if (getIsBlocked(post)) {
            return {
                id_blocked: '1',
            };
        } else {
            return {
                id: String(post.id),
                name: '',
                created: post.createdAt,
                described: post.description || '',
                modified: String(post.edited),
                fake: String(post.fakeCount),
                trust: String(post.trustCount),
                kudos: String(post.kudosCount),
                disappointed: String(post.disappointedCount),
                is_rated: post.feelOfUser ? '1' : '0',
                is_marked: post.markOfUser ? '1' : '0',
                image: post.images.map((e) => ({
                    id: String(e.order),
                    url: e.url,
                })),
                video: post.video ? { url: post.video.url } : undefined,
                author: {
                    id: String(post.author.id),
                    name: post.author.username || '',
                    avatar: post.author.avatar || '',
                    coins: String(post.author.coins),
                    listing: '', // TODO: edit versioning
                },
                category: getCategory(post),
                state: post.status || '',
                is_blocked: '0',
                can_edit: getCanEdit(post, user),
                banned: getBanned(post),
                can_mark: getCanMark(post, user),
                can_rate: getCanRate(post, user),
                url: '',
                messages: '',
            };
        }
    }

    async getListPosts(user: User, { last_id, index, count }: GetListPostsDto) {
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
            .orderBy({ 'post.id': 'ASC' })
            .skip(index)
            .take(count);

        if (last_id) {
            query.andWhere('post.id > :lastId', { lastId: last_id });
        }

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

        const lastId = posts.at(-1)?.id as number;
        const newItems = await this.postRepo.countBy({ id: MoreThan(lastId) });

        return {
            post: posts.map((post) => {
                if (getIsBlocked(post)) {
                    return {
                        id_blocked: '1',
                    };
                } else {
                    return {
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
                        comment_mark: String(post.marksCount + post.commentsCount),
                        is_felt: post.feelOfUser ? '1' : '0',
                        is_blocked: '0',
                        can_edit: getCanEdit(post, user),
                        banned: getBanned(post),
                        status: post.status || '',
                        author: {
                            id: String(post.author.id),
                            name: post.author.username || '',
                            avatar: post.author.avatar || '',
                        },
                    };
                }
            }),
            new_items: String(newItems),
            last_id: String(lastId),
        };
    }
}
