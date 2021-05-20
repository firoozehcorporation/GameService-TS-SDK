"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parties = void 0;
class Parties {
    Create(options) {
    }
    Edit(partyId, options) {
    }
    Delete(partyId) {
        return true;
    }
    GetPartyInfo(partyId) {
    }
    FindParties(query, skip = 0, limit = 25) {
        return [];
    }
    JoinRequest(partyId) {
        return true;
    }
    GetPartyJoinRequests(partyId, skip = 0, limit = 25) {
        return [];
    }
    AcceptJoinRequest(partyId, memberId) {
        return true;
    }
    RejectJoinRequest(partyId, memberId) {
        return true;
    }
    AddFriend(partyId, memberId) {
        return true;
    }
    GetMyParties(skip = 0, limit = 25) {
        return [];
    }
    LeaveParty(partyId) {
        return true;
    }
    KickMember(partyId, memberId) {
        return true;
    }
    SetOrUpdateRole(partyId, memberId, role) {
        return true;
    }
    SetOrUpdateVariable(partyId, variable) {
        return {};
    }
    DeleteVariable(partyId, variableKey) {
        return {};
    }
    DeleteVariables(partyId) {
        return {};
    }
    SetOrUpdateMemberVariable(partyId, variable) {
        return true;
    }
    DeleteMemberVariable(partyId, variableKey) {
        return true;
    }
    DeleteMemberVariables(partyId) {
        return true;
    }
    GetMemberVariable(partyId, variableKey) {
        return "";
    }
    GetMemberVariables(partyId) {
        return [];
    }
}
exports.Parties = Parties;
