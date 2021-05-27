"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GSLive = void 0;
const index_1 = require("../GSLive/Chats/index");
const index_2 = require("../GSLive/TurnBased/index");
const index_3 = require("../GSLive/RealTime/index");
const Command_1 = require("./Controllers/Command");
const _TurnBased_1 = require("./Controllers/\u064FTurnBased");
const RealTime_1 = require("./Controllers/RealTime");
class GSLive {
    constructor(superThis) {
        this.superThis = superThis;
        // controllers
        this.Command = new Command_1.Command(superThis);
        this.TurnbasedController = new _TurnBased_1.TurnBased(superThis);
        this.RealTimeController = new RealTime_1.RealTime(superThis);
        // functions
        this.TurnBased = new index_2.TurnBased(superThis);
        this.RealTime = new index_3.RealTime(superThis);
        this.Chats = new index_1.Chats(superThis);
    }
    IsCommandAvailable() {
        return true;
    }
    IsTurnBasedAvailable() {
        return true;
    }
    IsRealTimeAvailable() {
        return true;
    }
    GetPing() {
        return 0;
    }
}
exports.GSLive = GSLive;
GSLive.CommandConnection = undefined;
