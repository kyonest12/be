import { Injectable } from '@nestjs/common';
import { User } from 'src/database/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ChangeProfileAfterSignupDto } from './dto/change-profile-after-signup.dto';
import { Repository } from 'typeorm';

@Injectable()
export class ProfileService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async changeProfileAfterSignup(user: User, body: ChangeProfileAfterSignupDto, file: Express.Multer.File) {
        user.username = body.username;
        user.avatar = file.filename;
        return await this.userRepository.save(user);
    }
}
