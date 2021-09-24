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
    public OnChatReceived: (msg: Message) => void = () => { };

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

    public async GetAndRemovePrivateMessages() {
        let pkt = new Packet();
        pkt.SetHead(Actions.Command.ActionGetPrivateMessages);
        pkt.SetToken(GameService.GSLive.Command.commandToken)
        pkt.Send();
    }
    public onPrivateMessages: (Messages: object[]) => void = () => { };

    public async GetContactPrivateMessages() {
        let pkt = new Packet();
        pkt.SetHead(Actions.Command.ActionGetContactPrivateMessages);
        pkt.SetToken(GameService.GSLive.Command.commandToken)
        pkt.Send();
    }
    public onContactPrivateMessages: (Contacts: object[]) => void = () => { };


    public async UnSubscribeChannel(channelName: string) {
        let pkt = new Packet();
        pkt.SetHead(Actions.Command.ActionUnSubscribe);
        pkt.SetToken(GameService.GSLive.Command.commandToken)
        pkt.SetMsg(channelName)
        pkt.Send();
    }
    public OnUnSubscribeChannel: (channelName: string) => void = (channelName) => { };

    public async RemoveChannelMessage(channelName: string, messageID: string) {
        let payload = new Message();
        payload.SetTo(channelName);
        payload.SetText(messageID);
        payload.SetIsPrivate(false)

        let pkt = new Packet();
        pkt.SetHead(Actions.Command.ActionChatRemoved);
        pkt.SetToken(GameService.GSLive.Command.commandToken)
        pkt.SetData(payload.ToString())

        pkt.Send();
    }
    public async RemovePrivateMessage(memberID:string,messageID: string) {
        let payload = new Message();
        payload.SetTo(memberID);
        payload.SetText(messageID);
        payload.SetIsPrivate(true)

        let pkt = new Packet();
        pkt.SetHead(Actions.Command.ActionChatRemoved);
        pkt.SetToken(GameService.GSLive.Command.commandToken)
        pkt.SetData(payload.ToString())

        pkt.Send();
    }
    public OnRemoveMessage: (deletedMessage: object) => void = () => { };

    public async ClearHistoryPrivateMessages(memberID: string) {
        let payload = new Message();
        payload.SetText(memberID);
        payload.SetIsPrivate(true)

        let pkt = new Packet();
        pkt.SetHead(Actions.Command.ActionRemoveMessages);
        pkt.SetToken(GameService.GSLive.Command.commandToken)
        pkt.SetData(payload.ToString())

        pkt.Send();
    }
    public onClearHistoryPrivateMessages: (memberID:String) => void = () => { };

    public async RemoveChannelMessages(channelName: string) {
        let payload = new Message();
        payload.SetText(channelName);
        payload.SetIsPrivate(false)

        let pkt = new Packet();
        pkt.SetHead(Actions.Command.ActionRemoveMessages);
        pkt.SetToken(GameService.GSLive.Command.commandToken)
        pkt.SetData(payload.ToString())

        pkt.Send();
    }
    public onRemoveChannelMessages: (channelName:String) => void = () => { };

    public async RemoveAllChannelMessages() {
        let payload = new Message();
        payload.SetIsPrivate(false)

        let pkt = new Packet();
        pkt.SetHead(Actions.Command.ActionRemoveAllMessages);
        pkt.SetToken(GameService.GSLive.Command.commandToken)
        pkt.SetData(payload.ToString())

        pkt.Send();
    }
    public onRemoveAllChannelMessages: () => void = () => { };

    public async RemoveAllPrivateMessages() {
        let payload = new Message();
        payload.SetIsPrivate(true)

        let pkt = new Packet();
        pkt.SetHead(Actions.Command.ActionRemoveAllMessages);
        pkt.SetToken(GameService.GSLive.Command.commandToken)
        pkt.SetData(payload.ToString())

        pkt.Send();
    }
    public onRemoveAllPrivateMessages: () => void = () => { };

    public async RemoveMemberMessages(channelName: string, memberID: string) {
        let payload = new Message();
        payload.SetTo(channelName);
        payload.SetText(memberID);

        let pkt = new Packet();
        pkt.SetHead(Actions.Command.ActionMemberChatsRemoved);
        pkt.SetToken(GameService.GSLive.Command.commandToken)
        pkt.SetData(payload.ToString())
        pkt.Send();
    }
    public OnRemoveMemberMessages: (channelName: string, messageID: string) => void = () => { };

    public async GetAggrigatedPrivateMessages() {
        let pkt = new Packet();
        pkt.SetHead(Actions.Command.ActionGetAggPrivateMessages);
        pkt.SetToken(GameService.GSLive.Command.commandToken)
        pkt.Send();
    }
    public onGetAggrigatedPrivateMessages: (result: object[]) => void = (result) => { };

    public async EditPrivateMessage(memberID: string, messageID: string, Text: string | undefined, Property: string | undefined) {
        let payload = new Message();
        payload.SetTo(memberID);
        payload.SetID(messageID);
        payload.SetText(Text!);
        payload.SetProperty(Property!);
        payload.SetIsPrivate(true);

        let pkt = new Packet();
        pkt.SetHead(Actions.Command.ActionEditMessage);
        pkt.SetToken(GameService.GSLive.Command.commandToken)
        pkt.SetData(payload.ToString())
        pkt.Send();
    }
    public OnEditPrivateMessage: (newMessage:object) => void = () => { };

    public async EditChannelMessage(channelName: string, messageID: string, Text: string | undefined, Property: string | undefined) {
        let payload = new Message();
        payload.SetTo(channelName);
        payload.SetID(messageID);
        payload.SetText(Text!);
        payload.SetProperty(Property!);
        payload.SetIsPrivate(false);

        let pkt = new Packet();
        pkt.SetHead(Actions.Command.ActionEditMessage);
        pkt.SetToken(GameService.GSLive.Command.commandToken)
        pkt.SetData(payload.ToString())
        pkt.Send();
    }
    public OnEditChannelMessage: (newMessage:object) => void = () => { };
}
