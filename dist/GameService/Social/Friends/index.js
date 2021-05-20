"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Friends = void 0;
class Friends {
    FindMembers(query, skip = 0, limit = 25) {
        return [0, []];
    }
    GetMyFriends(skip = 0, limit = 25) {
        return [0, []];
    }
    GetFriendRequests(skip = 0, limit = 25) {
        return [0, []];
    }
    SendFriendRequest(memberId) {
        return true;
    }
    AcceptFriendRequest(memberId) {
        return true;
    }
    DeleteFriend(memberId) {
        return true;
    }
}
exports.Friends = Friends;
