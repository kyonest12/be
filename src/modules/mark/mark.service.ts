import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../../database/entities/post.entity';
import { Repository } from 'typeorm';
import { Mark } from '../../database/entities/mark.entity';
import { User } from '../../database/entities/user.entity';
import { AppException } from '../../exceptions/app.exception';
import { GetMarkDto } from './dto/get-mark.dto';
import { SetMarkDto } from './dto/set-mark.dto';
import { MarkType } from '../../constants/mark-type.enum';
import { costs } from '../../constants/costs.constant';
import { getIsBlocked } from 'src/utils/get-mark-subdata.util';

@Injectable()
export class MarkService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,
        @InjectRepository(Post)
        private postRepo: Repository<Post>,
        @InjectRepository(Mark)
        private markRepo: Repository<Mark>,
    ) {}

    async getMark(user: User, { id, index = 0, count = 20 }: GetMarkDto) {
        const [marks, total] = await this.markRepo
            .createQueryBuilder('mark')
            .where({ postId: id })
            .innerJoinAndSelect('mark.post', 'post')
            .leftJoinAndSelect('author.blocked', 'blocked', 'blocked.userId = :userId', {
                userId: user.id,
            })
            .leftJoinAndSelect('author.blocking', 'blocking', 'blocking.targetId = :userId', {
                userId: user.id,
            })
            .skip(index)
            .take(count)
            .getManyAndCount();

        if (getIsBlocked(marks)) {
            return {
                id_blocked: '1',
            };
        } else {
            return {
                requests: marks.map((mark) => ({
                    id: String(mark.id),
                    poster: {
                        id: String(mark.poster.id),
                        username: mark.poster.username || '',
                        avatar: mark.poster.avatar || '',
                        created: mark.createdAt,
                    },
                })),
                total: String(total),
            };
        }
    }
}
