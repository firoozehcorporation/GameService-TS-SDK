import { GameService } from '../..';
import { Log } from '../../../Utils/Logger';
import { Actions } from '../../../Utils/Consts';
import { CreateRoomOptions, AutoMatchOptions, GProtocolSendType, EventPayload } from './models';
import { Data, Packet, Payload } from '../Controllers/Command/models';
import { Packet as RtPacket, Data as RtData, StringToBuffer, Types, Operations } from '../Controllers/RealTime/models';
export class RealTime {
    constructor(public superThis: GameService) { }

    // Functions
    public async CreateRoom(options: CreateRoomOptions) {
        if (this.superThis.GSLive.RealTimeController.RoomID)
            throw "User is already in game room, please left from it first.";

        let data = new Data(this.superThis);
        data.SetMax(options.maxPlayer);
        data.SetMin(options.minPlayer);
        data.SetName(options.roomName);
        data.SetPassword(options.roomPassword!);
        data.SetRole(options.role);
        data.SetPersist(options.isPersist);
        data.SetPrivate(options.isPrivate);
        data.SetExtra(options.extra!);
        data.SetSyncMode(2);

        let pkt = new Packet(this.superThis);
        pkt.SetHead(Actions.Command.ActionCreateRoom);
        pkt.SetToken(this.superThis.GSLive.Command.commandToken)
        pkt.SetData(data.ToString())
        pkt.Send()
    }

    public async AutoMatch(options: AutoMatchOptions) {
        if (this.superThis.GSLive.Command.isInAutoMatchQueue)
            throw "User is in automatch queue already";
        if (this.superThis.GSLive.RealTimeController.RoomID)
            throw "User is already in game room, please left from it first.";

        let data = new Data(this.superThis);
        data.SetMax(options.maxPlayer);
        data.SetMin(options.minPlayer);
        data.SetRole(options.role);
        data.SetPersist(options.isPersist);
        data.SetExtra(options.extra!);
        data.SetSyncMode(2);

        let pkt = new Packet(this.superThis);
        pkt.SetHead(Actions.Command.ActionAutoMatch);
        pkt.SetToken(this.superThis.GSLive.Command.commandToken)
        pkt.SetData(data.ToString())
        pkt.Send()
    }

    public async CancelAutoMatch() {
        if (!this.superThis.GSLive.Command.isInAutoMatchQueue)
            throw "User is not in automatch queue";

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
        if (this.superThis.GSLive.RealTimeController.RoomID)
            throw "User is already in game room, please left from it first.";

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
        data.SetSyncMode(2);

        let pkt = new Packet(this.superThis);
        pkt.SetHead(Actions.Command.ActionGetInviteList);
        pkt.SetToken(this.superThis.GSLive.Command.commandToken)
        pkt.SetData(data.ToString());
        pkt.Send()
    }

    public async AcceptInvite(inviteID: string, extra: string) {
        if (this.superThis.GSLive.RealTimeController.RoomID)
            throw "User is already in game room, please left from it first.";

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
        if (this.superThis.GSLive.RealTimeController.RoomID.length < 1)
            throw "User is not in any game room";

        let packet = new RtPacket();
        packet.Action = Actions.RealTime.ActionRoomInfo
        packet.Token = this.superThis.GSLive.RealTimeController.realtimeToken;
        packet.Send()
    }

    public async GetRoomMembersDetail() {
        if (this.superThis.GSLive.RealTimeController.RoomID.length < 1)
            throw "User is not in any game room";

        let packet = new RtPacket();
        packet.Action = Actions.RealTime.ActionMembersDetail
        packet.Token = this.superThis.GSLive.RealTimeController.realtimeToken;
        packet.Send()
    }

    public async SendPublicMessage(data: string, sendType: GProtocolSendType) {
        if (this.superThis.GSLive.RealTimeController.RoomID.length < 1)
            throw "User is not in any game room";

        let packet = new RtPacket();
        packet.Action = Actions.RealTime.ActionPublicMessage
        packet.Token = this.superThis.GSLive.RealTimeController.realtimeToken;
        packet.Type = sendType
        packet.Payload = StringToBuffer(data);
        packet.Send()
    }

    public async SendPrivateMessage(recieverID: string, data: string) {
        if (this.superThis.GSLive.RealTimeController.RoomID.length < 1)
            throw "User is not in any game room";

        let payload = new RtData();
        payload.ReceiverID = recieverID;
        payload.Payload = StringToBuffer(data);

        let packet = new RtPacket();
        packet.Action = Actions.RealTime.ActionPrivateMessage
        packet.Token = this.superThis.GSLive.RealTimeController.realtimeToken;
        packet.Payload = payload.Serialize()
        packet.Send()
    }

