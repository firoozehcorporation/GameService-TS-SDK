"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutoMatchOptions = exports.CreateRoomOptions = exports.PropertyType = exports.Data = void 0;
class Data {
    constructor(superThis) {
        this.superThis = superThis;
    }
    Cast() {
        return {
            "0": this.Head,
            "1": this.ID,
            "2": this.Data,
            "3": this.Next,
            "4": this.Outcomes,
            "5": this.Private,
        };
    }
    ToString() {
        return JSON.stringify(this.Cast());
    }
}
exports.Data = Data;
var PropertyType;
(function (PropertyType) {
    PropertyType["Room"] = "room";
    PropertyType["Member"] = "member";
})(PropertyType = exports.PropertyType || (exports.PropertyType = {}));
class CreateRoomOptions {
    constructor() {
        this.roomName = "default";
        this.role = "default";
        this.minPlayer = 2;
        this.maxPlayer = 2;
        this.isPrivate = false;
        this.isPersist = false;
        this.role = "default";
        this.minPlayer = 2;
        this.maxPlayer = 2;
        this.isPersist = false;
        this.extra = undefined;
        this.isPrivate = false;
        this.roomPassword = undefined;
        this.roomName = "default";
    }
}
exports.CreateRoomOptions = CreateRoomOptions;
class AutoMatchOptions {
    constructor() {
        this.role = "default";
        this.minPlayer = 2;
        this.maxPlayer = 2;
        this.isPersist = false;
        this.role = "default";
        this.minPlayer = 2;
        this.maxPlayer = 2;
        this.isPersist = false;
        this.extra = null;
    }
}
exports.AutoMatchOptions = AutoMatchOptions;
