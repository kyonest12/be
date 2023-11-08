import { Controller, Post } from '@nestjs/common';
import { BlockService } from './block.service';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';

@Controller()
@ApiTags('Block')
@Auth()
export class BlockController {
    constructor(private blockService: BlockService) {}

    @Post('/get_list_blocks')
    async getListBlocks() {
        return this.blockService.getListBlocks();
    }

    @Post('/set_block')
    async setBlock() {
        return this.blockService.setBlock();
    }
}
