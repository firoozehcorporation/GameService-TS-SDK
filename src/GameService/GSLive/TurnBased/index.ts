import { GameService } from '../..';
import { Actions } from '../../../Utils/Consts';
import { PropertyType, CreateRoomOptions, AutoMatchOptions, Data as TurnData } from './models';
import { JoinDetail, Packet as TurnPacket, PropertyChange } from '../Controllers/ُTurnBased/models';
import { Data, Packet } from '../Controllers/Command/models';
import { Member } from '../../Player/models';

export class TurnBased {
    constructor(public superThis: GameService) { }

    // Functions
    public async CreateRoom(options: CreateRoomOptions) {
        let data = new Data(this.superThis);
        data.SetMax(options.maxPlayer);
        data.SetMin(options.minPlayer);
        data.SetName(options.roomName);
        data.SetPassword(options.roomPassword!);
        data.SetRole(options.role);
        data.SetPersist(options.isPersist);
        data.SetPrivate(options.isPrivate);
        data.SetExtra(options.extra!);
        data.SetSyncMode(1)

        let pkt = new Packet(this.superThis);
        pkt.SetHead(Actions.Command.ActionCreateRoom);
        pkt.SetToken(this.superThis.GSLive.Command.commandToken)
        pkt.SetData(data.ToString())
        pkt.Send()
    }

    public async AutoMatch(options: AutoMatchOptions) {
        let data = new Data(this.superThis);
        data.SetMax(options.maxPlayer);
        data.SetMin(options.minPlayer);
        data.SetRole(options.role);
        data.SetPersist(options.isPersist);
        data.SetExtra(options.extra!);
        data.SetSyncMode(1);

        let pkt = new Packet(this.superThis);
        pkt.SetHead(Actions.Command.ActionAutoMatch);
        pkt.SetToken(this.superThis.GSLive.Command.commandToken)
        pkt.SetData(data.ToString())
        pkt.Send()
    }

    public async CancelAutoMatch() {
        let pkt = new Packet(this.superThis);
        pkt.SetHead(Actions.Command.LeftWaitingQ);
        pkt.SetToken(this.superThis.GSLive.Command.commandToken)
        pkt.Send()
    }

    public async GetAvailableRooms(role: string, limit: number) {
        let data = new Data(this.superThis);
        data.SetMax(limit);
        data.SetRole(role);

        let pkt = new Packet(this.superThis);
        pkt.SetHead(Actions.Command.ActionGetRooms);
        pkt.SetToken(this.superThis.GSLive.Command.commandToken)
        pkt.SetData(data.ToString());
        pkt.Send()
    }

    public async JoinRoom(roomID: string, extra: string | undefined = undefined, password: string | undefined = undefined) {
        let data = new Data(this.superThis);
        data.SetID(roomID);
        data.SetExtra(extra!);
        data.SetPassword(password!);

        let pkt = new Packet(this.superThis);
        pkt.SetHead(Actions.Command.ActionJoinRoom);
        pkt.SetToken(this.superThis.GSLive.Command.commandToken)
        pkt.SetData(data.ToString());
        pkt.Send()
    }

    public async FindMember(query: string, limit: number) {
        let data = new Data(this.superThis);
        data.SetUser(query);
        data.SetMax(limit);

        let pkt = new Packet(this.superThis);
        pkt.SetHead(Actions.Command.ActionFindUser);
        pkt.SetToken(this.superThis.GSLive.Command.commandToken)
        pkt.SetData(data.ToString());
        pkt.Send()
    }

    public async InviteUser(roomID: string, userID: string) {
        let data = new Data(this.superThis);
        data.SetID(roomID);
        data.SetUser(userID);

        let pkt = new Packet(this.superThis);
        pkt.SetHead(Actions.Command.ActionInviteUser);
        pkt.SetToken(this.superThis.GSLive.Command.commandToken)
        pkt.SetData(data.ToString());
        pkt.Send()
    }

    public async GetInviteInbox() {
        let data = new Data(this.superThis);
        data.SetSyncMode(1);

        let pkt = new Packet(this.superThis);
        pkt.SetHead(Actions.Command.ActionGetInviteList);
        pkt.SetToken(this.superThis.GSLive.Command.commandToken)
        pkt.SetData(data.ToString());
        pkt.Send()
    }

    public async AcceptInvite(inviteID: string, extra: string) {
        let data = new Data(this.superThis);
        data.SetInvite(inviteID);
        data.SetExtra(extra)

        let pkt = new Packet(this.superThis);
        pkt.SetHead(Actions.Command.ActionAcceptInvite);
        pkt.SetToken(this.superThis.GSLive.Command.commandToken)
        pkt.SetData(data.ToString());
        pkt.Send();
    }

    public async GetCurrentRoomInfo() {
        let pkt = new TurnPacket(this.superThis);
        pkt.SetHead(Actions.TurnBased.GetRoomInfo);
        pkt.SetToken(this.superThis.GSLive.TurnbasedController.turnbasedToken);
        pkt.Send();
    }

    public async GetRoomMembersDetail() {
        let pkt = new TurnPacket(this.superThis);
        pkt.SetHead(Actions.TurnBased.ActionGetUsers);
        pkt.SetToken(this.superThis.GSLive.TurnbasedController.turnbasedToken);
        pkt.Send();
    }

