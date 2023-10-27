import { Body, Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AddPostDto, addPostFilesValidator } from './dto/add-post.dto';
import { Auth } from '../../auth/decorators/auth.decorator';
import { AuthUser } from '../../auth/decorators/user.decorator';
import { User } from '../../database/entities/user.entity';
import { PostService } from './post.service';

@Controller()
@ApiTags('Post')
@Auth()
export class PostController {
    constructor(private postService: PostService) {}

    @Post('add_post')
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(
        FileFieldsInterceptor([
            { name: 'images', maxCount: 10 },
            { name: 'video', maxCount: 1 },
        ]),
    )
    async addPost(
        @AuthUser() user: User,
        @Body() body: AddPostDto,
        @UploadedFiles(addPostFilesValidator) { images, video },
    ) {
        return this.postService.addPost(user.id, body, images, video[0]);
    }
}
