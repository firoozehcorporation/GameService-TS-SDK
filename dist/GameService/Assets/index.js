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
exports.Assets = void 0;
const Consts_1 = require("../../Utils/Consts");
const Logger_1 = require("../../Utils/Logger");
const axios_1 = __importDefault(require("axios"));
const index_1 = require("../index");
class Assets {
    constructor() { }
    GetAssetInfo(tag) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { data } = yield axios_1.default.get(`${Consts_1.Url.Api.Endpoint}${Consts_1.Url.Api.DownloadAssets}/${index_1.GameService.ClientID}/datapack/?tag=${tag}`, {
                    headers: {
                        "x-access-token": index_1.GameService.Authentication.gameToken
                    }
                });
                Logger_1.Log("GetAssetInfo", data);
                return data.data;
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
exports.Assets = Assets;
//# sourceMappingURL=index.js.map