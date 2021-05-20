"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Social = void 0;
const index_1 = require("./Friends/index");
class Social {
    constructor(superThis) {
        this.superThis = superThis;
        this.Friends = new index_1.Friends(superThis);
    }
}
exports.Social = Social;
