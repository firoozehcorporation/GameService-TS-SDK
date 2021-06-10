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
exports.Table = void 0;
const axios_1 = __importDefault(require("axios"));
const Consts_1 = require("../../Utils/Consts");
const Logger_1 = require("../../Utils/Logger");
class Table {
    constructor(superThis) {
        this.superThis = superThis;
    }
    GetTableItems(tableId, isGlobal = false, options = { skip: 0, limit: 25, find: undefined, rowsOwner: undefined, sort: undefined }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let url = `${Consts_1.Url.Api.Endpoint}${Consts_1.Url.Api.Table}${tableId}?skip=${options.skip}&limit=${options.limit}`;
                if (options.rowsOwner && options.rowsOwner != "")
                    url += `&owner=${options.rowsOwner}`;
                if (options.sort && options.sort[0] && options.sort[1] && options.sort[0] != "")
                    url += `&sort=${options.sort[0]}&sortby=${options.sort[1]}`;
                if (options.find && options.find[0] && options.find[1] && options.find[0] != "")
                    url += `&conditionProperty=${options.find[0]}&conditionValue=${options.find[1]}`;
                let { data } = yield axios_1.default.get(url, {
                    headers: {
                        "x-access-token": this.superThis.Authentication.gameToken
                    }
                });
                Logger_1.Log("GetTableItems", data);
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
    Aggrigation(aggrigation) {
    }
    GetTableItem(tableId, itemId, isGlobal = false) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let url = `${Consts_1.Url.Api.Endpoint}${Consts_1.Url.Api.Table}${tableId}/${itemId}`;
                let { data } = yield axios_1.default.get(url, {
                    headers: {
                        "x-access-token": this.superThis.Authentication.gameToken
                    }
                });
                Logger_1.Log("GetTableItem", data);
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
    AddItemToTable(tableId, newItem) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let url = `${Consts_1.Url.Api.Endpoint}${Consts_1.Url.Api.Table}${tableId}`;
                let { data } = yield axios_1.default.post(url, newItem, {
                    headers: {
                        "x-access-token": this.superThis.Authentication.gameToken
                    }
                });
                Logger_1.Log("AddItemToTable", data);
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
    UpdateTableItem(tableId, itemId, editedItem) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let url = `${Consts_1.Url.Api.Endpoint}${Consts_1.Url.Api.Table}${tableId}/${itemId}`;
                let { data } = yield axios_1.default.put(url, editedItem, {
                    headers: {
                        "x-access-token": this.superThis.Authentication.gameToken
                    }
                });
                Logger_1.Log("UpdateTableItem", data);
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
    DeleteTableItem(tableId, itemId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let url = `${Consts_1.Url.Api.Endpoint}${Consts_1.Url.Api.Table}${tableId}/${itemId}`;
                let { data } = yield axios_1.default.delete(url, {
                    headers: {
                        "x-access-token": this.superThis.Authentication.gameToken
                    }
                });
                Logger_1.Log("DeleteTableItem", data);
                return data.status;
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
    DeleteAllTableItems(tableId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let url = `${Consts_1.Url.Api.Endpoint}${Consts_1.Url.Api.Table}${tableId}`;
                let { data } = yield axios_1.default.delete(url, {
                    headers: {
                        "x-access-token": this.superThis.Authentication.gameToken
                    }
                });
                Logger_1.Log("DeleteTableItems", data);
                return data.status;
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
exports.Table = Table;
//# sourceMappingURL=index.js.map