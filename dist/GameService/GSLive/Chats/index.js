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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chats = void 0;
const __1 = require("../..");
const Consts_1 = require("../../../Utils/Consts");
const models_1 = require("../Controllers/Command/models");
const models_2 = require("./models");
class Chats {
    constructor() {
        this.OnSubscribeChannel = (channelName) => { };
        this.OnChatReceived = () => { };
        this.ChannelsSubscribed = () => { };
        this.ChannelsRecentMessages = () => { };
        this.ChannelMembers = () => { };
        this.PendingMessages = () => { };
        this.OnUnSubscribeChannel = () => { };
    }
    SubscribeChannel(channelName) {
        return __awaiter(this, void 0, void 0, function* () {
            let pkt = new models_1.Packet();
            pkt.SetHead(Consts_1.Actions.Command.ActionSubscribe);
            pkt.SetToken(__1.GameService.GSLive.Command.commandToken);
            pkt.SetMsg(channelName);
            pkt.Send();
        });
    }
    SendChannelMessage(channelName, message) {
        return __awaiter(this, void 0, void 0, function* () {
            let payload = new models_2.Message();
            payload.SetTo(channelName);
            payload.SetText(message);
            let pkt = new models_1.Packet();
            pkt.SetHead(Consts_1.Actions.Command.ActionChat);
            pkt.SetToken(__1.GameService.GSLive.Command.commandToken);
            pkt.SetData(payload.ToString());
            pkt.Send();
        });
    }
    SendPrivateMessage(memberID, message) {
        return __awaiter(this, void 0, void 0, function* () {
            let payload = new models_2.Message();
            payload.SetTo(memberID);
            payload.SetText(message);
            let pkt = new models_1.Packet();
            pkt.SetHead(Consts_1.Actions.Command.ActionPrivateChat);
            pkt.SetToken(__1.GameService.GSLive.Command.commandToken);
            pkt.SetData(payload.ToString());
            pkt.Send();
        });
    }
    GetChannelsSubscribed() {
        return __awaiter(this, void 0, void 0, function* () {
            let pkt = new models_1.Packet();
            pkt.SetHead(Consts_1.Actions.Command.ActionGetSubscribedChannels);
            pkt.SetToken(__1.GameService.GSLive.Command.commandToken);
            pkt.Send();
        });
    }
    GetChannelRecentMessages(channelName) {
        return __awaiter(this, void 0, void 0, function* () {
            let payload = new models_1.Data();
            payload.SetID(channelName);
            let pkt = new models_1.Packet();
            pkt.SetHead(Consts_1.Actions.Command.ActionGetLastGroupMessages);
            pkt.SetToken(__1.GameService.GSLive.Command.commandToken);
            pkt.SetData(payload.ToString());
            pkt.Send();
        });
    }
    GetChannelMembers(channelName, skip = 0, limit = 25) {
        return __awaiter(this, void 0, void 0, function* () {
            let payload = new models_1.Data();
            payload.SetID(channelName);
            payload.SetMin(skip);
            payload.SetMax(limit);
            let pkt = new models_1.Packet();
            pkt.SetHead(Consts_1.Actions.Command.ActionGetMembersOfChannel);
            pkt.SetToken(__1.GameService.GSLive.Command.commandToken);
            pkt.SetData(payload.ToString());
            pkt.Send();
        });
    }
    GetPendingMessages() {
        return __awaiter(this, void 0, void 0, function* () {
            let pkt = new models_1.Packet();
            pkt.SetHead(Consts_1.Actions.Command.ActionGetPendingMessages);
            pkt.SetToken(__1.GameService.GSLive.Command.commandToken);
            pkt.Send();
        });
    }
    UnSubscribeChannel(channelName) {
        return __awaiter(this, void 0, void 0, function* () {
            let pkt = new models_1.Packet();
            pkt.SetHead(Consts_1.Actions.Command.ActionUnSubscribe);
            pkt.SetToken(__1.GameService.GSLive.Command.commandToken);
            pkt.SetMsg(channelName);
            pkt.Send();
        });
    }
}
exports.Chats = Chats;
//# sourceMappingURL=index.js.map