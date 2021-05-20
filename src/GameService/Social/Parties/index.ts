import { CreatePartyOptions } from './options';
import { Party, PartyInfo, PartyData } from './models';
import { Member } from '../../Player/models';

export class Parties {
    Create(options: CreatePartyOptions): Party {

    }
    Edit(partyId: string, options: CreatePartyOptions): Party {

    }
    Delete(partyId: string): boolean {
        return true
    }
    GetPartyInfo(partyId: string): PartyInfo {

    }
    FindParties(query: string, skip: number = 0, limit: number = 25): PartyData[] {
        return []
    }
    JoinRequest(partyId: string): boolean {
        return true
    }
    GetPartyJoinRequests(partyId: string, skip: number = 0, limit: number = 25): Member[] {
        return []
    }
    AcceptJoinRequest(partyId: string, memberId: string): boolean {
        return true
    }
    RejectJoinRequest(partyId: string, memberId: string): boolean {
        return true
    }
    AddFriend(partyId: string, memberId: string): boolean {
        return true
    }
    GetMyParties(skip: number = 0, limit: number = 25): PartyData[] {
        return []
    }
    LeaveParty(partyId: string): boolean {
        return true
    }
    KickMember(partyId: string, memberId: string): boolean {
        return true
    }
    SetOrUpdateRole(partyId: string, memberId: string, role: string): boolean {
        return true
    }
    SetOrUpdateVariable(partyId: string, variable: [string, string]): PartyData {
        return {}

    }
    DeleteVariable(partyId: string, variableKey: string): PartyData {
        return {}

    }
    DeleteVariables(partyId: string): PartyData {
        return {}
    }
    SetOrUpdateMemberVariable(partyId: string, variable: [string, string]): boolean {
        return true
    }
    DeleteMemberVariable(partyId: string, variableKey: string): boolean {
        return true
    }
    DeleteMemberVariables(partyId: string): boolean {
        return true
    }
    GetMemberVariable(partyId: string, variableKey: string): string {
        return ""
    }
    GetMemberVariables(partyId: string): [string, string][] {
        return []
    }

}