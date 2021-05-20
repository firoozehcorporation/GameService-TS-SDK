import { GSLive } from '../..';
import { GameService } from '../../../index';

export class Packet {
    constructor(public superThis: GameService) { }

    public Parse(input: any) {
        let inputJ = JSON.parse(input)
        this.SetToken(inputJ["0"]);
        this.SetHead(inputJ["1"]);
        this.SetData(inputJ["2"]);
        this.SetMsg(inputJ["3"]);
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

    private Cast() {
        return {
            "0": this.Token,
            "1": this.Head,
            "2": this.Data,
            "3": this.Msg
        }
    }
    ToString(): string {
        return JSON.stringify(this.Cast())
    }
    Send = () => {
        let serilized = this.ToString()
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