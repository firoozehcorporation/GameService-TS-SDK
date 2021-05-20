"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Save = void 0;
const models_1 = require("./models");
class Save {
    Set(saveName, data) {
        return new models_1.SaveDetails();
    }
    Get(saveName) {
        return {};
    }
    Remove(saveName) {
        return true;
    }
}
exports.Save = Save;
