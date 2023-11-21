import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../../database/entities/comment.entity';
import { User } from '../../database/entities/user.entity';
import { Mark } from '../../database/entities/mark.entity';
import { SetMarkCommentDto } from './dto/set_mark_comment.dto';
import { AppException } from '../../exceptions/app.exception';
import { Post } from '../../database/entities/post.entity';
import { BlockService } from '../block/block.service';
import { costs } from '../../constants/costs.constant';
import { GetMarkCommentDto } from './dto/get_mark_comment.dto';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment)
        private commentRepo: Repository<Comment>,
        @InjectRepository(Mark)
        private markRepo: Repository<Mark>,
        @InjectRepository(Post)
        private postRepo: Repository<Post>,
        @InjectRepository(User)
        private userRepo: Repository<User>,
        private blockService: BlockService,
    ) {}

    async getMarkComment(user: User, body: GetMarkCommentDto) {
        return {};
    }

    async setMarkComment(user: User, { id, content, index, count, mark_id, type }: SetMarkCommentDto) {
        if (mark_id) {
            // comment
            const mark = await this.markRepo.findOne({
                where: { id: mark_id },
                relations: ['post'],
            });

            if (!mark) {
                throw new AppException(9994, 404);
            }

            if (
                (await this.blockService.isBlock(mark.post.authorId, user.id)) ||
                (await this.blockService.isBlock(mark.userId, user.id))
            ) {
                throw new AppException(3001);
            }

            const newComment = new Comment({
                markId: mark_id,
                content,
                userId: user.id,
            });

            await this.commentRepo.save(newComment);
        } else {
            // mark
            const post = await this.postRepo.findOneBy({ id });

            if (!post) {
                throw new AppException(9992, 404);
            }

            if (await this.blockService.isBlock(user.id, post.authorId)) {
                throw new AppException(3001);
            }

            const existingMark = await this.markRepo.findOneBy({ postId: id, userId: user.id });

            let checkReduceCoins = false;
            if (existingMark) {
                if (type && type !== existingMark.type) {
                    existingMark.type = type;
                    checkReduceCoins = true;
                }

                if (content) {
                    existingMark.content = content;
                }

                await this.markRepo.save(existingMark);
            } else {
                if (user.coins < costs.createMark) {
                    throw new AppException(2001);
                }

                const newMark = new Mark({
                    postId: id,
                    content: content,
                    type: type,
                    userId: user.id,
                });

                checkReduceCoins = true;

                await this.markRepo.save(newMark);
            }

            if (checkReduceCoins) {
                user.coins -= costs.createMark;
                await this.userRepo.save(user);
            }
        }

        const markComment = await this.getMarkComment(user, { index, count });

        return {
            ...markComment,
            coins: String(user.coins),
        };
    }
}
