"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Actions = exports.Url = void 0;
var ApiUrls;
(function (ApiUrls) {
    // Endpoint = "https://api.gamesservice.ir",
    ApiUrls["Endpoint"] = "http://localhost:4001";
    ApiUrls["Login"] = "/Auth/app/login";
    ApiUrls["Start"] = "/Auth/start";
    ApiUrls["SMSAuth"] = "/Auth/phone";
    ApiUrls["SMSAuthCallback"] = "/Auth/phone/callback";
    ApiUrls["GetCurrentPlayer"] = "/v1/Member";
    ApiUrls["GetCurrentUser"] = "/v1/User";
    ApiUrls["LastLoginInfo"] = "/auth/app/login/info";
    ApiUrls["Devices"] = "/v1/Devices";
    ApiUrls["GetAchievements"] = "/v1/achievement";
    ApiUrls["GetAchievementsv2"] = "/v2/achievement";
    ApiUrls["DownloadAssets"] = "/game/";
    ApiUrls["SaveGame"] = "/v1/savegame/";
    ApiUrls["Leaderboard"] = "/v1/leaderboard/";
    ApiUrls["LeaderboardV2"] = "/v2/leaderboard/";
    ApiUrls["Table"] = "/v1/bucket/";
    ApiUrls["Friends"] = "/v1/friends";
})(ApiUrls || (ApiUrls = {}));
var DBaaSUrls;
(function (DBaaSUrls) {
    DBaaSUrls["Endpoint"] = "https://dbaas.gamesservice.ir";
})(DBaaSUrls || (DBaaSUrls = {}));
var CommandUrls;
(function (CommandUrls) {
    // Endpoint = "wss://command-ws.gamesservice.ir",
    CommandUrls["Endpoint"] = "ws://localhost:3004";
})(CommandUrls || (CommandUrls = {}));
var TurnBasedUrls;
(function (TurnBasedUrls) {
    // Endpoint = "wss://command-ws.gamesservice.ir",
    TurnBasedUrls["Endpoint"] = "ws://localhost:3005";
})(TurnBasedUrls || (TurnBasedUrls = {}));
let Url = {
    Api: ApiUrls,
    DBaaS: DBaaSUrls,
    Command: CommandUrls,
    TurnBased: TurnBasedUrls,
};
exports.Url = Url;
var CommandActions;
(function (CommandActions) {
    CommandActions[CommandActions["ActionAuth"] = 0] = "ActionAuth";
    CommandActions[CommandActions["ActionAutoMatch"] = 1] = "ActionAutoMatch";
    CommandActions[CommandActions["ActionCreateRoom"] = 2] = "ActionCreateRoom";
    CommandActions[CommandActions["ActionGetRooms"] = 3] = "ActionGetRooms";
    CommandActions[CommandActions["ActionJoinRoom"] = 4] = "ActionJoinRoom";
    CommandActions[CommandActions["ActionPing"] = 5] = "ActionPing";
    CommandActions[CommandActions["ActionInviteUser"] = 6] = "ActionInviteUser";
    CommandActions[CommandActions["ActionKickUser"] = 7] = "ActionKickUser";
    CommandActions[CommandActions["ActionGetInviteList"] = 8] = "ActionGetInviteList";
    CommandActions[CommandActions["ActionAcceptInvite"] = 9] = "ActionAcceptInvite";
    CommandActions[CommandActions["ActionFindUser"] = 10] = "ActionFindUser";
    CommandActions[CommandActions["ActionNotification"] = 11] = "ActionNotification";
    CommandActions[CommandActions["ActionInviteNotif"] = 15] = "ActionInviteNotif";
    CommandActions[CommandActions["ActionMirror"] = 99] = "ActionMirror";
    CommandActions[CommandActions["LeftWaitingQ"] = 16] = "LeftWaitingQ";
    // chat service
    CommandActions[CommandActions["ActionSubscribe"] = 12] = "ActionSubscribe";
    CommandActions[CommandActions["ActionPrivateChat"] = 18] = "ActionPrivateChat";
    CommandActions[CommandActions["ActionChat"] = 13] = "ActionChat";
    CommandActions[CommandActions["ActionUnSubscribe"] = 14] = "ActionUnSubscribe";
    CommandActions[CommandActions["ActionGetSubscribedChannels"] = 17] = "ActionGetSubscribedChannels";
    CommandActions[CommandActions["ActionGetMembersOfChannel"] = 19] = "ActionGetMembersOfChannel";
    CommandActions[CommandActions["ActionGetLastGroupMessages"] = 20] = "ActionGetLastGroupMessages";
    CommandActions[CommandActions["ActionGetPendingMessages"] = 21] = "ActionGetPendingMessages";
})(CommandActions || (CommandActions = {}));
var TurnBasedActions;
(function (TurnBasedActions) {
    TurnBasedActions[TurnBasedActions["ActionAuth"] = 1] = "ActionAuth";
    TurnBasedActions[TurnBasedActions["ActionPing"] = 2] = "ActionPing";
    TurnBasedActions[TurnBasedActions["ActionCreate"] = 10] = "ActionCreate";
    TurnBasedActions[TurnBasedActions["ActionJoin"] = 11] = "ActionJoin";
    TurnBasedActions[TurnBasedActions["ActionTakeTurn"] = 4] = "ActionTakeTurn";
    TurnBasedActions[TurnBasedActions["ActionChooseNext"] = 5] = "ActionChooseNext";
    TurnBasedActions[TurnBasedActions["ActionLeave"] = 6] = "ActionLeave";
    TurnBasedActions[TurnBasedActions["ActionVote"] = 7] = "ActionVote";
    TurnBasedActions[TurnBasedActions["ActionComplete"] = 8] = "ActionComplete";
    TurnBasedActions[TurnBasedActions["ActionGetUsers"] = 9] = "ActionGetUsers";
    TurnBasedActions[TurnBasedActions["ActionCurrentTurnDetail"] = 12] = "ActionCurrentTurnDetail";
    TurnBasedActions[TurnBasedActions["ModifyValue"] = 13] = "ModifyValue";
    TurnBasedActions[TurnBasedActions["ModifyRoomValue"] = 16] = "ModifyRoomValue";
    TurnBasedActions[TurnBasedActions["GetRoomInfo"] = 14] = "GetRoomInfo";
    TurnBasedActions[TurnBasedActions["GetMemberSnapShot"] = 15] = "GetMemberSnapShot";
    TurnBasedActions[TurnBasedActions["Error"] = 100] = "Error";
})(TurnBasedActions || (TurnBasedActions = {}));
let Actions = {
    Command: CommandActions,
    TurnBased: TurnBasedActions,
    Error: 100
};
exports.Actions = Actions;
