import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Block } from 'src/database/entities/block.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BlockService {
    constructor(
        @InjectRepository(Block)
        private blockRepo: Repository<Block>,
    ) {}

    async getListBlocks() {
        return;
    }

    async setBlock() {
        return;
    }
}
