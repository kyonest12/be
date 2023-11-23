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
import { concurrent } from '../../utils/concurrent.util';
import { isNotEmpty } from 'class-validator';
import { UnwrapResponse } from '../../utils/unwrap-response.util';
import { FeelDto } from './dto/feel.dto';
import { Feel } from '../../database/entities/feel.entity';
import { FeelType } from '../../constants/feel-type.enum';

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
        @InjectRepository(Feel)
        private feelRepo: Repository<Feel>,
        private blockService: BlockService,
    ) {}

    async getMarkComment(user: User, { id, index, count }: GetMarkCommentDto) {
        const post = await this.postRepo.findOneBy({ id });

        if (!post) {
            throw new AppException(9992, 404);
        }

        if (await this.blockService.isBlock(user.id, post.authorId)) {
            throw new AppException(3001);
        }

        const marks = await this.markRepo
            .createQueryBuilder('mark')
            .innerJoinAndSelect('mark.user', 'user')
            .leftJoinAndSelect('user.blocked', 'blocked', 'blocked.userId = :userId', {
                userId: user.id,
            })
            .leftJoinAndSelect('user.blocking', 'blocking', 'blocking.targetId = :userId', {
                userId: user.id,
            })
            .orderBy({ 'mark.id': 'DESC' })
            .where({ postId: id })
            .andWhere('blocked.id IS NULL')
            .andWhere('blocking.id IS NULL')
            .skip(index)
            .take(count)
            .getMany();

        await concurrent(
            marks.map((mark) => async () => {
                mark.comments = await this.commentRepo
                    .createQueryBuilder('comment')
                    .innerJoinAndSelect('comment.user', 'user')
                    .leftJoinAndSelect('user.blocked', 'blocked', 'blocked.userId = :userId', {
                        userId: user.id,
                    })
                    .leftJoinAndSelect('user.blocking', 'blocking', 'blocking.targetId = :userId', {
                        userId: user.id,
                    })
                    .orderBy({ 'comment.id': 'ASC' })
                    .where({ markId: mark.id })
                    .andWhere('blocked.id IS NULL')
                    .andWhere('blocking.id IS NULL')
                    .getMany();
            }),
        );

        return marks.map((mark) => ({
            id: String(mark.id),
            mark_content: mark.content,
            type_of_mark: String(mark.type),
            created: mark.createdAt,
            poster: {
                id: String(mark.user.id),
                name: mark.user.username || '',
                avatar: mark.user.avatar || '',
            },
            comments: mark.comments.map((comment) => ({
                content: comment.content,
                created: comment.createdAt,
                poster: {
                    id: String(comment.user.id),
                    name: comment.user.username || '',
                    avatar: comment.user.avatar || '',
                },
            })),
        }));
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
                if (isNotEmpty(type) && type !== existingMark.type) {
                    if (user.coins < costs.createMark) {
                        throw new AppException(2001);
                    }

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

        return new UnwrapResponse({
            data: await this.getMarkComment(user, { id, index, count }),
            coins: String(user.coins),
        });
    }

    async feel(user: User, { id, type }: FeelDto) {
        const post = await this.postRepo.findOneBy({ id });

        if (!post) {
            throw new AppException(9992, 404);
        }

        if (await this.blockService.isBlock(user.id, post.authorId)) {
            throw new AppException(3001);
        }

        let feel = await this.feelRepo.findOneBy({ postId: id, userId: user.id });

        let checkReduceCoins = false;
        if (feel) {
            if (type !== feel.type) {
                checkReduceCoins = true;
                feel.type = type;
            }
        } else {
            checkReduceCoins = true;

            feel = new Feel({
                postId: post.id,
                userId: user.id,
                type,
            });
        }

        if (checkReduceCoins) {
            if (user.coins < costs.createFeel) {
                throw new AppException(2001);
            }

            user.coins -= costs.createFeel;

            await this.userRepo.save(user);

            await this.feelRepo.save(feel);
        }

        const [disappointed, kudos] = await Promise.all([
            this.feelRepo.countBy({ postId: id, type: FeelType.Disappointed }),
            this.feelRepo.countBy({ postId: id, type: FeelType.Kudos }),
        ]);

        return {
            disappointed: String(disappointed),
            kudos: String(kudos),
        };
    }
}
