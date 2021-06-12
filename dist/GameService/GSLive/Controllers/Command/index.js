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
exports.Command = void 0;
const Consts_1 = require("../../../../Utils/Consts");
const ws_1 = __importDefault(require("ws"));
const models_1 = require("./models");
const models_2 = require("../../Chats/models");
const Logger_1 = require("../../../../Utils/Logger");
const __1 = require("../..");
class Command {
    constructor(superThis) {
        this.superThis = superThis;
        this.commandToken = "";
        this.isInAutoMatchQueue = false;
        this.OnConnect = (e) => {
            // console.log("[Command] [Connected]")
            // Send Auth pkt
            let payload = new models_1.Payload(this.superThis);
            payload.SetGameID(this.superThis.Authentication.gameID);
            payload.SetToken(this.superThis.Authentication.userToken);
            let pkt = new models_1.Packet(this.superThis);
            pkt.SetHead(Consts_1.Actions.Command.ActionAuth);
            pkt.SetData(payload.ToString());
            pkt.Send(false);
        };
        this.OnReceive = (event) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            let packet = new models_1.Packet(this.superThis);
            packet.Parse(event.data, this.superThis.GSLive.Cipher != "" && this.commandToken != "");
            // console.log(packet.Export())
            switch (packet.GetHead()) {
                case Consts_1.Actions.Command.ActionAuth:
                    this.commandToken = packet.GetToken();
                    this.superThis.onReady();
                    break;
                // ---- Chats ---- //
                case Consts_1.Actions.Command.ActionChat:
                    let msgPublic = new models_2.Message(this.superThis);
                    msgPublic.Parse(packet.GetData());
                    this.superThis.GSLive.Chats.OnChatReceived(msgPublic.GetChannel(), msgPublic.GetFrom(), msgPublic.GetText(), false);
                    break;
                case Consts_1.Actions.Command.ActionPrivateChat:
                    let msgPrivate = new models_2.Message(this.superThis);
                    msgPrivate.Parse(packet.GetData());
                    this.superThis.GSLive.Chats.OnChatReceived(msgPrivate.GetChannel(), msgPrivate.GetFrom(), msgPrivate.GetText(), true);
                    break;
                case Consts_1.Actions.Command.ActionSubscribe:
                    this.superThis.GSLive.Chats.OnSubscribeChannel(packet.GetMsg());
                    break;
                case Consts_1.Actions.Command.ActionUnSubscribe:
                    this.superThis.GSLive.Chats.OnUnSubscribeChannel(packet.GetMsg());
                    break;
                case Consts_1.Actions.Command.ActionGetLastGroupMessages:
                    let msgs = JSON.parse(packet.GetData());
                    this.superThis.GSLive.Chats.ChannelsRecentMessages(msgs);
                    break;
                case Consts_1.Actions.Command.ActionGetMembersOfChannel:
                    let members = JSON.parse(packet.GetData());
                    this.superThis.GSLive.Chats.ChannelMembers(members);
                    break;
                case Consts_1.Actions.Command.ActionGetSubscribedChannels:
                    let channels = JSON.parse(packet.GetData());
                    this.superThis.GSLive.Chats.ChannelsSubscribed(channels);
                    break;
                case Consts_1.Actions.Command.ActionGetPendingMessages:
                    let pendings = JSON.parse(packet.GetData());
                    this.superThis.GSLive.Chats.PendingMessages(pendings);
                    break;
                // ---- Create Room ---- //
                case Consts_1.Actions.Command.ActionAutoMatch:
                    let autoMatchInfo;
                    if (packet.GetData() != undefined) {
                        autoMatchInfo = JSON.parse(packet.GetData());
                    }
                    if (packet.GetMsg()) {
                        autoMatchInfo = packet.GetMsg();
                    }
                    this.superThis.GSLive.TurnBased.OnAutoMatchUpdated(autoMatchInfo);
                    this.superThis.GSLive.RealTime.OnAutoMatchUpdated(autoMatchInfo);
                    this.isInAutoMatchQueue = true;
                    break;
                case Consts_1.Actions.Command.LeftWaitingQ:
                    this.superThis.GSLive.TurnBased.OnAutoMatchCanceled(packet.GetMsg() || "");
                    this.superThis.GSLive.RealTime.OnAutoMatchCanceled(packet.GetMsg() || "");
                    this.isInAutoMatchQueue = false;
                    break;
                case Consts_1.Actions.Command.ActionGetRooms:
                    break;
                case Consts_1.Actions.Command.ActionJoinRoom:
                    // connect to relay
                    let start = new models_1.StartGame();
                    start.parse(packet.GetData());
                    if (start.Room["syncMode"] == 1)
                        yield this.superThis.GSLive.TurnbasedController.Initilize(start.Room["_id"], start.Area.Endpoint, start.Area.Port);
                    else
                        yield this.superThis.GSLive.RealTimeController.Initilize(start.Room["_id"], (_a = start.Area) === null || _a === void 0 ? void 0 : _a.Hash, start.Area.Endpoint, start.Area.Port);
                    this.isInAutoMatchQueue = false;
                    break;
                // case Actions.Command.ActionKickUser:
                //     break
                case Consts_1.Actions.Error:
                    console.error(`[Command] [Error] [Msg: ${packet.GetMsg()}]`);
                    break;
            }
        });
        this.onDisconnect = (event) => {
            if (event.wasClean) {
                Logger_1.Log("[Command]", `[close] Connection closed cleanly, code = ${event.code} reason = ${event.reason}`);
            }
            else {
                Logger_1.Log("[Command]", '[close] Connection died');
            }
            this.commandToken = "";
        };
    }
    Initilize(relay) {
        if (relay.ip == undefined || relay.port == undefined)
            return console.error("No valid command returned from HttpServices", { relay });
        if (typeof window === 'undefined') {
            Logger_1.Log("[Command]", `[Node] [Connecting] [${relay.ip}:${relay.port}]`);
            __1.GSLive.CommandConnection = new ws_1.default(`ws://${relay.ip}:${relay.port}`);
        }
        else {
            Logger_1.Log("[Command]", `[Browser] [Connecting] [${relay.port}:${relay.port}]`);
            __1.GSLive.CommandConnection = new WebSocket(`ws://${relay.ip}:${relay.port}`);
        }
        this.superThis.GSLive.Cipher = relay.cipher;
        this.superThis.GSLive.isEncriptionActive = relay.encription != "deactive";
        __1.GSLive.CommandConnection.onopen = this.OnConnect;
        __1.GSLive.CommandConnection.onmessage = this.OnReceive;
        __1.GSLive.CommandConnection.onclose = this.onDisconnect;
        __1.GSLive.CommandConnection.onerror = (err) => {
            throw err;
        };
    }
}
exports.Command = Command;
//# sourceMappingURL=index.js.map