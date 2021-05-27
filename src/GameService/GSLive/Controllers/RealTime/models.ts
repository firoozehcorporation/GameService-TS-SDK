import { RealTime } from "."
import { Room } from "../ُTurnBased/models"

export class Packet {
    private _Action: number | undefined
    public get Action(): number | undefined {
        return this._Action
    }
    public set Action(value: number | undefined) {
        if (value! > 255) value = 255
        this._Action = value
    }
    Payload: Uint8Array | undefined
    private _Token: bigint = BigInt(0)
    public get Token(): bigint {
        return this._Token
    }
    public set Token(value: bigint) {
        this._Token = value
    }
    // 0 -> unReliable, 1 -> Reliable
    private _Type: number = 0
    public get Type(): number {
        return this._Type
    }
    public set Type(value: number) {
        if (value! > 255) value = 255
        this._Type = value
    }
    ClientSendTime: number | undefined

    Cast() {
        return {
            "1": this.Action,
            "2": BufferToString(this.Payload!),
            "3": Number(this.Token),
            "4": this.Type,
            "5": this.ClientSendTime
        }
    }

    ToString(): string {
        return JSON.stringify(this.Cast())
    }


    Parse(inputJ: any) {
        this.Action = inputJ["1"]
        this.Payload = inputJ["2"]
        this.Token = inputJ["3"]
        this.Type = inputJ["4"]
        this.ClientSendTime = inputJ["5"]
    }

    Serialize(): Uint8Array {
        let havePayload: number = 0x0
        let haveClientSendTime: number = 0x0
        if (this.Payload)
            havePayload = 0x1
        if (this.ClientSendTime)
            haveClientSendTime = 0x1

        let source = [this.Action!, haveClientSendTime, havePayload];
        if (havePayload === 0x1) {
            let t = Buffer.alloc(2);
            t.writeUInt16LE(this.Payload?.length!)
            source = [...source, ...t.valueOf()]
        }
        source.push(this.Type)

        let t = Buffer.alloc(8);
        t.writeBigUInt64LE(this.Token)
        source = [...source, ...t.valueOf()]

        if (havePayload === 0x1)
            source = [...source, ...this.Payload!]
        if (haveClientSendTime === 0x1) {
            let t = Buffer.alloc(8);
            t.writeBigInt64LE(BigInt(this.ClientSendTime!))
            source = [...source, ...t.valueOf()]
        }
        return new Uint8Array(source)
    }

    Deserialize(input: Uint8Array) {
        let buff = Buffer.from(input);
        let offset = 0;

        let haveClientSendTime = 0x0;
        let havePayload = 0x0;

        let payloadLen = 0x0;
        this.Action = buff.readUInt8(offset++)

        haveClientSendTime = buff.readUInt8(offset++)

        havePayload = buff.readUInt8(offset++)

        if (havePayload > 0) {
            payloadLen = buff.readUInt16LE(offset)
            offset += 2
        }

        this.Type = buff.readUInt8(offset++)

        this.Token = buff.readBigUInt64LE(offset)
        offset += 8

        if (havePayload > 0) {
            this.Payload = buff.slice(offset, offset + payloadLen)
            offset += payloadLen
        }

        if (haveClientSendTime > 0) {
            this.ClientSendTime = Number(buff.readBigInt64LE(offset))
        }
    }

    Send = () => {
        let serilized = this.Serialize()
        if (RealTime.Connection!.readyState)
            RealTime.Connection!.send(serilized, { binary: true, compress: false });
    }
}

export class Data {
    private _SenderID: string | undefined
    public get SenderID(): string | undefined {
        return this._SenderID
    }
    public set SenderID(value: string | undefined) {
        this._SenderID = value
    }
    private _ReceiverID: string | undefined
    public get ReceiverID(): string | undefined {
        return this._ReceiverID
    }
    public set ReceiverID(value: string | undefined) {
        this._ReceiverID = value
    }
    private _Payload: Uint8Array | undefined
    public get Payload(): Uint8Array | undefined {
        return this._Payload
    }
    public set Payload(value: Uint8Array | undefined) {
        this._Payload = value
    }
    private _Extra: Uint8Array = new Uint8Array()
    public GetExtra(): any {
        let b = Buffer.from(this._Extra);
        return {
            Type: b.readUInt8(),
            Action: b.readUInt8(1)
        }
    }
    public SetExtra(type: Types, action: Operations) {
        this._Extra = new Uint8Array([type, action]);
    }


    Cast() {
        return {
            "1": this.SenderID,
            "2": this.ReceiverID,
            "3": BufferToString(this.Payload!),
            "4": this._Extra!,
        }
    }

    Parse(inputJ: any) {
        this.SenderID = inputJ["1"];
        this.ReceiverID = inputJ["2"];
        this.Payload = inputJ["3"];
        this._Extra = inputJ["4"]
    }

    Export() {
        return {
            SenderID: this.SenderID,
            ReceiverID: this.ReceiverID,
            Payload: BufferToString(this.Payload!),
            Extra: this.GetExtra(),
        }
    }

