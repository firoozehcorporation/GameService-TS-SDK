import { GameService } from '../..';
import { Log } from '../../../Utils/Logger';
import { Actions } from '../../../Utils/Consts';
import { CreateRoomOptions, AutoMatchOptions, GProtocolSendType, EventPayload } from './models';
import { Data, Packet, Payload } from '../Controllers/Command/models';
import { Packet as RtPacket, Data as RtData, StringToBuffer, Types, Operations } from '../Controllers/RealTime/models';
export class RealTime {
    constructor() { }

    // Functions
    public async CreateRoom(options: CreateRoomOptions) {
        if (GameService.GSLive.Command.commandToken == "")
            throw "User not connected to Command Server";
        if (GameService.GSLive.RealTimeController.RoomID)
            throw "User is already in game room, please left from it first.";

        let data = new Data();
        data.SetMax(options.maxPlayer);
        data.SetMin(options.minPlayer);
        data.SetName(options.roomName);
        data.SetPassword(options.roomPassword!);
        data.SetRole(options.role);
        data.SetPersist(options.isPersist);
        data.SetPrivate(options.isPrivate);
        data.SetExtra(options.extra!);
        data.SetSyncMode(2);

        let pkt = new Packet();
        pkt.SetHead(Actions.Command.ActionCreateRoom);
        pkt.SetToken(GameService.GSLive.Command.commandToken)
        pkt.SetData(data.ToString())
        pkt.Send()
    }

    public async AutoMatch(options: AutoMatchOptions) {
        if (GameService.GSLive.Command.commandToken == "")
            throw "User not connected to Command Server";
        if (GameService.GSLive.Command.isInAutoMatchQueue)
            throw "User is in automatch queue already";
        if (GameService.GSLive.RealTimeController.RoomID)
            throw "User is already in game room, please left from it first.";

        let data = new Data();
        data.SetMax(options.maxPlayer);
        data.SetMin(options.minPlayer);
        data.SetRole(options.role);
        data.SetPersist(options.isPersist);
        data.SetExtra(options.extra!);
        data.SetSyncMode(2);

        let pkt = new Packet();
        pkt.SetHead(Actions.Command.ActionAutoMatch);
        pkt.SetToken(GameService.GSLive.Command.commandToken)
        pkt.SetData(data.ToString())
        pkt.Send()
    }

    public async CancelAutoMatch() {
        if (GameService.GSLive.Command.commandToken == "")
            throw "User not connected to Command Server";
        if (!GameService.GSLive.Command.isInAutoMatchQueue)
            throw "User is not in automatch queue";

        let pkt = new Packet();
        pkt.SetHead(Actions.Command.LeftWaitingQ);
        pkt.SetToken(GameService.GSLive.Command.commandToken)
        pkt.Send()
    }

    public async GetAvailableRooms(role: string, limit: number) {
        if (GameService.GSLive.Command.commandToken == "")
            throw "User not connected to Command Server";
        let data = new Data();
        data.SetMax(limit);
        data.SetRole(role);

        let pkt = new Packet();
        pkt.SetHead(Actions.Command.ActionGetRooms);
        pkt.SetToken(GameService.GSLive.Command.commandToken)
        pkt.SetData(data.ToString());
        pkt.Send()
    }

    public async JoinRoom(roomID: string, extra: string | undefined = undefined, password: string | undefined = undefined) {
        if (GameService.GSLive.Command.commandToken == "")
            throw "User not connected to Command Server";
        if (GameService.GSLive.RealTimeController.RoomID)
            throw "User is already in game room, please left from it first.";

        let data = new Data();
        data.SetID(roomID);
        data.SetExtra(extra!);
        data.SetPassword(password!);

        let pkt = new Packet();
        pkt.SetHead(Actions.Command.ActionJoinRoom);
        pkt.SetToken(GameService.GSLive.Command.commandToken)
        pkt.SetData(data.ToString());
        pkt.Send()
    }

    public async FindMember(query: string, limit: number) {
        if (GameService.GSLive.Command.commandToken == "")
            throw "User not connected to Command Server";
        let data = new Data();
        data.SetUser(query);
        data.SetMax(limit);

        let pkt = new Packet();
        pkt.SetHead(Actions.Command.ActionFindUser);
        pkt.SetToken(GameService.GSLive.Command.commandToken)
        pkt.SetData(data.ToString());
        pkt.Send()
    }

    public async InviteUser(roomID: string, userID: string) {
        if (GameService.GSLive.Command.commandToken == "")
            throw "User not connected to Command Server";
        let data = new Data();
        data.SetID(roomID);
        data.SetUser(userID);

        let pkt = new Packet();
        pkt.SetHead(Actions.Command.ActionInviteUser);
        pkt.SetToken(GameService.GSLive.Command.commandToken)
        pkt.SetData(data.ToString());
        pkt.Send()
    }

    public async GetInviteInbox() {
        if (GameService.GSLive.Command.commandToken == "")
            throw "User not connected to Command Server";
        let data = new Data();
        data.SetSyncMode(2);

        let pkt = new Packet();
        pkt.SetHead(Actions.Command.ActionGetInviteList);
        pkt.SetToken(GameService.GSLive.Command.commandToken)
        pkt.SetData(data.ToString());
        pkt.Send()
    }

