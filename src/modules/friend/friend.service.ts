import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Friend } from '../../database/entities/friend.entity';
import { FriendRequest } from '../../database/entities/friend-request.entity';
import { Injectable } from '@nestjs/common';
import { User } from '../../database/entities/user.entity';
import { GetListDto } from './dto/get-list.dto';
import { GetListFriendsDto } from './dto/get-list-friends.dto';
import { SetAcceptFriend } from './dto/set-accept-friend.dto';
import { AppException } from '../../exceptions/app.exception';
import { SetRequestFriendDto } from './dto/set-request-friend.dto';
import { BlockService } from '../block/block.service';

@Injectable()
export class FriendService {
    constructor(
        @InjectRepository(Friend)
        private friendRepo: Repository<Friend>,
        @InjectRepository(FriendRequest)
        private friendRequestRepo: Repository<FriendRequest>,
        private blockService: BlockService,
    ) {}

    async getRequestedFriends(user: User, { index = 0, count = 5 }: GetListDto) {
        const [requestedFriends, total] = await this.friendRequestRepo
            .createQueryBuilder('friendRequest')
            .where({
                targetId: user.id,
            })
            .innerJoinAndSelect('friendRequest.user', 'user')
            .skip(index)
            .take(count)
            .getManyAndCount();

        return {
            requests: requestedFriends.map(async (requestedFriend) => {
                const numOfSameFriends = await this.countSameFriends(user.id, requestedFriend.user.id);
                return {
                    id: String(requestedFriend.user.id),
                    username: requestedFriend.user.username || '',
                    avatar: requestedFriend.user.avatar || '',
                    same_friends: String(numOfSameFriends),
                    created: requestedFriend.createdAt,
                };
            }),
            total: String(total),
        };
    }

    async setRequestFriend(user: User, { user_id }: SetRequestFriendDto) {
        if (await this.blockService.isBlock(user.id, user_id)) {
            throw new AppException(3001);
        }

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
            const newFriends = [
                new Friend({
                    friendId: user_id,
                    userId: user.id,
                }),
                new Friend({
                    friendId: user.id,
                    userId: user_id,
                }),
            ];

            await this.friendRepo.save(newFriends);
        }

        await this.friendRequestRepo.delete(request.id);

        return {};
    }

    async getUserFriends(user: User, { user_id = user.id, index = 0, count = 5 }: GetListFriendsDto) {
        const [friends, total] = await this.friendRepo
            .createQueryBuilder('friend')
            .innerJoinAndSelect('friend.friend', 'friend')
            .where({ userId: user_id })
            .skip(index)
            .take(count)
            .getManyAndCount();

        return {
            friends: friends.map(async (friend) => {
                const numOfSameFriends = await this.countSameFriends(user.id, friend.user.id);
                return {
                    id: String(friend.friend.id),
                    username: friend.friend.username || '',
                    avatar: friend.friend.avatar || '',
                    same_friends: String(numOfSameFriends),
                    created: friend.friend.createdAt,
                };
            }),
            total: String(total),
        };
    }

    // async getSuggestedFriends() {
    //     return;
    // }

    async countSameFriends(userId: number, targetId: number) {
        const friendOfUser = await this.friendRepo.findBy({
            userId,
        });

        const friendOfTarget = await this.friendRepo.findBy({
            userId: targetId,
        });

        let count = 0;

        friendOfTarget.forEach((targetRecord) => {
            if (targetRecord.friendId != userId) {
                friendOfUser.forEach((userRecord) => {
                    if (targetRecord.friendId == userRecord.friendId) count += 1;
                });
            }
        });

        return count;
    }
}
