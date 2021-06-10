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
exports.Player = void 0;
const Consts_1 = require("../../Utils/Consts");
const Logger_1 = require("../../Utils/Logger");
const axios_1 = __importDefault(require("axios"));
const uuid_1 = require("uuid");
class Player {
    constructor(superThis) {
        this.superThis = superThis;
    }
    GetCurrentPlayer() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { data } = yield axios_1.default.get(`${Consts_1.Url.Api.Endpoint}${Consts_1.Url.Api.GetCurrentPlayer}`, {
                    headers: {
                        "x-access-token": this.superThis.Authentication.gameToken
                    }
                });
                Logger_1.Log("GetCurrentPlayer", data);
                return data.data;
            }
            catch (e) {
                if (e && e.response) {
                    throw e.response.data.msg;
                }
                else
                    throw e;
            }
        });
    }
    GetMemberData(memberId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { data } = yield axios_1.default.get(`${Consts_1.Url.Api.Endpoint}${Consts_1.Url.Api.GetCurrentPlayer}/${memberId}`, {
                    headers: {
                        "x-access-token": this.superThis.Authentication.gameToken
                    }
                });
                Logger_1.Log("GetCurrentPlayer", data);
                return data;
            }
            catch (e) {
                if (e && e.response) {
                    throw e.response.data.msg;
                }
                else
                    throw e;
            }
        });
    }
    GetLastLoginMemberInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { data } = yield axios_1.default.post(`${Consts_1.Url.Api.Endpoint}${Consts_1.Url.Api.LastLoginInfo}`, {
                    "game": this.superThis.ClientID,
                    "secret": this.superThis.ClientSecret,
                    "device_id": uuid_1.v4()
                }, {
                    headers: {
                        "x-access-token": this.superThis.Authentication.gameToken
                    }
                });
                Logger_1.Log("GetLastLoginMemberInfo", data);
                return data;
            }
            catch (e) {
                if (e && e.response) {
                    throw e.response.data.msg;
                }
                else
                    throw e;
            }
        });
    }
    EditCurrentPlayerProfile(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { data } = yield axios_1.default.put(`${Consts_1.Url.Api.Endpoint}${Consts_1.Url.Api.GetCurrentPlayer}`, {
                // "":input.
                }, {
                    headers: {
                        "x-access-token": this.superThis.Authentication.gameToken
                    }
                });
                Logger_1.Log("EditCurrentPlayerProfile", data);
                return data;
            }
            catch (e) {
                if (e && e.response) {
                    throw e.response.data.msg;
                }
                else
                    throw e;
            }
        });
    }
    ChangePassword(currentPassword, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { data } = yield axios_1.default.post(`${Consts_1.Url.Api.Endpoint}${Consts_1.Url.Api.GetCurrentUser}/changepassword`, {
                    "old_password": currentPassword,
                    "new_password": newPassword
                }, {
                    headers: {
                        "x-access-token": this.superThis.Authentication.gameToken
                    }
                });
                Logger_1.Log("ChangePassword", data);
                return data.data;
            }
            catch (e) {
                if (e && e.response) {
                    throw e.response.data.msg;
                }
                else
                    throw e;
            }
        });
    }
    GetActiveDevices() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { data } = yield axios_1.default.get(`${Consts_1.Url.Api.Endpoint}${Consts_1.Url.Api.Devices}`, {
                    headers: {
                        "x-access-token": this.superThis.Authentication.gameToken
                    }
                });
                Logger_1.Log("GetActiveDevices", data);
                return data;
            }
            catch (e) {
                console.error(e);
                if (e && e.response) {
                    throw e.response.data.msg;
                }
                else
                    throw e;
            }
        });
    }
    RevokeActiveDevice(deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { data } = yield axios_1.default.post(`${Consts_1.Url.Api.Endpoint}${Consts_1.Url.Api.Devices}/${deviceId}`, {
                    headers: {
                        "x-access-token": this.superThis.Authentication.gameToken
                    }
                });
                Logger_1.Log("RevokeActiveDevice", data);
                return true;
            }
            catch (e) {
                if (e && e.response) {
                    throw e.response.data.msg;
                }
                else
                    throw e;
            }
        });
    }
}
exports.Player = Player;
//# sourceMappingURL=index.js.map