    public async ChooseNext(whoIsNext: string | undefined = undefined) {
        let data = new TurnData(this.superThis);
        if (whoIsNext)
            data.Next = whoIsNext;

        let pkt = new TurnPacket(this.superThis);
        pkt.SetHead(Actions.TurnBased.ActionChooseNext);
        pkt.SetToken(this.superThis.GSLive.TurnbasedController.turnbasedToken);
        pkt.SetData(data.ToString());
        pkt.Send();
    }

    public async TakeTurn(data: string | undefined, whoIsNext: string | undefined = undefined) {
        let dataIn = new TurnData(this.superThis);
        if (whoIsNext)
            dataIn.Next = whoIsNext;
        dataIn.Data = data;

        let pkt = new TurnPacket(this.superThis);
        pkt.SetHead(Actions.TurnBased.ActionTakeTurn);
        pkt.SetToken(this.superThis.GSLive.TurnbasedController.turnbasedToken);
        pkt.SetData(dataIn.ToString());
        pkt.Send();
    }

    public async GetCurrentTurnMember() {
        let pkt = new TurnPacket(this.superThis);
        pkt.SetHead(Actions.TurnBased.ActionCurrentTurnDetail);
        pkt.SetToken(this.superThis.GSLive.TurnbasedController.turnbasedToken);
        pkt.Send();
    }

    public async Vote(outcomes: { memberID: string, outcome: { value: number, rank: number } }[]) {
        let dataIn = new TurnData(this.superThis);
        dataIn.Outcomes = outcomes;

        let pkt = new TurnPacket(this.superThis);
        pkt.SetHead(Actions.TurnBased.ActionVote);
        pkt.SetToken(this.superThis.GSLive.TurnbasedController.turnbasedToken);
        pkt.SetData(dataIn.ToString());
        pkt.Send();
    }

    public async AcceptVote(memberID: string) {

    }

    public async SetOrUpdateProperty(type: PropertyType, data: { name: string, value: string }) {
        let dataIn = new TurnData(this.superThis);

        dataIn.Head = 1;
        if (type === PropertyType.Room)
            dataIn.Head = 3;
        if (!data.name || data.name.length < 5 || data.name.length > 32)
            throw new Error("name of value should be between 5-32");

        if (!data.value || data.value.length > 1024)
            throw new Error("value of value should less than 1024");

        dataIn.ID = data.name;
        dataIn.Data = data.value;

        let pkt = new TurnPacket(this.superThis);
        pkt.SetHead(Actions.TurnBased.ModifyValue);
        pkt.SetToken(this.superThis.GSLive.TurnbasedController.turnbasedToken);
        pkt.SetData(dataIn.ToString());
        pkt.Send();
    }

    public async RemoveProperty(type: PropertyType, name: string) {
        let dataIn = new TurnData(this.superThis);

        dataIn.Head = 2;
        if (type === PropertyType.Room)
            dataIn.Head = 4;
        if (!name || name.length < 5 || name.length > 32)
            throw new Error("name of value should be between 5-32");


        dataIn.ID = name;

        let pkt = new TurnPacket(this.superThis);
        pkt.SetHead(Actions.TurnBased.ModifyValue);
        pkt.SetToken(this.superThis.GSLive.TurnbasedController.turnbasedToken);
        pkt.SetData(dataIn.ToString());
        pkt.Send();
    }

    public async LeaveRoom(whoIsNext: string | undefined = undefined) {
        let data = new TurnData(this.superThis);
        data.Next = whoIsNext;

        let pkt = new TurnPacket(this.superThis);
        pkt.SetHead(Actions.TurnBased.ActionLeave);
        pkt.SetToken(this.superThis.GSLive.TurnbasedController.turnbasedToken);
        pkt.SetData(data.ToString());
        pkt.Send();
    }

    // Event handlers
    public OnReconnected: (sender: object, reconnectStatus: boolean) => void = () => { };
    public OnJoinedRoom: (join: any) => void = () => { };
    public OnAutoMatchUpdated: (e: any) => void = () => { };
    public OnAutoMatchCanceled: (e: string) => void = () => { };
    public OnAvailableRoomsReceived: (sender: object, e: object[]) => void = () => { };
    public OnFindMemberReceived: (sender: object, e: object[]) => void = () => { };
    public OnInvitationSent: (e: object) => void = () => { };
    public OnInviteInboxReceived: (invites: object[]) => void = () => { };
    public OnCurrentRoomInfoReceived: (roomData: any) => void = () => { };
    public OnRoomMembersDetailReceived: (members: any[]) => void = () => { };
    public OnChoosedNext: (whoIsNext: object) => void = () => { };
    public OnTakeTurn: (sender: object, turn: object) => void = () => { };
    public OnCurrentTurnMember: (currentMember: Member) => void = () => { };
    public OnVoteReceived: (sender: object, vote: object) => void = () => { };
    public OnComplete: (sneder: object, complete: object) => void = () => { };
    public OnPropertyUpdated: (payload: PropertyChange) => void = () => { };
    public OnLeaveRoom: (member: any) => void = () => { };
}