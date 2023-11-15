import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Block } from '../../database/entities/block.entity';
import { User } from '../../database/entities/user.entity';
import { GetListBlocks } from './dto/get-list-blocks.dto';
import { SetBlockDto } from './dto/set-block.dto';

@Injectable()
export class BlockService {
    constructor(
        @InjectRepository(Block)
        private blockRepo: Repository<Block>,
    ) {}

    async getListBlocks(user: User, { index = 0, count = 5 }: GetListBlocks) {
        const blocks = await this.blockRepo
            .createQueryBuilder('block')
            .innerJoinAndSelect('block.target', 'target')
            .where({
                userId: user.id,
            })
            .orderBy('target.id', 'ASC')
            .skip(index)
            .take(count)
            .getMany();

        return blocks.map((block) => ({
            id: String(block.target.id),
            name: block.target.username || '',
            avatar: block.target.avatar || '',
        }));
    }

    async setBlock(user: User, { user_id }: SetBlockDto) {
        const newBlock = new Block({
            targetId: user_id,
            userId: user.id,
        });

        await this.blockRepo.save(newBlock);

        return {};
    }

    async isBlock(userId: number, targetId: number) {
        const block = await this.blockRepo.findOneBy([
            { userId, targetId },
            { userId: targetId, targetId: userId },
        ]);

        return Boolean(block);
    }
}
