import { Post } from '@nestjs/common';
import { FriendService } from './friend.service';

export class FriendController {
    constructor(private friendService: FriendService) {}

    @Post('/get_requested_friends')
    async getRequestedFriends() {
        return this.friendService.getRequestedFriends();
    }

    @Post('/get_user_friends')
    async getUserFriends() {
        return this.friendService.getUserFriends();
    }

    @Post('/set_accept_friend')
    async setAcceptFriend() {
        return this.friendService.setAcceptFriend();
    }

    @Post('/set_request_friend')
    async setRequestFriend() {
        return this.friendService.setRequestFriend();
    }

    @Post('/get_suggested_friends')
    async getSuggestedFriends() {
        return this.friendService.getSuggestedFriends();
    }
}
