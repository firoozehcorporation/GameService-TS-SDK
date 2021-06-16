"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Area = exports.StartGame = exports.Data = exports.Payload = exports.Packet = exports.Rc4 = void 0;
const __1 = require("../..");
const index_1 = require("../../../index");
function Rc4(key, str) {
    var s = [], j = 0, x, res = '';
    for (var i = 0; i < 256; i++) {
        s[i] = i;
    }
    for (i = 0; i < 256; i++) {
        j = (j + s[i] + key.charCodeAt(i % key.length)) % 256;
        x = s[i];
        s[i] = s[j];
        s[j] = x;
    }
    i = 0;
    j = 0;
    for (var y = 0; y < str.length; y++) {
        i = (i + 1) % 256;
        j = (j + s[i]) % 256;
        x = s[i];
        s[i] = s[j];
        s[j] = x;
        res += String.fromCharCode(str.charCodeAt(y) ^ s[(s[i] + s[j]) % 256]);
    }
    return res;
}
exports.Rc4 = Rc4;
class Packet {
    constructor() {
        this.Send = (encription = true) => {
            let serilized = this.ToString(encription);
            if (__1.GSLive.CommandConnection === undefined)
                throw "User not connected to Command Server";
            __1.GSLive.CommandConnection.send(serilized);
        };
    }
    Parse(input, encription = true) {
        let inputJ = JSON.parse(input);
        let data = inputJ["2"];
        let msg = inputJ["3"];
        if (index_1.GameService.GSLive.isEncriptionActive && encription) {
            if (inputJ["2"])
                data = Buffer.from(Rc4(index_1.GameService.GSLive.Cipher, Buffer.from(inputJ["2"], 'base64').toString("latin1")), "latin1").toString("utf-8");
            if (inputJ["3"] && inputJ["1"] != 100)
                msg = Buffer.from(Rc4(index_1.GameService.GSLive.Cipher, Buffer.from(inputJ["3"], 'base64').toString("latin1")), "latin1").toString("utf-8");
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
    Export() {
        return {
            "0": this.Token,
            "1": this.Head,
            "2": this.Data,
            "3": this.Msg
        };
    }
    Cast(encription = true) {
        if (index_1.GameService.GSLive.isEncriptionActive && encription) {
            if (this.Data) {
                let rc4 = Rc4(index_1.GameService.GSLive.Cipher, Buffer.from(this.Data).toString("utf-8"));
                let data = Buffer.from(rc4, "latin1").toString('base64');
                this.Data = data;
            }
            if (this.Msg) {
                let rc4 = Rc4(index_1.GameService.GSLive.Cipher, Buffer.from(this.Msg).toString("utf-8"));
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
class Payload {
    constructor() { }
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
    constructor() { }
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