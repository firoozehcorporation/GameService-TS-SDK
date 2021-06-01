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
            // Send Auth pkt
            let payload = new models_1.Payload(this.superThis);
            payload.SetGameID(this.superThis.Authentication.gameID);
            payload.SetToken(this.superThis.Authentication.userToken);
            let pkt = new models_1.Packet(this.superThis);
            pkt.SetHead(Consts_1.Actions.Command.ActionAuth);
            pkt.SetData(payload.ToString());
            pkt.Send();
        };
        this.OnReceive = (event) => __awaiter(this, void 0, void 0, function* () {
            // Log("[Command]", `[OnReceive]: ${ event.data }`);
            var _a;
            let packet = new models_1.Packet(this.superThis);
            packet.Parse(event.data);
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
                    this.superThis.GSLive.Chats.OnUnSubscribeChannel();
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
                    let joinInfo = JSON.parse(packet.GetData());
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
                    console.error(`[Error][Msg: ${packet.GetMsg()}]`);
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
    Initilize() {
        if (typeof window === 'undefined') {
            Logger_1.Log("[Command]", `[Node] [Connecting] [${Consts_1.Url.Command.Endpoint}]`);
            __1.GSLive.CommandConnection = new ws_1.default(Consts_1.Url.Command.Endpoint);
        }
        else {
            Logger_1.Log("[Command]", `[Browser] [Connecting] [${Consts_1.Url.Command.Endpoint}]`);
            __1.GSLive.CommandConnection = new WebSocket(Consts_1.Url.Command.Endpoint);
        }
        __1.GSLive.CommandConnection.onopen = this.OnConnect;
        __1.GSLive.CommandConnection.onmessage = this.OnReceive;
        __1.GSLive.CommandConnection.onclose = this.onDisconnect;
        __1.GSLive.CommandConnection.onerror = (err) => {
            throw err;
        };
    }
}
exports.Command = Command;
