"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GSLive = void 0;
class GSLive {
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
