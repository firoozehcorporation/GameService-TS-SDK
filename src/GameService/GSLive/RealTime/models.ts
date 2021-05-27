import { BufferToString, StringToBuffer } from "../Controllers/RealTime/models"

export enum PropertyType {
    Room = "room",
    Member = "member"
}

export class CreateRoomOptions {
    constructor() {
        this.role = "default"
        this.minPlayer = 2
        this.maxPlayer = 2
        this.isPersist = false
        this.extra = undefined
        this.isPrivate = false
        this.roomPassword = undefined
        this.roomName = "default"
    }
    roomName: string = "default"
    role: string = "default"
    minPlayer: number = 2
    maxPlayer: number = 2
    isPrivate: boolean = false
    isPersist: boolean = false
    extra: string | undefined
    roomPassword: string | undefined
}


export class AutoMatchOptions {
    constructor() {
        this.role = "default"
        this.minPlayer = 2
        this.maxPlayer = 2
        this.isPersist = false
        this.extra = null
    }
    role: string = "default"
    minPlayer: number = 2
    maxPlayer: number = 2
    isPersist: boolean = false
    extra: string | null
}

export enum GProtocolSendType {
    UnReliable = 0,
    Reliable = 1,
}

export enum MessageType {
    Private = 4,
    Public = 3
}

export class EventPayload {
    Name: string = "";
    Value: Uint8Array = new Uint8Array();

    Serialize(): Uint8Array {
        let b = Buffer.alloc(2);
        b.writeUInt16LE(StringToBuffer(this.Name).length);
        let a = Buffer.alloc(2);
        a.writeUInt16LE(this.Value?.length);

        let source = [
            2,
            12,
            ...b.valueOf(),
            ...StringToBuffer(this.Name),
            13,
            ...a.valueOf(),
            ...this.Value
        ]

        return new Uint8Array(source);
    }

    Deserialize(input: any) {
        let buff = Buffer.from(input);
        let offset = 1

        offset++
        let NameLength = buff.readUInt16LE(offset)
        offset += 2
        let name = buff.slice(offset, offset + NameLength);
        offset += NameLength;
        this.Name = BufferToString(name);

        offset++
        let ValueLength = buff.readUInt16LE(offset)
        offset += 2
        let value = buff.slice(offset, offset + ValueLength);
        offset += ValueLength;
        this.Value = value;
    }

    Export() {
        return {
            Name: this.Name,
            Value: BufferToString(this.Value)
        }
    }
}