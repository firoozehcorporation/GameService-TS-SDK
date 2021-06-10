"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Area = exports.StartGame = exports.Data = exports.Payload = exports.Packet = void 0;
const __1 = require("../..");
class Packet {
    constructor(superThis) {
        this.superThis = superThis;
        this.Send = () => {
            let serilized = this.ToString();
            if (__1.GSLive.CommandConnection === undefined)
                throw "User not connected to Command Server";
            __1.GSLive.CommandConnection.send(serilized);
        };
    }
    Parse(input) {
        let inputJ = JSON.parse(input);
        this.SetToken(inputJ["0"]);
        this.SetHead(inputJ["1"]);
        this.SetData(inputJ["2"]);
        this.SetMsg(inputJ["3"]);
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
    Cast() {
        return {
            "0": this.Token,
            "1": this.Head,
            "2": this.Data,
            "3": this.Msg
        };
    }
    ToString() {
        return JSON.stringify(this.Cast());
    }
}
exports.Packet = Packet;
class Payload {
    constructor(superThis) {
        this.superThis = superThis;
    }
    GetGameID() {
        return this.GameID;
    }
    SetGameID(GameID) {
        this.GameID = GameID;
    }
    GetToken() {
        return this.Token;
    }
    SetToken(Token) {
        this.Token = Token;
    }
    Cast() {
        return {
            "0": this.GameID,
            "1": this.Token
        };
    }
    ToString() {
        return JSON.stringify(this.Cast());
    }
}
exports.Payload = Payload;
class Data {
    constructor(superThis) {
        this.superThis = superThis;
    }
    GetID() {
        return this.ID;
    }
    SetID(ID) {
        this.ID = ID;
    }
    GetUser() {
        return this.User;
    }
    SetUser(User) {
        this.User = User;
    }
    GetInvite() {
        return this.Invite;
    }
    SetInvite(Invite) {
        this.Invite = Invite;
    }
    GetName() {
        return this.Name;
    }
    SetName(Name) {
        this.Name = Name;
    }
    GetHead() {
        return this.Head;
    }
    SetHead(Head) {
        this.Head = Head;
    }
    GetMin() {
        return this.Min;
    }
    SetMin(Min) {
        this.Min = Min;
    }
    GetMax() {
        return this.Max;
    }
    SetMax(Max) {
        this.Max = Max;
    }
    GetSyncMode() {
        return this.SyncMode;
    }
    SetSyncMode(SyncMode) {
        this.SyncMode = SyncMode;
    }
    GetRole() {
        return this.Role;
    }
    SetRole(Role) {
        this.Role = Role;
    }
    GetPrivate() {
        return this.Private;
    }
    SetPrivate(Private) {
        this.Private = Private;
    }
    GetPersist() {
        return this.Persist;
    }
    SetPersist(Persist) {
        this.Persist = Persist;
    }
    GetExtra() {
        return this.Extra;
    }
    SetExtra(Extra) {
        this.Extra = Extra;
    }
    GetPassword() {
        return this.Password;
    }
    SetPassword(Password) {
        this.Password = Password;
    }
    Parse(inputJ) {
        this.ID = inputJ[0];
        this.User = inputJ[1];
        this.Invite = inputJ[2];
        this.Name = inputJ[3];
        this.Head = inputJ[4];
        this.Min = inputJ[5];
        this.Max = inputJ[6];
        this.SyncMode = inputJ[7];
        this.Role = inputJ[8];
        this.Private = inputJ[9];
        this.Persist = inputJ[10];
        this.Extra = inputJ[11];
        this.Password = inputJ[12];
    }
    Export() {
        return {
            ID: this.ID,
            User: this.User,
            Invite: this.Invite,
            Name: this.Name,
            Head: this.Head,
            Min: this.Min,
            Max: this.Max,
            SyncMode: this.SyncMode,
            Role: this.Role,
            Private: this.Private,
            Persist: this.Persist,
            Extra: this.Extra,
            Password: this.Password,
        };
    }
    Cast() {
        return {
            "0": this.ID,
            "1": this.User,
            "2": this.Invite,
            "3": this.Name,
            "4": this.Head,
            "5": this.Min,
            "6": this.Max,
            "7": this.SyncMode,
            "8": this.Role,
            "9": this.Private,
            "10": this.Persist,
            "11": this.Extra,
            "12": this.Password
        };
    }
    ToString() {
        return JSON.stringify(this.Cast());
    }
}
exports.Data = Data;
class StartGame {
    parse(inputS) {
        let input = JSON.parse(inputS);
        let areaT = new Area();
        areaT.parse(JSON.stringify(input["2"]));
        this.Room = input["0"];
        this.MemerID = input["1"];
        this.Area = areaT;
    }
    cast() {
        return {
            "0": this.Room,
            "1": this.MemerID,
            "2": this.Area,
        };
    }
    toString() {
        return JSON.stringify(this.cast());
    }
}
exports.StartGame = StartGame;
class Area {
    constructor() {
        this.Endpoint = "";
        this.Port = 0;
    }
    parse(inputS) {
        let input = JSON.parse(inputS);
        this.Endpoint = input["0"];
        this.Protocol = input["1"];
        this.Port = input["2"];
        this.Token = input["3"];
        this.PublicKey = input["4"];
        this.Hash = input["5"];
    }
    cast() {
        return {
            "0": this.Endpoint,
            "1": this.Protocol,
            "2": this.Port,
            "3": this.Token,
            "4": this.PublicKey,
            "5": this.Hash
        };
    }
    toString() {
        return JSON.stringify(this.cast());
    }
}
exports.Area = Area;
//# sourceMappingURL=models.js.map