    public async AcceptInvite(inviteID: string, extra: string) {
        if (GameService.GSLive.Command.commandToken == "")
            throw "User not connected to Command Server";
        if (GameService.GSLive.RealTimeController.RoomID)
            throw "User is already in game room, please left from it first.";

        let data = new Data();
        data.SetInvite(inviteID);
        data.SetExtra(extra)

        let pkt = new Packet();
        pkt.SetHead(Actions.Command.ActionAcceptInvite);
        pkt.SetToken(GameService.GSLive.Command.commandToken)
        pkt.SetData(data.ToString());
        pkt.Send();
    }

    public async GetCurrentRoomInfo() {
        if (GameService.GSLive.RealTimeController.RoomID.length < 1)
            throw "User is not in any game room";

        let packet = new RtPacket();
        packet.Action = Actions.RealTime.ActionRoomInfo
        packet.Token = GameService.GSLive.RealTimeController.realtimeToken;
        packet.Send()
    }

    public async GetRoomMembersDetail() {
        if (GameService.GSLive.RealTimeController.RoomID.length < 1)
            throw "User is not in any game room";

        let packet = new RtPacket();
        packet.Action = Actions.RealTime.ActionMembersDetail
        packet.Token = GameService.GSLive.RealTimeController.realtimeToken;
        packet.Send()
    }

    public async SendPublicMessage(data: string, sendType: GProtocolSendType) {
        if (GameService.GSLive.RealTimeController.RoomID.length < 1)
            throw "User is not in any game room";

        let packet = new RtPacket();
        packet.Action = Actions.RealTime.ActionPublicMessage
        packet.Token = GameService.GSLive.RealTimeController.realtimeToken;
        packet.Type = sendType
        packet.Payload = StringToBuffer(data);
        packet.Send()
    }

    public async SendPrivateMessage(recieverID: string, data: string) {
        if (GameService.GSLive.RealTimeController.RoomID.length < 1)
            throw "User is not in any game room";

        let payload = new RtData();
        payload.ReceiverID = recieverID;
        payload.Payload = StringToBuffer(data);

        let packet = new RtPacket();
        packet.Action = Actions.RealTime.ActionPrivateMessage
        packet.Token = GameService.GSLive.RealTimeController.realtimeToken;
        packet.Payload = payload.Serialize()
        packet.Send()
    }

    public async SetOrUpdateMemberProperty(name: string, value: string) {
        if (GameService.GSLive.RealTimeController.RoomID.length < 1)
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
        packet.Token = GameService.GSLive.RealTimeController.realtimeToken;
        packet.Payload = data.Serialize()
        packet.Send()
    }

    public async RemoveMemberProperty(propertyName: string) {
        if (GameService.GSLive.RealTimeController.RoomID.length < 1)
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
        packet.Token = GameService.GSLive.RealTimeController.realtimeToken;
        packet.Payload = data.Serialize()
        packet.Send()
    }

    public async SetOrUpdateRoomProperty(name: string, value: string) {
        if (GameService.GSLive.RealTimeController.RoomID.length < 1)
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
        packet.Token = GameService.GSLive.RealTimeController.realtimeToken;
        packet.Payload = data.Serialize()
        packet.Send()
    }

    public async RemoveRoomProperty(propertyName: string) {
        if (GameService.GSLive.RealTimeController.RoomID.length < 1)
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
        packet.Token = GameService.GSLive.RealTimeController.realtimeToken;
        packet.Payload = data.Serialize()
        packet.Send()
    }

    public async GetRoomProperties() {
        if (GameService.GSLive.RealTimeController.RoomID.length < 1)
            throw "User is not in any game room";

        let packet = new RtPacket();
        packet.Action = Actions.RealTime.ActionGetRoomSnapshot
        packet.Token = GameService.GSLive.RealTimeController.realtimeToken;
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
        if (GameService.GSLive.RealTimeController.RoomID.length < 1)
            throw "User is not in any game room";

        let packet = new RtPacket();
        packet.Action = Actions.RealTime.ActionLeave
        packet.Token = GameService.GSLive.RealTimeController.realtimeToken;
        packet.Send()
    }

    // Event handlers
    public OnReconnected: (sender: object, reconnectStatus: boolean) => void = () => { };
    public OnJoinedRoom: (joinData: any) => void = () => { };
    public OnAutoMatchUpdated: (e: any) => void = () => { };
    public OnAutoMatchCanceled: (e: string) => void = () => { };
    public OnAvailableRoomsReceived: (sender: object, e: object[]) => void = () => { };
    public OnFindMemberReceived: (e: object[]) => void = () => { };
    public OnInvitationSent: (sender: object, e: object) => void = () => { };

    public CurrentRoomInfoReceived: (roomData: any) => void = () => { }
    public RoomMembersDetailReceived: (members: any[]) => void = () => { }
    public NewMessageReceived: (event: any) => void = () => { }
    public OnLeaveRoom: (member: any) => void = () => { }
    public OnPropertyEvent: (PropertyUpdate: any) => void = () => { }
}