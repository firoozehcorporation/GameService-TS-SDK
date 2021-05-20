"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Leaderboards = void 0;
class Leaderboards {
    GetLeaderBoards() {
        return [];
    }
    SubmitScore(leaderboardId, score) {
        return new SubmitScoreResponse();
    }
    GetLeaderBoardDetails(leaderboardId, limit, onlyFriends) {
        return new LeaderBoardDetails();
    }
    GetCurrentPlayerScore(leaderboardId) {
    }
}
exports.Leaderboards = Leaderboards;
