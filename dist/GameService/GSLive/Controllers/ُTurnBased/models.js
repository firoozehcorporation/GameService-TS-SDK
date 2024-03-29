"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameResult = exports.VoteDetail = exports.JoinDetail = exports.PropertyChange = exports.Room = exports.Packet = void 0;
const _1 = require(".");
const index_1 = require("../../../index");
const models_1 = require("../../TurnBased/models");
const models_2 = require("../Command/models");
class Packet {
    constructor() {
        this.Send = (encription = true) => {
            let serilized = this.ToString(encription);
            _1.TurnBased.Connection.send(serilized);
        };
    }
    Parse(input, encription = true) {
        let inputJ = JSON.parse(input);
        let data = inputJ["2"];
        let msg = inputJ["3"];
        if (index_1.GameService.GSLive.isEncriptionActive && encription) {
            if (inputJ["2"])
                data = Buffer.from(models_2.Rc4(index_1.GameService.GSLive.Cipher, Buffer.from(inputJ["2"], 'base64').toString("latin1")), "latin1").toString("utf-8");
            if (inputJ["3"] && inputJ["1"] !== 100)
                msg = Buffer.from(models_2.Rc4(index_1.GameService.GSLive.Cipher, Buffer.from(inputJ["3"], 'base64').toString("latin1")), "latin1").toString("utf-8");
        }
        this.SetToken(inputJ["0"]);
        this.SetHead(inputJ["1"]);
        this.SetData(data);
        this.SetMsg(msg);
    }
    GetToken() {
        return this.Token;
    }
    SetToken(Token) {
        this.Token = Token;
    }
    GetHead() {
        return this.Head;
    }
    SetHead(Head) {
        this.Head = Head;
    }
    GetData() {
        return this.Data;
    }
    SetData(Data) {
        this.Data = Data;
    }
    GetMsg() {
        return this.Msg;
    }
    SetMsg(Msg) {
        this.Msg = Msg;
    }
    Cast(encription = true) {
        if (index_1.GameService.GSLive.isEncriptionActive && encription) {
            if (this.Data) {
                let rc4 = models_2.Rc4(index_1.GameService.GSLive.Cipher, Buffer.from(this.Data).toString("utf-8"));
                let data = Buffer.from(rc4, "latin1").toString('base64');
                this.Data = data;
            }
            if (this.Msg) {
                let rc4 = models_2.Rc4(index_1.GameService.GSLive.Cipher, Buffer.from(this.Msg).toString("utf-8"));
                let msg = Buffer.from(rc4, "latin1").toString('base64');
                this.Msg = msg;
            }
        }
        return {
            "0": this.Token,
            "1": this.Head,
            "2": this.Data,
            "3": this.Msg
        };
    }
    ToString(encription = true) {
        return JSON.stringify(this.Cast(encription));
    }
}
exports.Packet = Packet;
class Room {
    constructor() {
        this._Name = "";
        this._Private = false;
        this._Persist = false;
    }
    Parse(inputJ) {
        this.ID = inputJ["1"];
        this.Name = inputJ["2"];
        this.Logo = inputJ["3"];
        this.Creator = inputJ["4"];
        this.Min = inputJ["5"];
        this.Max = inputJ["6"];
        this.Role = inputJ["7"];
        this.Private = inputJ["8"];
        this.Status = inputJ["9"];
        this.NumOfMembers = inputJ["10"];
        this.Variables = inputJ["11"];
        this.Persist = inputJ["12"];
        this.CreatedAt = inputJ["13"];
    }
    get ID() {
        return this._ID;
    }
    set ID(value) {
        this._ID = value;
    }
    get Name() {
        return this._Name;
    }
    set Name(value) {
        this._Name = value;
    }
    get Logo() {
        return this._Logo;
    }
    set Logo(value) {
        this._Logo = value;
    }
    get Creator() {
        return this._Creator;
    }
    set Creator(value) {
        this._Creator = value;
    }
    get Min() {
        return this._Min;
    }
    set Min(value) {
        this._Min = value;
    }
    get Max() {
        return this._Max;
    }
    set Max(value) {
        this._Max = value;
    }
    get Role() {
        return this._Role;
    }
    set Role(value) {
        this._Role = value;
    }
    get Private() {
        return this._Private;
    }
    set Private(value) {
        this._Private = value;
    }
    get Status() {
        return this._Status;
    }
    set Status(value) {
        this._Status = value;
    }
    get NumOfMembers() {
        return this._NumOfMembers;
    }
    set NumOfMembers(value) {
        this._NumOfMembers = value;
    }
    get Variables() {
        return this._Variables;
    }
    set Variables(value) {
        this._Variables = value;
    }
    get Persist() {
        return this._Persist;
    }
    set Persist(value) {
        this._Persist = value;
    }
    get CreatedAt() {
        return this._CreatedAt;
    }
    set CreatedAt(value) {
        this._CreatedAt = value;
    }
    Export() {
        return {
            "ID": this.ID,
            "Name": this.Name,
            "Logo": this.Logo,
            "Creator": this.Creator,
            "Min": this.Min,
            "Max": this.Max,
            "Role": this.Role,
            "Private": this.Private,
            "Status": this.Status,
            "NumOfMembers": this.NumOfMembers,
            "Variables": this.Variables,
            "Persist": this.Persist,
            "CreatedAt": this.CreatedAt,
        };
    }
    Cast() {
        return {
            "1": this.ID,
            "2": this.Name,
            "3": this.Logo,
            "4": this.Creator,
            "5": this.Min,
            "6": this.Max,
            "7": this.Role,
            "8": this.Private,
            "9": this.Status,
            "10": this.NumOfMembers,
            "11": this.Variables,
            "12": this.Persist,
            "13": this.CreatedAt,
        };
    }
    ToString() {
        return JSON.stringify(this.Cast());
    }
}
exports.Room = Room;
class PropertyChange {
    Parse(inputJ) {
        if (inputJ["1"] == 1)
            this.Type = models_1.PropertyType.Room;
        else
            this.Type = models_1.PropertyType.Member;
        if (inputJ["2"] == 3 || inputJ["2"] == 1)
            this.Action = "SetOtUpdate";
        else
            this.Action = "Delete";
        this.Sender = inputJ["3"];
        this.Name = inputJ["4"];
        this.Value = inputJ["5"];
    }
    Export() {
        return {
            "Type": this.Type,
            "Action": this.Action,
            "Sender": this.Sender,
            "Name": this.Name,
            "Value": this.Value,
        };
    }
}
exports.PropertyChange = PropertyChange;
class JoinDetail {
    Parse(inputJ) {
        let room = new Room();
        room.Parse(inputJ["2"]);
        this.JoinType = inputJ["1"];
        this.UserJoined = inputJ["3"];
        this.Room = room;
        this.JoinOrder = inputJ["4"];
    }
    Export() {
        var _a;
        return {
            JoinType: this.JoinType,
            UserJoined: this.UserJoined,
            Room: (_a = this.Room) === null || _a === void 0 ? void 0 : _a.Export(),
            JoinOrder: this.JoinOrder
        };
    }
}
exports.JoinDetail = JoinDetail;
class VoteDetail {
    Parse(inputJ) {
        this.Member = inputJ["0"];
        let outcomes = {};
        for (let memberOutcome in inputJ["1"]) {
            let outcome = new models_1.Outcome();
            outcome.Parse(inputJ["1"][memberOutcome]);
            outcomes[memberOutcome] = outcome;
        }
        this.Outcome = outcomes;
    }
}
exports.VoteDetail = VoteDetail;
class GameResult {
    Parse(inputJ) {
        this.AcceptCount = inputJ["1"];
        let outcomes = {};
        for (let memberOutcome in inputJ["2"]) {
            let outcome = new models_1.Outcome();
            outcome.Parse(inputJ["2"][memberOutcome]);
            outcomes[memberOutcome] = outcome;
        }
        this.Outcome = outcomes;
    }
}
exports.GameResult = GameResult;
//# sourceMappingURL=models.js.map