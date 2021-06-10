import { GSLive } from '../..';
import { GameService } from '../../../index';
import buffer from 'buffer';

export function Rc4(key: string, str: string) {
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

export class Packet {
    constructor(public superThis: GameService) { }

    public Parse(input: any, encription: boolean = true) {
        let inputJ = JSON.parse(input)
        let data = inputJ["2"];
        let msg = inputJ["3"];
        if (this.superThis.GSLive.isEncriptionActive && encription) {
            if (inputJ["2"]) data = Buffer.from(Rc4(this.superThis.GSLive.Cipher, Buffer.from(inputJ["2"], 'base64').toString("latin1")), "latin1").toString("utf-8")
            if (inputJ["3"]) msg = Buffer.from(Rc4(this.superThis.GSLive.Cipher, Buffer.from(inputJ["3"], 'base64').toString("latin1")), "latin1").toString("utf-8")
        }
        this.SetToken(inputJ["0"]);
        this.SetHead(inputJ["1"]);
        this.SetData(data);
        this.SetMsg(msg);
    }

    private Token: string | undefined
    public GetToken(): string | undefined {
        return this.Token;
    }
    public SetToken(Token: string) {
        this.Token = Token;
    }

    private Head: number | undefined
    public GetHead(): number | undefined {
        return this.Head;
    }
    public SetHead(Head: number) {
        this.Head = Head;
    }

    private Data: string | undefined
    public GetData(): string | undefined {
        return this.Data;
    }
    public SetData(Data: string) {
        this.Data = Data;
    }

    private Msg: string | undefined
    public GetMsg(): string | undefined {
        return this.Msg;
    }
    public SetMsg(Msg: string) {
        this.Msg = Msg;
    }

    Export() {
        return {
            "0": this.Token,
            "1": this.Head,
            "2": this.Data,
            "3": this.Msg
        }
    }

    private Cast(encription: boolean = true) {
        if (this.superThis.GSLive.isEncriptionActive && encription) {
            if (this.Data) {
                let rc4 = Rc4(this.superThis.GSLive.Cipher, Buffer.from(this.Data!).toString("utf-8"));
                let data = Buffer.from(rc4, "latin1").toString('base64');
                this.Data = data;
            }
            if (this.Msg) {
                let rc4 = Rc4(this.superThis.GSLive.Cipher, Buffer.from(this.Msg!).toString("utf-8"));
                let msg = Buffer.from(rc4, "latin1").toString('base64')
                this.Msg = msg;
            }
        }

        return {
            "0": this.Token,
            "1": this.Head,
            "2": this.Data,
            "3": this.Msg
        }
    }
    ToString(encription: boolean = true): string {
        return JSON.stringify(this.Cast(encription))
    }
    Send = (encription: boolean = true) => {
        let serilized = this.ToString(encription)
        if (GSLive.CommandConnection === undefined)
            throw "User not connected to Command Server";
        GSLive.CommandConnection!.send(serilized);
    }
}

export class Payload {
    constructor(public superThis: GameService) { }

    private GameID: string | undefined
    GetGameID(): string | undefined {
        return this.GameID;
    }
    SetGameID(GameID: string) {
        this.GameID = GameID;
    }

    private Token: string | undefined
    GetToken(): string | undefined {
        return this.Token;
    }
    SetToken(Token: string) {
        this.Token = Token;
    }

    private Cast() {
        return {
            "0": this.GameID,
            "1": this.Token
        }
    }

    ToString(): string {
        return JSON.stringify(this.Cast())
    }
}

export class Data {
    constructor(public superThis: GameService) { }

    private ID: string | undefined
    GetID(): string | undefined {
        return this.ID;
    }
    SetID(ID: string) {
        this.ID = ID;
    }

    private User: string | undefined
    GetUser(): string | undefined {
        return this.User;
    }
    SetUser(User: string) {
        this.User = User;
    }

    private Invite: string | undefined
    GetInvite(): string | undefined {
        return this.Invite;
    }
    SetInvite(Invite: string) {
        this.Invite = Invite;
    }

    private Name: string | undefined
    GetName(): string | undefined {
        return this.Name;
    }
    SetName(Name: string) {
        this.Name = Name;
    }

    private Head: string | undefined
    GetHead(): string | undefined {
        return this.Head;
    }
    SetHead(Head: string) {
        this.Head = Head;
    }

    private Min: number | undefined
    GetMin(): number | undefined {
        return this.Min;
    }
    SetMin(Min: number) {
        this.Min = Min;
    }

    private Max: number | undefined
    GetMax(): number | undefined {
        return this.Max;
    }
    SetMax(Max: number) {
        this.Max = Max;
    }

    private SyncMode: number | undefined
    GetSyncMode(): number | undefined {
        return this.SyncMode;
    }
    SetSyncMode(SyncMode: number) {
        this.SyncMode = SyncMode;
    }

    private Role: string | undefined
    GetRole(): string | undefined {
        return this.Role;
    }
    SetRole(Role: string) {
        this.Role = Role;
    }

    private Private: boolean | undefined
    GetPrivate(): boolean | undefined {
        return this.Private;
    }
    SetPrivate(Private: boolean) {
        this.Private = Private;
    }

    private Persist: boolean | undefined
    GetPersist(): boolean | undefined {
        return this.Persist;
    }
    SetPersist(Persist: boolean) {
        this.Persist = Persist;
    }

    private Extra: string | undefined
    GetExtra(): string | undefined {
        return this.Extra;
    }
    SetExtra(Extra: string) {
        this.Extra = Extra;
    }

    private Password: string | undefined
    GetPassword(): string | undefined {
        return this.Password;
    }
    SetPassword(Password: string) {
        this.Password = Password;
    }

    Parse(inputJ: any) {
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
        }
    }

    private Cast() {
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
        }
    }

    ToString(): string {
        return JSON.stringify(this.Cast())
    }
}

export class StartGame {
    MemerID: string | undefined
    Area: Area | undefined
    Room: any | undefined

    parse(inputS: string) {

        let input = JSON.parse(inputS)
        let areaT = new Area();
        areaT.parse(JSON.stringify(input["2"]))

        this.Room = input["0"];
        this.MemerID = input["1"];
        this.Area = areaT
    }

    cast(): object {
        return {
            "0": this.Room,
            "1": this.MemerID,
            "2": this.Area,
        }
    }

    toString(): string {
        return JSON.stringify(this.cast())
    }
}

export class Area {
    Endpoint: string = ""
    Protocol: string | undefined
    Port: number = 0
    Token: string | undefined
    PublicKey: string | undefined
    Hash: string | undefined

    parse(inputS: string) {
        let input = JSON.parse(inputS)
        this.Endpoint = input["0"];
        this.Protocol = input["1"];
        this.Port = input["2"];
        this.Token = input["3"];
        this.PublicKey = input["4"];
        this.Hash = input["5"];
    }

    cast(): object {
        return {
            "0": this.Endpoint,
            "1": this.Protocol,
            "2": this.Port,
            "3": this.Token,
            "4": this.PublicKey,
            "5": this.Hash
        }
    }

    toString(): string {
        return JSON.stringify(this.cast())
    }
}