"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Url = void 0;
var ApiUrls;
(function (ApiUrls) {
    ApiUrls["Endpoint"] = "https://api.gamesservice.ir";
    ApiUrls["Login"] = "/Auth/app/login";
    ApiUrls["Start"] = "/Auth/start";
    ApiUrls["SMSAuth"] = "/Auth/phone";
    ApiUrls["SMSAuthCallback"] = "/Auth/phone/callback";
    ApiUrls["GetCurrentPlayer"] = "/v1/Member";
    ApiUrls["GetCurrentUser"] = "/v1/User";
    ApiUrls["LastLoginInfo"] = "/app/login/info";
    ApiUrls["Devices"] = "/v1/Devices";
    ApiUrls["GetAchievements"] = "/v1/achievement";
    ApiUrls["GetAchievementsv2"] = "/v2/achievement";
    ApiUrls["DownloadAssets"] = "/game/";
    ApiUrls["SaveGame"] = "/v1/savegame/";
    ApiUrls["Leaderboard"] = "/v2/leaderboard/";
})(ApiUrls || (ApiUrls = {}));
var DBaaSUrls;
(function (DBaaSUrls) {
    DBaaSUrls["Endpoint"] = "https://dbaas.gamesservice.ir";
})(DBaaSUrls || (DBaaSUrls = {}));
var CommandUrls;
(function (CommandUrls) {
    CommandUrls["Endpoint"] = "https://command.gamesservice.ir";
})(CommandUrls || (CommandUrls = {}));
let Url = {
    Api: ApiUrls,
    DBaaS: DBaaSUrls,
    Command: CommandUrls,
};
exports.Url = Url;