    public async SetOrUpdateMemberProperty(name: string, value: string) {
        if (this.superThis.GSLive.RealTimeController.RoomID.length < 1)
            throw "User is not in any game room";

        let ev = new EventPayload();
        ev.Name = name;
        ev.Value = StringToBuffer(value);

        let payload = new RtData();
        payload.Payload = ev.Serialize();

        let data = new RtData();
        data.SetExtra(Types.Property, Operations.SetMemberProperty);
        data.Payload = ev.Serialize();

        let packet = new RtPacket();
        packet.Action = Actions.RealTime.ActionEventMessage
        packet.Token = this.superThis.GSLive.RealTimeController.realtimeToken;
        packet.Payload = data.Serialize()
        packet.Send()
    }

    public async RemoveMemberProperty(propertyName: string) {
        if (this.superThis.GSLive.RealTimeController.RoomID.length < 1)
            throw "User is not in any game room";

        let ev = new EventPayload();
        ev.Name = propertyName;

        let payload = new RtData();
        payload.Payload = ev.Serialize();

        let data = new RtData();
        data.SetExtra(Types.Property, Operations.DelMemberProperty);
        data.Payload = ev.Serialize();

        let packet = new RtPacket();
        packet.Action = Actions.RealTime.ActionEventMessage
        packet.Token = this.superThis.GSLive.RealTimeController.realtimeToken;
        packet.Payload = data.Serialize()
        packet.Send()
    }

    public async SetOrUpdateRoomProperty(name: string, value: string) {
        if (this.superThis.GSLive.RealTimeController.RoomID.length < 1)
            throw "User is not in any game room";

        let ev = new EventPayload();
        ev.Name = name;
        ev.Value = StringToBuffer(value);

        let payload = new RtData();
        payload.Payload = ev.Serialize();

        let data = new RtData();
        data.SetExtra(Types.Property, Operations.SetRoomProperty);
        data.Payload = ev.Serialize();

        let packet = new RtPacket();
        packet.Action = Actions.RealTime.ActionEventMessage
        packet.Token = this.superThis.GSLive.RealTimeController.realtimeToken;
        packet.Payload = data.Serialize()
        packet.Send()
    }

    public async RemoveRoomProperty(propertyName: string) {
        if (this.superThis.GSLive.RealTimeController.RoomID.length < 1)
            throw "User is not in any game room";

        let ev = new EventPayload();
        ev.Name = propertyName;

        let payload = new RtData();
        payload.Payload = ev.Serialize();

        let data = new RtData();
        data.SetExtra(Types.Property, Operations.DelRoomProperty);
        data.Payload = ev.Serialize();

        let packet = new RtPacket();
        packet.Action = Actions.RealTime.ActionEventMessage
        packet.Token = this.superThis.GSLive.RealTimeController.realtimeToken;
        packet.Payload = data.Serialize()
        packet.Send()
    }

    public async GetRoomProperties() {
        if (this.superThis.GSLive.RealTimeController.RoomID.length < 1)
            throw "User is not in any game room";

        let packet = new RtPacket();
        packet.Action = Actions.RealTime.ActionGetRoomSnapshot
        packet.Token = this.superThis.GSLive.RealTimeController.realtimeToken;
        packet.Send()
    }

    // public async GetRoomProperty(propertyName: string) {

    // }

    // public async GetMemberProperties(memberID: string) {

    // }

    // public async GetPropertyValues(propertyName: string) {

    // }

    // public async GetPropertyAndValueMembers(name: string, value: string) {

    // }

    // public async GetPropertyMembers(propertyName: string) {

    // }

    // public async GetRoomMembers() {

    // }

    public async LeaveRoom() {
        if (this.superThis.GSLive.RealTimeController.RoomID.length < 1)
            throw "User is not in any game room";

        let packet = new RtPacket();
        packet.Action = Actions.RealTime.ActionLeave
        packet.Token = this.superThis.GSLive.RealTimeController.realtimeToken;
        packet.Send()
    }

    // Event handlers
    public OnReconnected: (sender: object, reconnectStatus: boolean) => void = () => { };
    public OnJoinedRoom: (joinData: any) => void = () => { };
    public OnAutoMatchUpdated: (e: any) => void = () => { };
    public OnAutoMatchCanceled: (e: string) => void = () => { };
    public OnAvailableRoomsReceived: (sender: object, e: object[]) => void = () => { };
    public OnFindMemberReceived: (sender: object, e: object[]) => void = () => { };
    public OnInvitationSent: (sender: object, e: object) => void = () => { };

    public CurrentRoomInfoReceived: (roomData: any) => void = () => { }
    public RoomMembersDetailReceived: (members: any[]) => void = () => { }
    public NewMessageReceived: (event: any) => void = () => { }
    public LeftRoom: (member: any) => void = () => { }
    public OnPropertyEvent: (PropertyUpdate: any) => void = () => { }
}