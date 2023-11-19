import { Body, Controller, HttpCode, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AddPostDto, addPostFilesValidator } from './dto/add-post.dto';
import { Auth } from '../../auth/decorators/auth.decorator';
import { AuthUser } from '../../auth/decorators/user.decorator';
import { User } from '../../database/entities/user.entity';
import { PostService } from './post.service';
import { GetPostDto } from './dto/get-post.dto';
import { GetListPostsDto } from './dto/get-list-posts.dto';
import { EditPostDto } from './dto/edit-post.dto';
import { GetListVideosDto } from './dto/get-list-videos.dto';
import { DeletePostDto } from './dto/delete-post.dto';
import { ReportPostDto } from './dto/report-post.dto';

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

    @Post('get_list_posts')
    @HttpCode(200)
    async getListPosts(@AuthUser() user: User, @Body() body: GetListPostsDto) {
        return this.postService.getListPosts(user, body);
    }

    @Post('edit_post')
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(
        FileFieldsInterceptor([
            { name: 'image', maxCount: 20 },
            { name: 'video', maxCount: 1 },
        ]),
    )
    @HttpCode(200)
    async editPost(
        @AuthUser() user: User,
        @Body() body: EditPostDto,
        @UploadedFiles(addPostFilesValidator) { image, video },
    ) {
        return this.postService.editPost(user, body, image, video?.[0]);
    }

    @Post('get_list_videos')
    @HttpCode(200)
    async getListVideos(@AuthUser() user: User, @Body() body: GetListVideosDto) {
        return this.postService.getListVideos(user, body);
    }

    @Post('delete_post')
    @HttpCode(200)
    async deletePost(@AuthUser() user: User, @Body() body: DeletePostDto) {
        return this.postService.deletePost(user, body);
    }

    @Post('report_post')
    @HttpCode(200)
    async reportPost(@AuthUser() user: User, @Body() body: ReportPostDto) {
        return this.postService.reportPost(user, body);
    }
}
