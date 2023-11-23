import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CommentService } from './comment.service';
import { AuthUser } from 'src/auth/decorators/user.decorator';
import { User } from 'src/database/entities/user.entity';
import { SetMarkCommentDto } from './dto/set_mark_comment.dto';
import { GetMarkCommentDto } from './dto/get_mark_comment.dto';
import { FeelDto } from './dto/feel.dto';

@Controller()
@ApiTags('Comment')
@Auth()
export class CommentController {
    constructor(private commentService: CommentService) {}

    @Post('/get_mark_comment')
    @HttpCode(200)
    async getMarkComment(@AuthUser() user: User, @Body() body: GetMarkCommentDto) {
        return this.commentService.getMarkComment(user, body);
    }

    @Post('/set_mark_comment')
    @HttpCode(200)
    async setMarkComment(@AuthUser() user: User, @Body() body: SetMarkCommentDto) {
        return this.commentService.setMarkComment(user, body);
    }

    @Post('/feel')
    @HttpCode(200)
    async feel(@AuthUser() user: User, @Body() body: FeelDto) {
        return this.commentService.feel(user, body);
    }
}
