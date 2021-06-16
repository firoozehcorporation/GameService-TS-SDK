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
exports.Friends = void 0;
const __1 = require("../..");
const Consts_1 = require("../../../Utils/Consts");
const Logger_1 = require("../../../Utils/Logger");
const axios_1 = __importDefault(require("axios"));
class Friends {
    constructor() { }
    FindMembers(query, skip = 0, limit = 25) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let url = `${Consts_1.Url.Api.Endpoint}${Consts_1.Url.Api.Friends}?q=${query}&skip=${skip}&limit=${limit}`;
                let { data } = yield axios_1.default.get(url, {
                    headers: {
                        "x-access-token": __1.GameService.Authentication.gameToken
                    }
                });
                Logger_1.Log("FindMembers", data);
                return [data.count, data.list];
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
    GetMyFriends(skip = 0, limit = 25) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let url = `${Consts_1.Url.Api.Endpoint}${Consts_1.Url.Api.Friends}/me?skip=${skip}&limit=${limit}`;
                let { data } = yield axios_1.default.get(url, {
                    headers: {
                        "x-access-token": __1.GameService.Authentication.gameToken
                    }
                });
                Logger_1.Log("GetMyFriends", data);
                return [data.count, data.list];
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
    GetFriendRequests(skip = 0, limit = 25) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let url = `${Consts_1.Url.Api.Endpoint}${Consts_1.Url.Api.Friends}/me/pending?skip=${skip}&limit=${limit}`;
                let { data } = yield axios_1.default.get(url, {
                    headers: {
                        "x-access-token": __1.GameService.Authentication.gameToken
                    }
                });
                Logger_1.Log("GetFriendRequests", data);
                return [data.count, data.list];
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
    SendFriendRequest(memberId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let url = `${Consts_1.Url.Api.Endpoint}${Consts_1.Url.Api.Friends}/${memberId}`;
                let { data } = yield axios_1.default.post(url, undefined, {
                    headers: {
                        "x-access-token": __1.GameService.Authentication.gameToken
                    }
                });
                Logger_1.Log("SendFriendRequest", data);
                return data.status;
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
    AcceptFriendRequest(memberId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let url = `${Consts_1.Url.Api.Endpoint}${Consts_1.Url.Api.Friends}/${memberId}`;
                let { data } = yield axios_1.default.put(url, undefined, {
                    headers: {
                        "x-access-token": __1.GameService.Authentication.gameToken
                    }
                });
                Logger_1.Log("AcceptFriendRequest", data);
                return data.status;
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
    DeleteFriend(memberId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let url = `${Consts_1.Url.Api.Endpoint}${Consts_1.Url.Api.Friends}/${memberId}`;
                let { data } = yield axios_1.default.put(url, undefined, {
                    headers: {
                        "x-access-token": __1.GameService.Authentication.gameToken
                    }
                });
                Logger_1.Log("AcceptFriendRequest", data);
                return data.status;
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
exports.Friends = Friends;
//# sourceMappingURL=index.js.map