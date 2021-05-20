import { GameService } from '../../index';

export class Data {
    constructor(public superThis: GameService) { }

    Head: number | undefined
    ID: string | undefined
    Data: string | undefined
    Next: string | undefined
    Outcomes: object | undefined
    Private: boolean | undefined

    private Cast() {
        return {
            "0": this.Head,
            "1": this.ID,
            "2": this.Data,
            "3": this.Next,
            "4": this.Outcomes,
            "5": this.Private,
        }
    }

    ToString(): string {
        return JSON.stringify(this.Cast())
    }
}

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