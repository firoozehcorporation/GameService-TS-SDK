enum ApiUrls {
    // Endpoint = "https://api.gamesservice.ir",
    Endpoint = "http://localhost:4001",

    Login = "/Auth/app/login",
    Start = "/Auth/start",
    SMSAuth = "/Auth/phone",
    SMSAuthCallback = "/Auth/phone/callback",
    GetCurrentPlayer = "/v1/Member",
    GetCurrentUser = "/v1/User",
    LastLoginInfo = "/auth/app/login/info",
    Devices = "/v1/Devices",
    GetAchievements = "/v1/achievement",
    GetAchievementsv2 = "/v2/achievement",
    DownloadAssets = "/game/",
    SaveGame = "/v1/savegame/",
    Leaderboard = "/v1/leaderboard/",
    LeaderboardV2 = "/v2/leaderboard/",
    Table = "/v1/bucket/",
    Friends = "/v1/friends"
}

enum DBaaSUrls {
    Endpoint = "https://dbaas.gamesservice.ir",
}

enum CommandUrls {
    // Endpoint = "wss://command-ws.gamesservice.ir",
    Endpoint = "ws://localhost:3004",
}

enum TurnBasedUrls {
    // Endpoint = "wss://command-ws.gamesservice.ir",
    Endpoint = "ws://localhost:3005",
}

let Url = {
    Api: ApiUrls,
    DBaaS: DBaaSUrls,
    Command: CommandUrls,
    TurnBased: TurnBasedUrls,
}

enum CommandActions {
    ActionAuth = 0,
    ActionAutoMatch = 1,
    ActionCreateRoom = 2,
    ActionGetRooms = 3,
    ActionJoinRoom = 4,
    ActionPing = 5,
    ActionInviteUser = 6,
    ActionKickUser = 7,
    ActionGetInviteList = 8,
    ActionAcceptInvite = 9,
    ActionFindUser = 10,
    ActionNotification = 11,
    ActionInviteNotif = 15,
    ActionMirror = 99,
    LeftWaitingQ = 16,

    // chat service
    ActionSubscribe = 12,
    ActionPrivateChat = 18,
    ActionChat = 13,
    ActionUnSubscribe = 14,
    ActionGetSubscribedChannels = 17,
    ActionGetMembersOfChannel = 19,
    ActionGetLastGroupMessages = 20,
    ActionGetPendingMessages = 21,
}

enum TurnBasedActions {
    ActionAuth = 1,
    ActionPing = 2,
    ActionCreate = 10,
    ActionJoin = 11,
    ActionTakeTurn = 4,
    ActionChooseNext = 5,
    ActionLeave = 6,
    ActionVote = 7,
    ActionComplete = 8,
    ActionGetUsers = 9,
    ActionCurrentTurnDetail = 12,
    ModifyValue = 13,
    ModifyRoomValue = 16,
    GetRoomInfo = 14,
    GetMemberSnapShot = 15,
    Error = 100,
}

let Actions = {
    Command: CommandActions,
    TurnBased: TurnBasedActions,
    Error: 100
}

export { Url, Actions };
