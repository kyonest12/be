import { Injectable } from '@nestjs/common';
import { User } from 'src/database/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ChangeProfileAfterSignupDto } from './dto/change-profile-after-signup.dto';
import { Repository } from 'typeorm';
import { AccountStatus } from '../../constants/account-status.enum';
import { AppException } from '../../exceptions/app.exception';
import { getFilePath } from '../../utils/get-file-path.util';
import { GetUserInfoDto } from './dto/get-user-info.dto';
import { UserInfo } from '../../database/entities/user-info.entity';
import { FriendService } from '../friend/friend.service';
import { Friend } from '../../database/entities/friend.entity';
import { BlockService } from '../block/block.service';
import { SetUserInfoDto } from './dto/set-user-info.dto';

@Injectable()
export class ProfileService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(UserInfo)
        private userInfoRepository: Repository<UserInfo>,
        @InjectRepository(Friend)
        private friendRepository: Repository<Friend>,
        private blockService: BlockService,
    ) {}

    async changeProfileAfterSignup(user: User, body: ChangeProfileAfterSignupDto, file?: Express.Multer.File) {
        if (user.status !== AccountStatus.Pending) {
            throw new AppException(9995);
        }
        user.username = body.username;
        if (file) {
            user.avatar = getFilePath(file);
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

    async getUserInfo(user: User, { user_id }: GetUserInfoDto) {
        // Check blocked
        if (await this.blockService.isBlock(user.id, user_id)) {
            throw new AppException(3001);
        }

        const userInfo = await this.userInfoRepository
            .createQueryBuilder('userInfo')
            .where({
                userId: user_id || user.id,
            })
            .innerJoinAndSelect('userInfo.user', 'user')
            .getOne();

        if (!userInfo) {
            throw new AppException(9995);
        }

        const totalFriends = await this.friendRepository.countBy({ userId: user_id || user.id });
        const isFriend = user_id
            ? await this.friendRepository.findOneBy([
                  {
                      friendId: user_id,
                      userId: user.id,
                  },
              ])
            : true;

        return {
            id: String(userInfo.user.id),
            username: userInfo.user.username || '',
            created: userInfo.user.createdAt,
            description: userInfo.description || '',
            avatar: userInfo.user.avatar || '',
            cover_image: userInfo.coverImage || '',
            link: userInfo.link || '',
            address: userInfo.address || '',
            city: userInfo.city || '',
            country: userInfo.country || '',
            listing: String(totalFriends),
            is_friend: String(isFriend),
            online: '1',
            coins: user_id ? String(userInfo.user.coins) : '',
        };
    }

    async setUserInfo(
        user: User,
        body: SetUserInfoDto,
        avatar?: Express.Multer.File,
        cover_image?: Express.Multer.File,
    ) {
        const updatedUser = await this.userInfoRepository.save(user);
        return {
            avatar: updatedUser.avatar || '',
            cover_image: updatedUser.coverImage || '',
            link: updatedUser.link || '',
            city: updatedUser.city || '',
            country: updatedUser.country || '',
        };
    }
}
