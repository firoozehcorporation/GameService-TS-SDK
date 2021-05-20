import { GameService } from '../..';
import { Log } from '../../../Utils/Logger';
import { Actions } from '../../../Utils/Consts';
import { PropertyType, CreateRoomOptions, AutoMatchOptions } from './models';
import { Data, Packet, Payload } from '../Controllers/Command/models';

export class RealTime {
    constructor(public superThis: GameService) { }

    // Functions

    public async CreateRoom(options: CreateRoomOptions) {
        let data = new Data(this.superThis);
        data.SetMax(options.maxPlayer);
        data.SetMin(options.minPlayer);
        data.SetName(options.roomname);
        data.SetPassword(options.roomPassword);
        data.SetRole(options.role);
        data.SetPersist(options.isPersist);
        data.SetPrivate(options.isPrivate);
        data.SetExtra(options.extra);

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
        data.SetExtra(options.extra);

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
        data.SetExtra(extra);
        data.SetPassword(password);

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
        let data = new Data(this.superThis);
        data.SetInvite(inviteID);
        data.SetExtra(extra)

        let pkt = new Packet(this.superThis);
        pkt.SetHead(Actions.Command.ActionAcceptInvite);
        pkt.SetToken(this.superThis.GSLive.Command.commandToken)
        pkt.SetData(data.ToString());
        pkt.Send();
    }

    // Event handlers
    public OnReconnected: (sender: object, reconnectStatus: boolean) => void;
    public OnJoinedRoom: (sender: object, join: object) => void;
    public OnAutoMatchUpdated: (sender: object, e: object) => void;
    public OnAutoMatchCanceled: (sender: object, e: object) => void;
    public OnAvailableRoomsReceived: (sender: object, e: object[]) => void;
    public OnFindMemberReceived: (sender: object, e: object[]) => void;
    public OnInvitationSent: (sender: object, e: object) => void;
}