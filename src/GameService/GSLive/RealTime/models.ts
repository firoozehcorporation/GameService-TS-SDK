export enum PropertyType {
    Room = "room",
    Member = "member"
}

export class CreateRoomOptions {
    roomname: string
    role: string = "default"
    minPlayer: number = 2
    maxPlayer: number = 2
    isPrivate: boolean = false
    isPersist: boolean = false
    extra: string | undefined
    roomPassword: string | undefined
}

export class AutoMatchOptions {
    role: string = "default"
    minPlayer: number = 2
    maxPlayer: number = 2
    isPersist: boolean = false
    extra: string | undefined
}