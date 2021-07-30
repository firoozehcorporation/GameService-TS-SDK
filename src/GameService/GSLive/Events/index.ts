import { GameService } from '../..';
import { Packet } from '../Controllers/Command/models';
import { Event } from './models';
import { Actions } from '../../../Utils/Consts';

export class Events {
    constructor() { }

    public async PushEventToMember(memberID: string, message: string, SendAfter?: number, buffering: boolean = true) {
        let payload = new Event();
        payload.SetTo(memberID);
        payload.SetText(message);
        if (SendAfter)
            payload.SetSendAt(SendAfter);
        payload.SetSendType(1);
        payload.SetBuffering(buffering ? 2 : 1);

        let pkt = new Packet();
        pkt.SetHead(Actions.Command.ActionPushEvent);
        pkt.SetToken(GameService.GSLive.Command.commandToken)
        pkt.SetData(payload.ToString())
        pkt.Send();
    }

    public async PushEventToTag(tag: string, message: string, SendAfter?: number, buffering: boolean = true) {
        let payload = new Event();
        payload.SetTo(tag);
        payload.SetText(message);
        if (SendAfter)
            payload.SetSendAt(SendAfter);
        payload.SetSendType(2);
        payload.SetBuffering(buffering ? 2 : 1);

        let pkt = new Packet();
        pkt.SetHead(Actions.Command.ActionPushEvent);
        pkt.SetToken(GameService.GSLive.Command.commandToken)
        pkt.SetData(payload.ToString())
        pkt.Send();
    }

    public async GetMemberEvents() {
        let pkt = new Packet();
        pkt.SetHead(Actions.Command.ActionGetUserEvents);
        pkt.SetToken(GameService.GSLive.Command.commandToken)
        pkt.Send();
    }

    public onPushEvent: (event: object) => void = () => { };
    public onGetMemberEvents: (events: object[]) => void = () => { };

}