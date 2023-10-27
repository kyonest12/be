import { Injectable } from '@nestjs/common';
import { AddPostDto } from './dto/add-post.dto';

@Injectable()
export class PostService {
    // constructor() {}

    async addPost(user_id: number, body: AddPostDto, images: Array<Express.Multer.File>, video: Express.Multer.File) {
        console.log({ user_id, body, images, video });
        return;
    }
}
