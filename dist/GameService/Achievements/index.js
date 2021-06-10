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
exports.Achievements = void 0;
const Consts_1 = require("../../Utils/Consts");
const Logger_1 = require("../../Utils/Logger");
const axios_1 = __importDefault(require("axios"));
class Achievements {
    constructor(superThis) {
        this.superThis = superThis;
    }
    GetAchievements() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { data } = yield axios_1.default.get(`${Consts_1.Url.Api.Endpoint}${Consts_1.Url.Api.GetAchievements}`, {
                    headers: {
                        "x-access-token": this.superThis.Authentication.gameToken
                    }
                });
                Logger_1.Log("GetAchievements", data);
                return data.achievement;
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
    Unlock(achievementid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { data } = yield axios_1.default.post(`${Consts_1.Url.Api.Endpoint}${Consts_1.Url.Api.GetAchievementsv2}/${achievementid}`, null, {
                    headers: {
                        "x-access-token": this.superThis.Authentication.gameToken
                    }
                });
                Logger_1.Log("Unlock", data);
                return data.new;
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
exports.Achievements = Achievements;
//# sourceMappingURL=index.js.map