"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Leaderboards = void 0;
const axios_1 = __importDefault(require("axios"));
const Consts_1 = require("../../Utils/Consts");
const Logger_1 = require("../../Utils/Logger");
class Leaderboards {
    constructor(superThis) {
        this.superThis = superThis;
    }
    GetLeaderBoards() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { data } = yield axios_1.default.get(`${Consts_1.Url.Api.Endpoint}${Consts_1.Url.Api.Leaderboard}`, {
                    headers: {
                        "x-access-token": this.superThis.Authentication.gameToken
                    }
                });
                Logger_1.Log("GetLeaderBoards", data);
                return data.leaderboard;
            }
            catch (e) {
                console.error(e);
                if (e.response) {
                    throw e.response.data.msg;
                }
                else
                    throw e;
            }
        });
    }
    SubmitScore(leaderboardId, score) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { data } = yield axios_1.default.post(`${Consts_1.Url.Api.Endpoint}${Consts_1.Url.Api.LeaderboardV2}${leaderboardId}`, {
                    "value": score,
                }, {
                    headers: {
                        "x-access-token": this.superThis.Authentication.gameToken
                    }
                });
                Logger_1.Log("SubmitScore", data);
                return data.leaderboard;
            }
            catch (e) {
                if (e.response) {
                    throw e.response.data.msg;
                }
                else
                    throw e;
            }
        });
    }
    GetLeaderBoardDetails(leaderboardId, skip = 0, limit = 25) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { data } = yield axios_1.default.get(`${Consts_1.Url.Api.Endpoint}${Consts_1.Url.Api.LeaderboardV2}${leaderboardId}?skip=${skip}&limit=${limit}`, {
                    headers: {
                        "x-access-token": this.superThis.Authentication.gameToken
                    }
                });
                Logger_1.Log("GetLeaderBoardDetails", data);
                return { scores: data.scores, leaderboard: data.leaderboard };
            }
            catch (e) {
                if (e.response) {
                    throw e.response.data.msg;
                }
                else
                    throw e;
            }
        });
    }
    GetCurrentPlayerScore(leaderboardId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { data } = yield axios_1.default.get(`${Consts_1.Url.Api.Endpoint}${Consts_1.Url.Api.LeaderboardV2}${leaderboardId}/me`, {
                    headers: {
                        "x-access-token": this.superThis.Authentication.gameToken
                    }
                });
                Logger_1.Log("GetCurrentPlayerScore", data);
                return data;
            }
            catch (e) {
                if (e.response) {
                    throw e.response.data.msg;
                }
                else
                    throw e;
            }
        });
    }
}
exports.Leaderboards = Leaderboards;
//# sourceMappingURL=index.js.map