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
exports.TurnBased = void 0;
const Consts_1 = require("../../../Utils/Consts");
const models_1 = require("./models");
const models_2 = require("../Controllers/\u064FTurnBased/models");
const models_3 = require("../Controllers/Command/models");
class TurnBased {
    constructor(superThis) {
        this.superThis = superThis;
        // Event handlers
        this.OnReconnected = () => { };
        this.OnJoinedRoom = () => { };
        this.OnAutoMatchUpdated = () => { };
        this.OnAutoMatchCanceled = () => { };
        this.OnAvailableRoomsReceived = () => { };
        this.OnFindMemberReceived = () => { };
        this.OnInvitationSent = () => { };
        this.OnInviteInboxReceived = () => { };
        this.OnCurrentRoomInfoReceived = () => { };
        this.OnRoomMembersDetailReceived = () => { };
        this.OnChoosedNext = () => { };
        this.OnTakeTurn = () => { };
        this.OnCurrentTurnMember = () => { };
        this.OnVoteReceived = () => { };
        this.OnComplete = () => { };
        this.OnPropertyUpdated = () => { };
        this.OnLeaveRoom = () => { };
    }
    // Functions
    CreateRoom(options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.superThis.GSLive.Command.commandToken == "")
                throw "User not connected to Command Server";
            if (this.superThis.GSLive.TurnbasedController.RoomID)
                throw "User is already in game room, please left from it first.";
            let data = new models_3.Data(this.superThis);
            data.SetMax(options.maxPlayer);
            data.SetMin(options.minPlayer);
            data.SetName(options.roomName);
            data.SetPassword(options.roomPassword);
            data.SetRole(options.role);
            data.SetPersist(options.isPersist);
            data.SetPrivate(options.isPrivate);
            data.SetExtra(options.extra);
            data.SetSyncMode(1);
            let pkt = new models_3.Packet(this.superThis);
            pkt.SetHead(Consts_1.Actions.Command.ActionCreateRoom);
            pkt.SetToken(this.superThis.GSLive.Command.commandToken);
            pkt.SetData(data.ToString());
            pkt.Send();
        });
    }
    AutoMatch(options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.superThis.GSLive.Command.commandToken == "")
                throw "User not connected to Command Server";
            if (this.superThis.GSLive.Command.isInAutoMatchQueue)
                throw "User is in automatch queue already";
            if (this.superThis.GSLive.TurnbasedController.RoomID)
                throw "User is already in game room, please left from it first.";
            let data = new models_3.Data(this.superThis);
            data.SetMax(options.maxPlayer);
            data.SetMin(options.minPlayer);
            data.SetRole(options.role);
            data.SetPersist(options.isPersist);
            data.SetExtra(options.extra);
            data.SetSyncMode(1);
            let pkt = new models_3.Packet(this.superThis);
            pkt.SetHead(Consts_1.Actions.Command.ActionAutoMatch);
            pkt.SetToken(this.superThis.GSLive.Command.commandToken);
            pkt.SetData(data.ToString());
            pkt.Send();
        });
    }
    CancelAutoMatch() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.superThis.GSLive.Command.commandToken == "")
                throw "User not connected to Command Server";
            if (!this.superThis.GSLive.Command.isInAutoMatchQueue)
                throw "User is not in automatch queue";
            let pkt = new models_3.Packet(this.superThis);
            pkt.SetHead(Consts_1.Actions.Command.LeftWaitingQ);
            pkt.SetToken(this.superThis.GSLive.Command.commandToken);
            pkt.Send();
        });
    }
    GetAvailableRooms(role, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.superThis.GSLive.Command.commandToken == "")
                throw "User not connected to Command Server";
            let data = new models_3.Data(this.superThis);
            data.SetMax(limit);
            data.SetRole(role);
            let pkt = new models_3.Packet(this.superThis);
            pkt.SetHead(Consts_1.Actions.Command.ActionGetRooms);
            pkt.SetToken(this.superThis.GSLive.Command.commandToken);
            pkt.SetData(data.ToString());
            pkt.Send();
        });
    }
    JoinRoom(roomID, extra = undefined, password = undefined) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.superThis.GSLive.Command.commandToken == "")
                throw "User not connected to Command Server";
            if (this.superThis.GSLive.TurnbasedController.RoomID)
                throw "User is already in game room, please left from it first.";
            let data = new models_3.Data(this.superThis);
            data.SetID(roomID);
            data.SetExtra(extra);
            data.SetPassword(password);
            let pkt = new models_3.Packet(this.superThis);
            pkt.SetHead(Consts_1.Actions.Command.ActionJoinRoom);
            pkt.SetToken(this.superThis.GSLive.Command.commandToken);
            pkt.SetData(data.ToString());
            pkt.Send();
        });
    }
    FindMember(query, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.superThis.GSLive.Command.commandToken == "")
                throw "User not connected to Command Server";
            let data = new models_3.Data(this.superThis);
            data.SetUser(query);
            data.SetMax(limit);
            let pkt = new models_3.Packet(this.superThis);
            pkt.SetHead(Consts_1.Actions.Command.ActionFindUser);
            pkt.SetToken(this.superThis.GSLive.Command.commandToken);
            pkt.SetData(data.ToString());
            pkt.Send();
        });
    }
    InviteUser(roomID, userID) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.superThis.GSLive.Command.commandToken == "")
                throw "User not connected to Command Server";
            let data = new models_3.Data(this.superThis);
            data.SetID(roomID);
            data.SetUser(userID);
            let pkt = new models_3.Packet(this.superThis);
            pkt.SetHead(Consts_1.Actions.Command.ActionInviteUser);
            pkt.SetToken(this.superThis.GSLive.Command.commandToken);
            pkt.SetData(data.ToString());
            pkt.Send();
        });
    }
    GetInviteInbox() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.superThis.GSLive.Command.commandToken == "")
                throw "User not connected to Command Server";
            let data = new models_3.Data(this.superThis);
            data.SetSyncMode(1);
            let pkt = new models_3.Packet(this.superThis);
            pkt.SetHead(Consts_1.Actions.Command.ActionGetInviteList);
            pkt.SetToken(this.superThis.GSLive.Command.commandToken);
            pkt.SetData(data.ToString());
            pkt.Send();
        });
    }
    AcceptInvite(inviteID, extra) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.superThis.GSLive.Command.commandToken == "")
                throw "User not connected to Command Server";
            if (this.superThis.GSLive.TurnbasedController.RoomID)
                throw "User is already in game room, please left from it first.";
            let data = new models_3.Data(this.superThis);
            data.SetInvite(inviteID);
            data.SetExtra(extra);
            let pkt = new models_3.Packet(this.superThis);
            pkt.SetHead(Consts_1.Actions.Command.ActionAcceptInvite);
            pkt.SetToken(this.superThis.GSLive.Command.commandToken);
            pkt.SetData(data.ToString());
            pkt.Send();
        });
    }
    GetCurrentRoomInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.superThis.GSLive.TurnbasedController.RoomID.length < 1)
                throw "User is not in any game room";
            let pkt = new models_2.Packet(this.superThis);
            pkt.SetHead(Consts_1.Actions.TurnBased.GetRoomInfo);
            pkt.SetToken(this.superThis.GSLive.TurnbasedController.turnbasedToken);
            pkt.Send();
        });
    }
    GetRoomMembersDetail() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.superThis.GSLive.TurnbasedController.RoomID.length < 1)
                throw "User is not in any game room";
            let pkt = new models_2.Packet(this.superThis);
            pkt.SetHead(Consts_1.Actions.TurnBased.ActionGetUsers);
            pkt.SetToken(this.superThis.GSLive.TurnbasedController.turnbasedToken);
            pkt.Send();
        });
    }
    ChooseNext(whoIsNext = undefined) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.superThis.GSLive.TurnbasedController.RoomID.length < 1)
                throw "User is not in any game room";
            let data = new models_1.Data(this.superThis);
            if (whoIsNext)
                data.Next = whoIsNext;
            let pkt = new models_2.Packet(this.superThis);
            pkt.SetHead(Consts_1.Actions.TurnBased.ActionChooseNext);
            pkt.SetToken(this.superThis.GSLive.TurnbasedController.turnbasedToken);
            pkt.SetData(data.ToString());
            pkt.Send();
        });
    }
    TakeTurn(data, whoIsNext = undefined) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.superThis.GSLive.TurnbasedController.RoomID.length < 1)
                throw "User is not in any game room";
            let dataIn = new models_1.Data(this.superThis);
            if (whoIsNext)
                dataIn.Next = whoIsNext;
            dataIn.Data = data;
            let pkt = new models_2.Packet(this.superThis);
            pkt.SetHead(Consts_1.Actions.TurnBased.ActionTakeTurn);
            pkt.SetToken(this.superThis.GSLive.TurnbasedController.turnbasedToken);
            pkt.SetData(dataIn.ToString());
            pkt.Send();
        });
    }
    GetCurrentTurnMember() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.superThis.GSLive.TurnbasedController.RoomID.length < 1)
                throw "User is not in any game room";
            let pkt = new models_2.Packet(this.superThis);
            pkt.SetHead(Consts_1.Actions.TurnBased.ActionCurrentTurnDetail);
            pkt.SetToken(this.superThis.GSLive.TurnbasedController.turnbasedToken);
            pkt.Send();
        });
    }
    Vote(outcomes) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.superThis.GSLive.TurnbasedController.RoomID.length < 1)
                throw "User is not in any game room";
            let dataIn = new models_1.Data(this.superThis);
            let outcomesS = {};
            Object.keys(outcomes).map(key => {
                outcomesS[key] = {
                    "0": outcomes[key].Rank,
                    "1": `${outcomes[key].Value}`
                };
            });
            dataIn.Outcomes = outcomesS;
            let pkt = new models_2.Packet(this.superThis);
            pkt.SetHead(Consts_1.Actions.TurnBased.ActionVote);
            pkt.SetToken(this.superThis.GSLive.TurnbasedController.turnbasedToken);
            pkt.SetData(dataIn.ToString());
            pkt.Send();
        });
    }
    AcceptVote(memberID) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.superThis.GSLive.TurnbasedController.RoomID.length < 1)
                throw "User is not in any game room";
            let dataIn = new models_1.Data(this.superThis);
            dataIn.ID = memberID;
            let pkt = new models_2.Packet(this.superThis);
            pkt.SetHead(Consts_1.Actions.TurnBased.ActionAcceptVote);
            pkt.SetToken(this.superThis.GSLive.TurnbasedController.turnbasedToken);
            pkt.SetData(dataIn.ToString());
            pkt.Send();
        });
    }
    SetOrUpdateProperty(type, data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.superThis.GSLive.TurnbasedController.RoomID.length < 1)
                throw "User is not in any game room";
            let dataIn = new models_1.Data(this.superThis);
            dataIn.Head = 1;
            if (type === models_1.PropertyType.Room)
                dataIn.Head = 3;
            if (!data.name || data.name.length < 5 || data.name.length > 32)
                throw new Error("name of value should be between 5-32");
            if (!data.value || data.value.length > 1024)
                throw new Error("value of value should less than 1024");
            dataIn.ID = data.name;
            dataIn.Data = data.value;
            let pkt = new models_2.Packet(this.superThis);
            pkt.SetHead(Consts_1.Actions.TurnBased.ModifyValue);
            pkt.SetToken(this.superThis.GSLive.TurnbasedController.turnbasedToken);
            pkt.SetData(dataIn.ToString());
            pkt.Send();
        });
    }
    RemoveProperty(type, name) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.superThis.GSLive.TurnbasedController.RoomID.length < 1)
                throw "User is not in any game room";
            let dataIn = new models_1.Data(this.superThis);
            dataIn.Head = 2;
            if (type === models_1.PropertyType.Room)
                dataIn.Head = 4;
            if (!name || name.length < 5 || name.length > 32)
                throw new Error("name of value should be between 5-32");
            dataIn.ID = name;
            let pkt = new models_2.Packet(this.superThis);
            pkt.SetHead(Consts_1.Actions.TurnBased.ModifyValue);
            pkt.SetToken(this.superThis.GSLive.TurnbasedController.turnbasedToken);
            pkt.SetData(dataIn.ToString());
            pkt.Send();
        });
    }
    LeaveRoom(whoIsNext = undefined) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.superThis.GSLive.TurnbasedController.RoomID.length < 1)
                throw "User is not in any game room";
            let data = new models_1.Data(this.superThis);
            data.Next = whoIsNext;
            let pkt = new models_2.Packet(this.superThis);
            pkt.SetHead(Consts_1.Actions.TurnBased.ActionLeave);
            pkt.SetToken(this.superThis.GSLive.TurnbasedController.turnbasedToken);
            pkt.SetData(data.ToString());
            pkt.Send();
        });
    }
}
exports.TurnBased = TurnBased;
//# sourceMappingURL=index.js.map