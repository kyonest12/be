import { Injectable } from '@nestjs/common';
import { AddPostDto } from './dto/add-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../../database/entities/post.entity';
import { Repository } from 'typeorm';
import { PostVideo } from '../../database/entities/post-video.entity';
import { getFilePath } from '../../utils/get-file-path.util';
import { PostImage } from '../../database/entities/post-image.entity';
import { User } from '../../database/entities/user.entity';
import { AppException } from '../../exceptions/app.exception';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,
        @InjectRepository(Post)
        private postRepo: Repository<Post>,
    ) {}

    async addPost(user: User, body: AddPostDto, images: Array<Express.Multer.File>, video: Express.Multer.File) {
        if (user.coins < 10) {
            throw new AppException(2001);
        }

        const post = new Post({
            authorId: user.id,
            description: body.described,
            status: body.status,
            images: [],
        });
        if (video) {
            post.video = new PostVideo({ url: getFilePath(video) });
        } else if (images.length) {
            post.images = images.map((image, i) => {
                return new PostImage({
                    url: getFilePath(image),
                    order: i,
                });
            });
        }
        user.coins -= 10;

        await this.userRepo.save(user);
        await this.postRepo.save(post);

        return {
            id: String(post.id),
            coins: String(user.coins),
        };
    }
}
