"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameService = void 0;
const index_1 = require("./Authentication/index");
const Errors_1 = __importDefault(require("../Utils/Errors"));
// import { Assets } from "./Assets/index";
// import { Leaderboards } from "./Leaderboards/index";
// import { Achievements } from "./Achievements/index";
const index_2 = require("./Player/index");
// import { Save } from "./Save/index";
// import { Table } from "./Table/index";
// import { GSLive } from "./GSLive/index";
// import { Social } from "./Social/index";
class GameService {
    constructor(clientId, clientSecret, Verbose = true) {
        this.Authentication = new index_1.Authentication();
        // Assets = new Assets()
        // Achievements = new Achievements()
        // Leaderboards = new Leaderboards()
        this.Player = new index_2.Player();
        if (typeof clientId !== 'string' || typeof clientSecret === 'string')
            throw new Error(Errors_1.default.Internal.InvalidInput);
        GameService.ClientID = clientId;
        GameService.ClientSecret = clientSecret;
        Verbose = Verbose;
    }
    IsAuthenticated() {
        return true;
    }
}
exports.GameService = GameService;
GameService.ClientID = "";
GameService.ClientSecret = "";
GameService.Verbose = false;
