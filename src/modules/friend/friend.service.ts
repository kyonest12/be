import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Friend } from 'src/database/entities/friend.entity';
import { FriendRequest } from 'src/database/entities/friend-request.entity';
import { Injectable } from '@nestjs/common';
import { User } from 'src/database/entities/user.entity';
import { GetListDto } from './dto/get-list.dto';
import { GetListFriendsDto } from './dto/get-list-friends.dto';
import { SetAcceptFriend } from './dto/set-accept-friend.dto';
import { AppException } from 'src/exceptions/app.exception';
import { SetRequestFriendDto } from './dto/request-friend.dto';

@Injectable()
export class FriendService {
    constructor(
        @InjectRepository(Friend)
        private friendRepo: Repository<Friend>,
        @InjectRepository(FriendRequest)
        private friendRequestRepo: Repository<FriendRequest>,
    ) {}

    async getRequestedFriends(user: User, { index = 0, count = 10 }: GetListDto) {
        const [requestedFriends, total] = await this.friendRequestRepo
            .createQueryBuilder('friendRequest')
            .where({
                targetId: user.id,
            })
            .innerJoinAndSelect('friendRequest.user', 'user')
            .skip(index)
            .take(count)
            .getManyAndCount();

        const requests = requestedFriends.map((requestedFriend) => ({
            id: requestedFriend.user.id,
            username: requestedFriend.user.username,
            avatar: requestedFriend.user.avatar,
            // same_friends
            created: requestedFriend.createdAt,
        }));

        return {
            requests,
            total,
        };
    }

    async setRequestFriend(user: User, { user_id }: SetRequestFriendDto) {
        // kiem tra block

        const newRequest = new FriendRequest({
            userId: user.id,
            targetId: user_id,
        });

        await this.friendRequestRepo.save(newRequest);

        const requestedFriends = await this.friendRequestRepo.countBy({
            userId: user.id,
        });

        return {
            requested_friends: String(requestedFriends),
        };
    }

    async setAcceptFriend(user: User, { user_id, is_accept }: SetAcceptFriend) {
        const request = await this.friendRequestRepo.findOneBy({
            userId: user_id,
            targetId: user.id,
        });

        if (!request) {
            throw new AppException(9994);
        }

        if (is_accept == '1') {
            const newFriend = new Friend({
                friendId: user_id,
                userId: user.id,
            });

            await this.friendRepo.save(newFriend);
        }

        await this.friendRequestRepo.delete(request.id);

        return {};
    }

    async getUserFriends(user: User, { user_id, index, count }: GetListFriendsDto) {
        if (!user_id) {
            const [friends, total] = await this.friendRepo
                .createQueryBuilder('friend')
                .where({
                    userId: user.id,
                })
                .innerJoinAndSelect('friend.friend', 'friend')
                .skip(index)
                .take(count)
                .getManyAndCount();

            return {
                data: {
                    friends,
                    total,
                },
            };
        } else {
            const [friends, total] = await this.friendRepo
                .createQueryBuilder('friend')
                .where({
                    userId: user_id,
                })
                .innerJoinAndSelect('friend.friend', 'friend')
                .skip(index)
                .take(count)
                .getManyAndCount();

            return {
                friends,
                total,
            };
        }
    }

    // async getSuggestedFriends() {
    //     return;
    // }
}
