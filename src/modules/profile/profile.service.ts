import { Injectable } from '@nestjs/common';
import { User } from 'src/database/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ChangeProfileAfterSignupDto } from './dto/change-profile-after-signup.dto';
import { Repository } from 'typeorm';
import { AccountStatus } from '../../constants/account-status.enum';
import { AppException } from '../../exceptions/app.exception';

@Injectable()
export class ProfileService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async changeProfileAfterSignup(user: User, body: ChangeProfileAfterSignupDto, file?: Express.Multer.File) {
        if (user.status !== AccountStatus.Pending) {
            throw new AppException(9995);
        }
        user.username = body.username;
        if (file) {
            user.avatar = `${process.env.APP_URL}/files/${file.filename}`;
        }
        user.status = AccountStatus.Active;
        await this.userRepository.save(user);

        return {
            id: String(user.id),
            username: user.username,
            email: user.email,
            created: user.createdAt,
            avatar: user.avatar || '',
        };
    }
}
