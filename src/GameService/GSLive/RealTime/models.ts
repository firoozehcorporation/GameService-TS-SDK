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