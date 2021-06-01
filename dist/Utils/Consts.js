"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Actions = exports.Url = void 0;
var ApiUrls;
(function (ApiUrls) {
    ApiUrls["Endpoint"] = "https://api.gamesservice.ir";
    // Endpoint = "http://localhost:4001",
    ApiUrls["Login"] = "/auth/app/login";
    ApiUrls["Start"] = "/auth/start";
    ApiUrls["SMSAuth"] = "/auth/phone";
    ApiUrls["SMSAuthCallback"] = "/Auth/phone/callback";
    ApiUrls["GetCurrentPlayer"] = "/v1/member/";
    ApiUrls["GetCurrentUser"] = "/v1/User";
    ApiUrls["LastLoginInfo"] = "/auth/app/login/info";
    ApiUrls["Devices"] = "/v1/devices";
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
let Url = {
    Api: ApiUrls,
    DBaaS: DBaaSUrls,
    Command: CommandUrls,
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
    TurnBasedActions[TurnBasedActions["ActionAcceptVote"] = 8] = "ActionAcceptVote";
    TurnBasedActions[TurnBasedActions["ActionGetUsers"] = 9] = "ActionGetUsers";
    TurnBasedActions[TurnBasedActions["ActionCurrentTurnDetail"] = 12] = "ActionCurrentTurnDetail";
    TurnBasedActions[TurnBasedActions["ModifyValue"] = 13] = "ModifyValue";
    TurnBasedActions[TurnBasedActions["ModifyRoomValue"] = 16] = "ModifyRoomValue";
    TurnBasedActions[TurnBasedActions["GetRoomInfo"] = 14] = "GetRoomInfo";
    TurnBasedActions[TurnBasedActions["GetMemberSnapShot"] = 15] = "GetMemberSnapShot";
})(TurnBasedActions || (TurnBasedActions = {}));
var RealTimeActions;
(function (RealTimeActions) {
    RealTimeActions[RealTimeActions["ActionAuth"] = 1] = "ActionAuth";
    RealTimeActions[RealTimeActions["ActionData"] = 2] = "ActionData";
    RealTimeActions[RealTimeActions["ActionPublicMessage"] = 3] = "ActionPublicMessage";
    RealTimeActions[RealTimeActions["ActionPrivateMessage"] = 4] = "ActionPrivateMessage";
    RealTimeActions[RealTimeActions["ActionJoin"] = 5] = "ActionJoin";
    RealTimeActions[RealTimeActions["ActionMembersDetail"] = 6] = "ActionMembersDetail";
    RealTimeActions[RealTimeActions["ActionLeave"] = 7] = "ActionLeave";
    RealTimeActions[RealTimeActions["ActionDestroy"] = 8] = "ActionDestroy";
    RealTimeActions[RealTimeActions["ActionStatus"] = 9] = "ActionStatus";
    RealTimeActions[RealTimeActions["ActionMirror"] = 10] = "ActionMirror";
    RealTimeActions[RealTimeActions["ActionEventMessage"] = 11] = "ActionEventMessage";
    RealTimeActions[RealTimeActions["ActionGetRoomSnapshot"] = 12] = "ActionGetRoomSnapshot";
    RealTimeActions[RealTimeActions["ActionObserver"] = 13] = "ActionObserver";
    RealTimeActions[RealTimeActions["ActionRoomInfo"] = 14] = "ActionRoomInfo";
})(RealTimeActions || (RealTimeActions = {}));
let Actions = {
    Command: CommandActions,
    TurnBased: TurnBasedActions,
    RealTime: RealTimeActions,
    Error: 100
};
exports.Actions = Actions;
