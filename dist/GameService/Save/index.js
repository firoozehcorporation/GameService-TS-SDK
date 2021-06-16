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
exports.Save = void 0;
const axios_1 = __importDefault(require("axios"));
const __1 = require("..");
const Consts_1 = require("../../Utils/Consts");
const Logger_1 = require("../../Utils/Logger");
class Save {
    constructor() { }
    Set(saveName, saveData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (typeof saveData === "object")
                    saveData = JSON.stringify(saveData);
                let { data } = yield axios_1.default.post(`${Consts_1.Url.Api.Endpoint}${Consts_1.Url.Api.SaveGame}`, {
                    "data": saveData,
                    "name": saveName
                }, {
                    headers: {
                        "x-access-token": __1.GameService.Authentication.gameToken
                    }
                });
                Logger_1.Log("SetSave", data);
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
    Get(saveName = "") {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { data } = yield axios_1.default.get(`${Consts_1.Url.Api.Endpoint}${Consts_1.Url.Api.SaveGame}${saveName}`, {
                    headers: {
                        "x-access-token": __1.GameService.Authentication.gameToken
                    }
                });
                Logger_1.Log("GetSave", data);
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
    Remove(saveName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { data } = yield axios_1.default.delete(`${Consts_1.Url.Api.Endpoint}${Consts_1.Url.Api.SaveGame}${saveName}`, {
                    headers: {
                        "x-access-token": __1.GameService.Authentication.gameToken
                    }
                });
                Logger_1.Log("RemoveSave", data);
                return true;
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
exports.Save = Save;
//# sourceMappingURL=index.js.map