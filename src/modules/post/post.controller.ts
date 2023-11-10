import { Body, Controller, HttpCode, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AddPostDto, addPostFilesValidator } from './dto/add-post.dto';
import { Auth } from '../../auth/decorators/auth.decorator';
import { AuthUser } from '../../auth/decorators/user.decorator';
import { User } from '../../database/entities/user.entity';
import { PostService } from './post.service';
import { GetPostDto } from './dto/get-post.dto';

@Controller()
@ApiTags('Post')
@Auth()
export class PostController {
    constructor(private postService: PostService) {}

    @Post('add_post')
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(
        FileFieldsInterceptor([
            { name: 'image', maxCount: 20 },
            { name: 'video', maxCount: 1 },
        ]),
    )
    @HttpCode(200)
    async addPost(
        @AuthUser() user: User,
        @Body() body: AddPostDto,
        @UploadedFiles(addPostFilesValidator) { image, video },
    ) {
        return this.postService.addPost(user, body, image, video?.[0]);
    }

    @Post('get_post')
    @HttpCode(200)
    async getPost(@AuthUser() user: User, @Body() body: GetPostDto) {
        return this.postService.getPost(user, body);
    }
}
