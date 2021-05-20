"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.Authentication = void 0;
const Consts_1 = require("../../Utils/Consts");
const Logger_1 = require("../../Utils/Logger");
const Statistics = __importStar(require("../../Utils/Statistics"));
const index_1 = require("../index");
const uuid_1 = require("uuid");
const axios_1 = __importDefault(require("axios"));
class Authentication {
    Login(Email, Password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { data } = yield axios_1.default.post(`${Consts_1.Url.Api.Endpoint}${Consts_1.Url.Api.Login}`, {
                    "email": Email,
                    "password": Password,
                    "device_id": uuid_1.v4(),
                });
                Logger_1.Log("Login", data);
                Authentication.userToken = data.token;
                this.Start();
                return data.token;
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
    LoginWithToken(Token) {
        Authentication.userToken = Token;
    }
    SignUp(NickName, Email, Password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { data } = yield axios_1.default.post(`${Consts_1.Url.Api.Endpoint}${Consts_1.Url.Api.Login}`, {
                    "mode": "register",
                    "name": NickName,
                    "client_id": index_1.GameService.ClientID,
                    "email": Email,
                    "password": Password,
                    "device_id": uuid_1.v4(),
                });
                Logger_1.Log("SignUp", data);
                Authentication.userToken = data.token;
                this.Start();
                return data.token;
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
    CheckSmsStatus() {
        return true;
    }
    SendLoginCodeSms(PhoneNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { data } = yield axios_1.default.post(`${Consts_1.Url.Api.Endpoint}${Consts_1.Url.Api.SMSAuth}`, {
                    "game": index_1.GameService.ClientID,
                    "secret": index_1.GameService.ClientSecret,
                    "phone_number": PhoneNumber,
                });
                Logger_1.Log("SendLoginCodeSms", data);
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
    LoginOrSignUpWithSms(NickName, PhoneNumber, Code) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { data } = yield axios_1.default.post(`${Consts_1.Url.Api.Endpoint}${Consts_1.Url.Api.SMSAuthCallback}`, {
                    "name": NickName,
                    "code": Code,
                    "phone_number": PhoneNumber,
                    "device_id": uuid_1.v4(),
                });
                Logger_1.Log("SendLoginCodeSms", data);
                return data.token;
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
    LoginAsGuest() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { data } = yield axios_1.default.post(`${Consts_1.Url.Api.Endpoint}${Consts_1.Url.Api.Login}`, {
                    "device_id": uuid_1.v4(),
                });
                Logger_1.Log("LoginAsGuest", data);
                Authentication.userToken = data.token;
                this.Start();
                return data.token;
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
    Start() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { data } = yield axios_1.default.post(`${Consts_1.Url.Api.Endpoint}${Consts_1.Url.Api.Start}`, {
                    "game": index_1.GameService.ClientID,
                    "system_info": Statistics.get(),
                    "secret": index_1.GameService.ClientSecret,
                    "token": Authentication.userToken
                });
                Logger_1.Log("SignUp", data);
                Authentication.gameToken = data.token;
                return data.token;
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
exports.Authentication = Authentication;
Authentication.userToken = "";
Authentication.gameToken = "";
