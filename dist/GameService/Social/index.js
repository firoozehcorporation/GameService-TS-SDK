"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Social = void 0;
const index_1 = require("./Friends/index");
class Social {
    constructor() {
        this.Friends = new index_1.Friends();
    }
}
exports.Social = Social;
