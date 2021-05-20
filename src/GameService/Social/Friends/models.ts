import { Member } from '../../Player/models'

export interface FriendData {
    Member: Member
    RequestedTime: Date
    AcceptedTime: Date
}