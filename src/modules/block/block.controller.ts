import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { BlockService } from './block.service';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '../../auth/decorators/auth.decorator';
import { AuthUser } from '../../auth/decorators/user.decorator';
import { User } from '../../database/entities/user.entity';
import { GetListBlocks } from './dto/get-list-blocks.dto';
import { SetBlockDto } from './dto/set-block.dto';

@Controller()
@ApiTags('Block')
@Auth()
export class BlockController {
    constructor(private blockService: BlockService) {}

    @Post('/get_list_blocks')
    @HttpCode(200)
    async getListBlocks(@AuthUser() user: User, @Body() body: GetListBlocks) {
        return this.blockService.getListBlocks(user, body);
    }

    @Post('/set_block')
    @HttpCode(200)
    async setBlock(@AuthUser() user: User, @Body() body: SetBlockDto) {
        return this.blockService.setBlock(user, body);
    }
}
