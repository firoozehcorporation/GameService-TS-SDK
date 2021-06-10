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
    constructor(clientId, clientSecret, Verbose = true) {
        this.ClientID = "";
        this.ClientSecret = "";
        this.Verbose = false;
        // Events
        this.onReady = () => { };
        if (typeof clientId !== 'string' || typeof clientSecret !== 'string')
            throw new Error(Errors_1.default.Internal.InvalidInput);
        this.ClientID = clientId;
        this.ClientSecret = clientSecret;
        this.Verbose = Verbose;
        this.Authentication = new index_1.Authentication(this);
        this.Assets = new index_2.Assets(this);
        this.Achievements = new index_4.Achievements(this);
        this.Leaderboards = new index_3.Leaderboards(this);
        this.Player = new index_5.Player(this);
        this.Save = new index_6.Save(this);
        this.Table = new index_7.Table(this);
        this.GSLive = new index_8.GSLive(this);
        this.Social = new index_9.Social(this);
    }
    IsAuthenticated() {
        return this.Authentication.gameToken != "";
    }
    IsCommandAvailabe() {
        var _a;
        return ((_a = index_8.GSLive.CommandConnection) === null || _a === void 0 ? void 0 : _a.readyState) === WebSocket.OPEN && this.GSLive.Command.commandToken != "";
    }
}
exports.GameService = GameService;
//# sourceMappingURL=index.js.map