import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Friend } from 'src/database/entities/friend.entity';
import { FriendRequest } from 'src/database/entities/friend-request.entity';
import { Injectable } from '@nestjs/common';
import { User } from 'src/database/entities/user.entity';
import { GetListDto } from './dto/get-list.dto';
import { GetListFriendsDto } from './dto/get-list-friends.dto';

@Injectable()
export class FriendService {
    constructor(
        @InjectRepository(Friend)
        private friendRepo: Repository<Friend>,
        @InjectRepository(FriendRequest)
        private friendRequestRepo: Repository<FriendRequest>,
    ) {}

    async getRequestedFriends(target: User, body: GetListDto) {
        /**
         * process the token: How can we verify the token?
         * transform the parameters "index" and "count" -> "skip" and "take"
         * get number of same friends between two users
         */

        const { token, index, count } = body;

        const [requestedFriends, total] = await this.friendRequestRepo
            .createQueryBuilder('friendRequest')
            .where({
                targetId: target.id,
            })
            .innerJoinAndSelect('friendRequest.user', 'user')
            .getManyAndCount();

        const requests = requestedFriends.map((requestedFriend) => ({
            id: requestedFriend.user.id,
            username: requestedFriend.user.username,
            avatar: requestedFriend.user.avatar,
            // same_friends
            created: requestedFriend.createdAt,
        }));

        return {
            data: {
                requests,
                total,
            },
        };
    }

    async getUserFriends(user: User, body: GetListFriendsDto) {
        const { user_id, token, index, count } = body;

        /**
         * Process "token"
         * transform "index" and "count"
         */

        if (!user_id) {
            const [friends, total] = await this.friendRepo
                .createQueryBuilder('friend')
                .where({
                    userId: user.id,
                })
                .innerJoinAndSelect('friend.friend', 'friend')
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
                .getManyAndCount();

            return {
                data: {
                    friends,
                    total,
                },
            };
        }
    }

    async setAcceptFriend() {
        return;
    }

    async setRequestFriend() {
        return;
    }

    async getSuggestedFriends() {
        return;
    }
}
