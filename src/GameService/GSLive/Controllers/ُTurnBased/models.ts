import { TurnBased } from ".";
import { GameService } from '../../../index';
import { Member } from "../../../Player/models";
import { Outcome, PropertyType } from "../../TurnBased/models";
import { Rc4 } from "../Command/models";

export class Packet {
    constructor() { }

    public Parse(input: any, encription: boolean = true) {
        let inputJ = JSON.parse(input)

        let data = inputJ["2"];
        let msg = inputJ["3"];
        if (GameService.GSLive.isEncriptionActive && encription) {
            if (inputJ["2"]) data = Buffer.from(Rc4(GameService.GSLive.Cipher, Buffer.from(inputJ["2"], 'base64').toString("latin1")), "latin1").toString("utf-8")
            if (inputJ["3"] && inputJ["1"] !== 100) msg = Buffer.from(Rc4(GameService.GSLive.Cipher, Buffer.from(inputJ["3"], 'base64').toString("latin1")), "latin1").toString("utf-8")
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

    private Cast(encription: boolean = true) {
        if (GameService.GSLive.isEncriptionActive && encription) {
            if (this.Data) {
                let rc4 = Rc4(GameService.GSLive.Cipher, Buffer.from(this.Data!).toString("utf-8"));
                let data = Buffer.from(rc4, "latin1").toString('base64');
                this.Data = data;
            }
            if (this.Msg) {
                let rc4 = Rc4(GameService.GSLive.Cipher, Buffer.from(this.Msg!).toString("utf-8"));
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
        let serilized = this.ToString(encription);
        TurnBased.Connection!.send(serilized);
    }
}

export class Room {
    public Parse(inputJ: any) {
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

    private _ID: string | undefined;
    public get ID(): string {
        return this._ID!;
    }
    public set ID(value: string) {
        this._ID = value;
    }
    private _Name: string | undefined = "";
    public get Name(): string {
        return this._Name!;
    }
    public set Name(value: string) {
        this._Name = value;
    }
    private _Logo: string | undefined;
    public get Logo(): string {
        return this._Logo!;
    }
    public set Logo(value: string) {
        this._Logo = value;
    }
    private _Creator: string | undefined;
    public get Creator(): string {
        return this._Creator!;
    }
    public set Creator(value: string) {
        this._Creator = value;
    }
    private _Min: number | undefined;
    public get Min(): number {
        return this._Min!;
    }
    public set Min(value: number) {
        this._Min = value;
    }
    private _Max: number | undefined;
    public get Max(): number {
        return this._Max!;
    }
    public set Max(value: number) {
        this._Max = value;
    }
    private _Role: string | undefined;
    public get Role(): string {
        return this._Role!;
    }
    public set Role(value: string) {
        this._Role = value;
    }
    private _Private: boolean | undefined = false;
    public get Private(): boolean {
        return this._Private!;
    }
    public set Private(value: boolean) {
        this._Private = value;
    }
    private _Status: number | undefined;
    public get Status(): number {
        return this._Status!;
    }
    public set Status(value: number) {
        this._Status = value;
    }
    private _NumOfMembers: number | undefined;
    public get NumOfMembers(): number {
        return this._NumOfMembers!;
    }
    public set NumOfMembers(value: number) {
        this._NumOfMembers = value;
    }
    private _Variables: object | undefined;
    public get Variables(): object {
        return this._Variables!;
    }
    public set Variables(value: object) {
        this._Variables = value;
    }
    private _Persist: boolean | undefined = false;
    public get Persist(): boolean {
        return this._Persist!;
    }
    public set Persist(value: boolean) {
        this._Persist = value;
    }
    private _CreatedAt: string | undefined;
    public get CreatedAt(): string {
        return this._CreatedAt!;
    }
    public set CreatedAt(value: string) {
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
        }
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
        }
    }
    ToString(): string {
        return JSON.stringify(this.Cast())
    }
}

export class PropertyChange {
    public Parse(inputJ: any) {
        if (inputJ["1"] == 1)
            this.Type = PropertyType.Room;
        else
            this.Type = PropertyType.Member;

        if (inputJ["2"] == 3 || inputJ["2"] == 1)
            this.Action = "SetOtUpdate";
        else
            this.Action = "Delete";
        this.Sender = inputJ["3"];
        this.Name = inputJ["4"];
        this.Value = inputJ["5"];
    }

    Type: string | undefined
    Action: string | undefined
    Sender: object | undefined
    Name: string | undefined
    Value: string | undefined

    Export() {
        return {
            "Type": this.Type,
            "Action": this.Action,
            "Sender": this.Sender,
            "Name": this.Name,
            "Value": this.Value,
        }
    }
}

export class JoinDetail {
    JoinType: number | undefined
    UserJoined: Member | undefined
    Room: Room | undefined
    JoinOrder: number | undefined

    Parse(inputJ: any) {
        let room = new Room();
        room.Parse(inputJ["2"])

        this.JoinType = inputJ["1"]
        this.UserJoined = inputJ["3"]
        this.Room = room
        this.JoinOrder = inputJ["4"]
    }

    Export() {
        return {
            JoinType: this.JoinType,
            UserJoined: this.UserJoined,
            Room: this.Room?.Export(),
            JoinOrder: this.JoinOrder
        }
    }
}

export class VoteDetail {
    Member: object | undefined
    Outcome: { [memberID: string]: Outcome | undefined } | undefined

    Parse(inputJ: any) {
        this.Member = inputJ["0"]

        let outcomes: any = {};
        for (let memberOutcome in inputJ["1"]) {
            let outcome = new Outcome();
            outcome.Parse(inputJ["1"][memberOutcome]);
            outcomes[memberOutcome] = outcome
        }
        this.Outcome = outcomes
    }
}

export class GameResult {
    AcceptCount: number | undefined
    Outcome: Outcome | undefined

    Parse(inputJ: any) {
        this.AcceptCount = inputJ["1"]
        let outcomes: any = {};
        for (let memberOutcome in inputJ["2"]) {
            let outcome = new Outcome();
            outcome.Parse(inputJ["2"][memberOutcome]);
            outcomes[memberOutcome] = outcome
        }
        this.Outcome = outcomes
    }
}