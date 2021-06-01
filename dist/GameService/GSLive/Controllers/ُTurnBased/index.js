"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TurnBased = void 0;
const Consts_1 = require("../../../../Utils/Consts");
const models_1 = require("../Command/models");
const models_2 = require("./models");
const ws_1 = __importDefault(require("ws"));
const Logger_1 = require("../../../../Utils/Logger");
class TurnBased {
    constructor(superThis) {
        this.superThis = superThis;
        this.turnbasedToken = "";
        this.RoomID = "";
        this.OnConnect = (e) => {
            // Send Auth pkt
            let payload = new models_1.Payload(this.superThis);
            payload.SetGameID(this.RoomID);
            payload.SetToken(this.superThis.Authentication.gameToken);
            let pkt = new models_2.Packet(this.superThis);
            pkt.SetHead(Consts_1.Actions.TurnBased.ActionAuth);
            pkt.SetData(payload.ToString());
            pkt.Send();
        };
        this.OnReceive = (event) => {
            // Log("[TurnBased]", `[OnReceive]: ${event.data}`);
            var _a;
            let packet = new models_2.Packet(this.superThis);
            packet.Parse(event.data);
            switch (packet.GetHead()) {
                case Consts_1.Actions.TurnBased.ActionAuth:
                    this.turnbasedToken = packet.GetToken();
                    break;
                case Consts_1.Actions.TurnBased.ActionJoin:
                    let joinData = JSON.parse(packet.GetData());
                    let joinDetail = new models_2.JoinDetail();
                    joinDetail.Parse(joinData);
                    this.superThis.GSLive.TurnBased.OnJoinedRoom(joinDetail.Export());
                    break;
                case Consts_1.Actions.TurnBased.ActionTakeTurn:
                    let turnData = JSON.parse(packet.GetData());
                    this.superThis.GSLive.TurnBased.OnTakeTurn(turnData["1"], turnData[0]);
                    break;
                case Consts_1.Actions.TurnBased.ActionChooseNext:
                    let nextData = JSON.parse(packet.GetData());
                    this.superThis.GSLive.TurnBased.OnChoosedNext(nextData);
                    break;
                case Consts_1.Actions.TurnBased.ActionLeave:
                    let member = JSON.parse(packet.GetData());
                    this.superThis.GSLive.TurnBased.OnLeaveRoom(member);
                    if (member.user.isMe) {
                        (_a = TurnBased.Connection) === null || _a === void 0 ? void 0 : _a.close();
                        this.turnbasedToken = "";
                        this.RoomID = "";
                        TurnBased.Connection = undefined;
                    }
                    break;
                case Consts_1.Actions.TurnBased.ActionVote:
                    let voteDetail = JSON.parse(packet.GetData());
                    let vote = new models_2.VoteDetail();
                    vote.Parse(voteDetail);
                    this.superThis.GSLive.TurnBased.OnVoteReceived(vote.Member, vote.Outcomes);
                    break;
                case Consts_1.Actions.TurnBased.ActionAcceptVote:
                    let result = JSON.parse(packet.GetData());
                    this.superThis.GSLive.TurnBased.OnComplete(result);
                    break;
                case Consts_1.Actions.TurnBased.ActionGetUsers:
                    let members = JSON.parse(packet.GetData());
                    this.superThis.GSLive.TurnBased.OnRoomMembersDetailReceived(members);
                    break;
                case Consts_1.Actions.TurnBased.ActionCurrentTurnDetail:
                    let currentTurn = JSON.parse(packet.GetData());
                    this.superThis.GSLive.TurnBased.OnCurrentTurnMember(currentTurn);
                    break;
                case Consts_1.Actions.TurnBased.ModifyValue:
                    let value = JSON.parse(packet.GetData());
                    let propertyChange = new models_2.PropertyChange();
                    propertyChange.Parse(value);
                    this.superThis.GSLive.TurnBased.OnPropertyUpdated(propertyChange);
                    break;
                case Consts_1.Actions.TurnBased.GetRoomInfo:
                    let roomInfoS = JSON.parse(packet.GetData());
                    let roomInfo = new models_2.Room();
                    roomInfo.Parse(roomInfoS);
                    this.superThis.GSLive.TurnBased.OnCurrentRoomInfoReceived(roomInfo.Export());
                    break;
                case Consts_1.Actions.Error:
                    console.error(`[Error] [Msg: ${packet.GetMsg()}]`);
                    break;
            }
        };
        this.onDisconnect = (event) => {
            if (event.wasClean) {
                Logger_1.Log("[TurnBased]", `[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
            }
            else {
                // e.g. server process killed or network down event.code is usually 1006 in this case
                Logger_1.Log("[TurnBased]", '[close] Connection died');
            }
            this.turnbasedToken = "";
        };
    }
    Initilize(RoomID, Endpoint, Port) {
        Logger_1.Log("[TurnBased]", `[Connecting] [${RoomID}] [ws://${Endpoint}:${Port}]`);
        this.RoomID = RoomID;
        if (typeof window === 'undefined') {
            Logger_1.Log("[TurnBased]", `[Node] [Connecting] [ws://${Endpoint}:${Port}]`);
            TurnBased.Connection = new ws_1.default(`ws://${Endpoint}:${Port}`);
        }
        else {
            Logger_1.Log("[TurnBased]", `[Browser] [Connecting] [ws://${Endpoint}:${Port}]`);
            TurnBased.Connection = new WebSocket(`ws://${Endpoint}:${Port}`);
        }
        TurnBased.Connection.onopen = this.OnConnect;
        TurnBased.Connection.onmessage = this.OnReceive;
        TurnBased.Connection.onclose = this.onDisconnect;
        TurnBased.Connection.onerror = (err) => {
            throw err;
        };
    }
}
exports.TurnBased = TurnBased;
TurnBased.Connection = undefined;