    Serialize(): Uint8Array {
        let haveSenderID = 0x0;
        let haveRecieverID = 0x0;
        let havePayload = 0x0;
        let haveExtra = 0x0;

        if (this.SenderID) {
            haveSenderID = 0x1;
        }

        if (this.ReceiverID) {
            haveRecieverID = 0x1;
        }

        if (this.Payload!.length > 0) {
            havePayload = 0x1;
        }

        if (this._Extra) {
            haveExtra = 0x1;
        }

        let source = [haveSenderID, haveRecieverID, havePayload, haveExtra];

        let ReceiverIDBuff = StringToBuffer(this.ReceiverID!)
        let SenderIDBuff = StringToBuffer(this.SenderID!)

        if (haveSenderID > 0) {
            source.push(SenderIDBuff.length);
        }

        if (haveRecieverID > 0) {
            source.push(ReceiverIDBuff.length);
        }

        if (havePayload > 0) {
            let t = Buffer.alloc(2);
            t.writeUInt16LE(this.Payload?.length!)
            source = [...source, ...t.valueOf()];
        }

        if (haveExtra > 0) {
            let t = Buffer.alloc(2);
            t.writeUInt16LE(this._Extra?.length!)
            source = [...source, ...t.valueOf()];
        }

        if (haveSenderID > 0) {
            source = [...source, ...SenderIDBuff];
        }

        if (haveRecieverID > 0) {
            source = [...source, ...ReceiverIDBuff];
        }

        if (havePayload > 0) {
            source = [...source, ...this.Payload!];
        }

        if (haveExtra > 0) {
            source = [...source, ...this._Extra!];
        }
        return new Uint8Array(source)
    }

    Deserialize(input: Uint8Array) {
        let buff = Buffer.from(input);

        let offset = 0;

        let senderLen = 0;
        let receiverLen = 0;
        let payloadLen = 0;
        let extraLen = 0;


        let haveSender = buff.readUInt8(offset++);
        let haveReceiver = buff.readUInt8(offset++);
        let havePayload = buff.readUInt8(offset++);
        let haveExtra = buff.readUInt8(offset++);

        if (haveSender > 0) {
            senderLen = buff.readUInt8(offset++);
        }

        if (haveReceiver > 0) {
            receiverLen = buff.readUInt8(offset++);
        }

        if (havePayload > 0) {
            payloadLen = buff.readUInt16LE(offset)
            offset += 2
        }

        if (haveExtra > 0) {
            extraLen = buff.readUInt16LE(offset)
            offset += 2
        }
        if (haveSender > 0) {
            this.SenderID = BufferToString(buff.slice(offset, offset + senderLen))
            offset += senderLen
        }

        if (haveReceiver > 0) {
            this.ReceiverID = BufferToString(buff.slice(offset, offset + receiverLen))
            offset += receiverLen
        }

        if (havePayload > 0) {
            this.Payload = buff.slice(offset, offset + payloadLen);
            offset += payloadLen
        }

        if (haveExtra > 0) {
            this._Extra = buff.slice(offset, offset + extraLen);
            offset += extraLen
        }
    }
}

export enum Types {
    Object = 0x1,
    Function = 0x2,
    Property = 0x3
}

export enum Operations {
    SetMemberProperty = 0x2,
    DelMemberProperty = 0x3,
    SetRoomProperty = 0x0,
    DelRoomProperty = 0x1,

    BufferedFunction = 0x2,

    InstanceObject = 0x0,
    DestroyObject = 0x1
}

export function StringToBuffer(str: string): Uint8Array {
    let string = unescape(encodeURIComponent(str)),
        charList = string.split(''),
        uintArray = [];
    for (var i = 0; i < charList.length; i++) {
        uintArray.push(charList[i].charCodeAt(0));
    }
    return new Uint8Array(uintArray);
}

export function BufferToString(buff: Uint8Array): string {
    var encodedString = String.fromCharCode.apply(null, [].slice.call(buff)),
        decodedString = decodeURIComponent(escape(encodedString));
    return decodedString;
}

export class AuthPayload {
    RoomID: string | undefined
    Token: string | undefined
    Hash: string | undefined

    Cast() {
        return {
            "1": this.RoomID,
            "2": this.Token,
            "3": this.Hash
        }
    }

    Parse(inputJ: any) {
        this.RoomID = inputJ["1"]
        this.Token = inputJ["2"]
        this.Hash = inputJ["3"]
    }

    ToString(): string {
        return JSON.stringify(this.Cast())
    }

    ToBuffer(): Uint8Array {
        return StringToBuffer(this.ToString())
    }
}

export class JoinPayload {
    JoinType: number | undefined
    Room: object | undefined
    UserJoined: object | undefined
    JoinMemberOrder: number | undefined

    Cast() {
        return {
            "1": this.JoinType,
            "2": this.Room,
            "3": this.UserJoined,
            "4": this.JoinMemberOrder
        }
    }

    Parse(inputJ: any) {
        this.JoinType = inputJ["1"]
        let room = new Room();
        room.Parse(inputJ["2"])
        this.Room = room.Export()
        this.UserJoined = inputJ["3"]
        this.JoinMemberOrder = inputJ["4"]
    }

    ToString(): string {
        return JSON.stringify(this.Cast())
    }

    ToBuffer(): Uint8Array {
        return StringToBuffer(this.ToString())
    }

    Export() {
        return {
            JoinType: this.JoinType,
            Room: this.Room,
            UserJoined: this.UserJoined,
            JoinMemberOrder: this.JoinMemberOrder,
        }
    }
}