import { GameService } from '../..';
import { Log } from '../../../Utils/Logger';
import { Actions } from '../../../Utils/Consts';
import { Data, Packet, Payload } from '../Controllers/Command/models';
import { Message } from './models';

export class Chats {
    constructor() { }

    public async SubscribeChannel(channelName: string) {
        let pkt = new Packet();
        pkt.SetHead(Actions.Command.ActionSubscribe);
        pkt.SetToken(GameService.GSLive.Command.commandToken)
        pkt.SetMsg(channelName)
        pkt.Send();
    }
    public OnSubscribeChannel: (channelName: string) => void = (channelName) => { }

    public async SendChannelMessage(channelName: string, message: string) {
        let payload = new Message();
        payload.SetTo(channelName);
        payload.SetText(message);

        let pkt = new Packet();
        pkt.SetHead(Actions.Command.ActionChat);
        pkt.SetToken(GameService.GSLive.Command.commandToken)
        pkt.SetData(payload.ToString())
        pkt.Send();
    }

    public async SendPrivateMessage(memberID: string, message: string) {
        let payload = new Message();
        payload.SetTo(memberID);
        payload.SetText(message);

        let pkt = new Packet();
        pkt.SetHead(Actions.Command.ActionPrivateChat);
        pkt.SetToken(GameService.GSLive.Command.commandToken)
        pkt.SetData(payload.ToString())
        pkt.Send();
    }
    public OnChatReceived: (channelName: string, sender: object, message: string, isPrivate: boolean) => void = () => { };

    public async GetChannelsSubscribed() {
        let pkt = new Packet();
        pkt.SetHead(Actions.Command.ActionGetSubscribedChannels);
        pkt.SetToken(GameService.GSLive.Command.commandToken)
        pkt.Send();
    }
    public ChannelsSubscribed: (channels: object[]) => void = () => { };

    public async GetChannelRecentMessages(channelName: string) {
        let payload = new Data();
        payload.SetID(channelName);

        let pkt = new Packet();
        pkt.SetHead(Actions.Command.ActionGetLastGroupMessages);
        pkt.SetToken(GameService.GSLive.Command.commandToken)
        pkt.SetData(payload.ToString())
        pkt.Send();
    }
    public ChannelsRecentMessages: (messages: object[]) => void = () => { };

    public async GetChannelMembers(channelName: string, skip: number = 0, limit: number = 25) {
        let payload = new Data();
        payload.SetID(channelName);
        payload.SetMin(skip)
        payload.SetMax(limit)

        let pkt = new Packet();
        pkt.SetHead(Actions.Command.ActionGetMembersOfChannel);
        pkt.SetToken(GameService.GSLive.Command.commandToken)
        pkt.SetData(payload.ToString())
        pkt.Send();
    }
    public ChannelMembers: (members: object[]) => void = () => { };

    public async GetPendingMessages() {
        let pkt = new Packet();
        pkt.SetHead(Actions.Command.ActionGetPendingMessages);
        pkt.SetToken(GameService.GSLive.Command.commandToken)
        pkt.Send();
    }
    public PendingMessages: (pendingMessages: object[]) => void = () => { };

    public async UnSubscribeChannel(channelName: string) {
        let pkt = new Packet();
        pkt.SetHead(Actions.Command.ActionUnSubscribe);
        pkt.SetToken(GameService.GSLive.Command.commandToken)
        pkt.SetMsg(channelName)
        pkt.Send();
    }
    public OnUnSubscribeChannel: (channelName: string) => void = (channelName) => { };
}
