import { FriendRequest } from '../database/entities/friend-request.entity';
import { Friend } from '../database/entities/friend.entity';

export const getIsFriend = (
    friend: Friend | null,
    friendRequested: FriendRequest | null,
    friendRequesting?: FriendRequest | null,
) => {
    if (friend) return '1';
    if (friendRequested) return '2';
    if (friendRequesting) return '3';
    return '0';
};
