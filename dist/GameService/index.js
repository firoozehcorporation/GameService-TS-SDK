"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameService = void 0;
const index_1 = require("./Authentication/index");
const Errors_1 = __importDefault(require("../Utils/Errors"));
const index_2 = require("./Assets/index");
const index_3 = require("./Leaderboards/index");
const index_4 = require("./Achievements/index");
const index_5 = require("./Player/index");
const index_6 = require("./Save/index");
const index_7 = require("./Table/index");
const index_8 = require("./GSLive/index");
const index_9 = require("./Social/index");
class GameService {
    static Initilize(clientId, clientSecret, Verbose = true) {
        if (typeof clientId !== 'string' || typeof clientSecret !== 'string')
            throw new Error(Errors_1.default.Internal.InvalidInput);
        GameService.ClientID = clientId;
        GameService.ClientSecret = clientSecret;
        GameService.Verbose = Verbose;
        GameService.Authentication = new index_1.Authentication();
        GameService.Assets = new index_2.Assets();
        GameService.Achievements = new index_4.Achievements();
        GameService.Leaderboards = new index_3.Leaderboards();
        GameService.Player = new index_5.Player();
        GameService.Save = new index_6.Save();
        GameService.Table = new index_7.Table();
        GameService.GSLive = new index_8.GSLive();
        GameService.Social = new index_9.Social();
    }
    IsAuthenticated() {
        return GameService.Authentication.gameToken != "";
    }
    IsCommandAvailabe() {
        var _a;
        return ((_a = index_8.GSLive.CommandConnection) === null || _a === void 0 ? void 0 : _a.readyState) === WebSocket.OPEN && GameService.GSLive.Command.commandToken != "";
    }
}
exports.GameService = GameService;
GameService.ClientID = "";
GameService.ClientSecret = "";
GameService.Verbose = false;
// Events
GameService.onReady = () => { };
//# sourceMappingURL=index.js.map