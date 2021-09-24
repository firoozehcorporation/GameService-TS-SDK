import { Actions, Url } from '../../../../Utils/Consts';
import { GameService } from '../../../index';
import nWebSocket from 'ws';
import { Area, Packet, Payload, StartGame } from './models';
import { Message } from '../../Chats/models';
import { Log } from '../../../../Utils/Logger';
import { GSLive } from '../..';
import { Event } from '../../Events/models';

export class Command {
    constructor() { }

    commandToken: string = "";
    isInAutoMatchQueue = false;

    public Initilize(relay: any) {
        if (relay.ip == undefined || relay.port == undefined)
            return console.error("No valid command returned from HttpServices", { relay });
        if (typeof window === 'undefined') {
            Log("[Command]", `[Node] [Connecting] [${relay.ip}:${relay.port}]`);
            GSLive.CommandConnection = new nWebSocket(`ws://${relay.ip}:${relay.port}`);
        } else {
            Log("[Command]", `[Browser] [Connecting] [${relay.port}:${relay.port}]`);
            GSLive.CommandConnection = new WebSocket(`ws://${relay.ip}:${relay.port}`);
        }

        GameService.GSLive.Cipher = relay.cipher;
        GameService.GSLive.isEncriptionActive = relay.encription != "deactive";

        GSLive.CommandConnection!.onopen = this.OnConnect
        GSLive.CommandConnection!.onmessage = this.OnReceive;
        GSLive.CommandConnection!.onclose = this.onDisconnect;

        GSLive.CommandConnection!.onerror = (err: nWebSocket.ErrorEvent) => {
            throw err;
        };
    }

    protected OnConnect = (e: nWebSocket.OpenEvent) => {
        console.log("[Command] [Connected]")
        // Send Auth pkt
        let payload = new Payload();
        payload.SetGameID(GameService.Authentication.gameID);
        payload.SetToken(GameService.Authentication.userToken);

        let pkt = new Packet();
        pkt.SetHead(Actions.Command.ActionAuth);
        pkt.SetData(payload.ToString())
        pkt.Send(false);
    }

    protected OnReceive = async (event: nWebSocket.MessageEvent) => {
        let packet = new Packet()
        packet.Parse(event.data, GameService.GSLive.Cipher != "" && this.commandToken != "");

        switch (packet.GetHead()) {
            case Actions.Command.ActionAuth:
                this.commandToken = packet.GetToken()!;
                GameService.onReady()
                break
            // ---- Chats ---- //
            case Actions.Command.ActionChat:
                let msgPublic = new Message();
                msgPublic.Parse(packet.GetData()!)
                GameService.GSLive.Chats.OnChatReceived(msgPublic)
                break
            case Actions.Command.ActionPrivateChat:
                let msgPrivate = new Message();
                msgPrivate.Parse(packet.GetData()!)
                GameService.GSLive.Chats.OnChatReceived(msgPrivate)
                break
            case Actions.Command.ActionSubscribe:
                GameService.GSLive.Chats.OnSubscribeChannel(packet.GetMsg()!)
                break
            case Actions.Command.ActionUnSubscribe:
                GameService.GSLive.Chats.OnUnSubscribeChannel(packet.GetMsg()!)
                break
            case Actions.Command.ActionGetLastGroupMessages:
                let msgs: object[] = JSON.parse(packet.GetData()!);
                let groupMsgs = [];
                for (let i = 0; i < msgs.length; i++) {
                    let pMsg = new Message();
                    pMsg.RawParse(msgs[i])
                    groupMsgs.push(pMsg);
                }
                GameService.GSLive.Chats.ChannelsRecentMessages(groupMsgs)
                break
            case Actions.Command.ActionGetMembersOfChannel:
                let members: object[] = JSON.parse(packet.GetData()!);
                GameService.GSLive.Chats.ChannelMembers(members)
                break
            case Actions.Command.ActionGetSubscribedChannels:
                let channels: object[] = JSON.parse(packet.GetData()!);
                GameService.GSLive.Chats.ChannelsSubscribed(channels)
                break
            case Actions.Command.ActionGetPrivateMessages:
                let msgS: object[] = JSON.parse(packet.GetData()!);
                let res = [];
                for (let i = 0; i < msgS.length; i++) {
                    let pMsg = new Message();
                    pMsg.RawParse(msgS[i])
                    res.push(pMsg);
                }
                GameService.GSLive.Chats.onPrivateMessages(res)
                break
            case Actions.Command.ActionChatRemoved:
                let deletedMsg = new Message();
                deletedMsg.Parse(packet.GetData()!)
                GameService.GSLive.Chats.OnRemoveMessage(deletedMsg)
                break
            case Actions.Command.ActionRemoveMessages:
                let removeInfo2 = new Message();
                removeInfo2.Parse(packet.GetData()!)
                if (removeInfo2.GetIsPrivate())
                    GameService.GSLive.Chats.onClearHistoryPrivateMessages(removeInfo2.GetText()!)
                else
                    GameService.GSLive.Chats.onRemoveChannelMessages(removeInfo2.GetText()!)
                break
            case Actions.Command.ActionRemoveAllMessages:
                let removeInfo = new Message();
                removeInfo.Parse(packet.GetData()!)
                if (removeInfo.GetIsPrivate())
                    GameService.GSLive.Chats.onRemoveAllPrivateMessages()
                else
                    GameService.GSLive.Chats.onRemoveAllChannelMessages()
                break
            case Actions.Command.ActionMemberChatsRemoved:
                let memberDeletedInfo = new Message();
                memberDeletedInfo.Parse(packet.GetData()!)
                GameService.GSLive.Chats.OnRemoveMemberMessages(memberDeletedInfo.GetTo()!, memberDeletedInfo.GetText()!)
                break
            case Actions.Command.ActionGetAggPrivateMessages:
                let aggMegs = JSON.parse(packet.GetData()!)
                GameService.GSLive.Chats.onGetAggrigatedPrivateMessages(aggMegs)
                break
            case Actions.Command.ActionEditMessage:
                let editedMsg = new Message();
                editedMsg.Parse(packet.GetData()!)
                if (editedMsg.GetIsPrivate())
                    GameService.GSLive.Chats.OnEditPrivateMessage(editedMsg)
                else
                    GameService.GSLive.Chats.OnEditChannelMessage(editedMsg)
                break
            case Actions.Command.ActionGetContactPrivateMessages:
                let contact: object[] = JSON.parse(packet.GetData()!);
                GameService.GSLive.Chats.onContactPrivateMessages(contact)
                break

            // ---- Create Room ---- //
            case Actions.Command.ActionAutoMatch:
                let autoMatchInfo;
                if (packet.GetData() != undefined) {
                    autoMatchInfo = JSON.parse(packet.GetData()!)
                }
                if (packet.GetMsg()) {
                    autoMatchInfo = packet.GetMsg();
                }
                GameService.GSLive.TurnBased.OnAutoMatchUpdated(autoMatchInfo);
                GameService.GSLive.RealTime.OnAutoMatchUpdated(autoMatchInfo);
                this.isInAutoMatchQueue = true;
                break
            case Actions.Command.LeftWaitingQ:
                GameService.GSLive.TurnBased.OnAutoMatchCanceled(packet.GetMsg() || "")
                GameService.GSLive.RealTime.OnAutoMatchCanceled(packet.GetMsg() || "")
                this.isInAutoMatchQueue = false;
                break
            case Actions.Command.ActionGetRooms:
                let rooms = JSON.parse(packet.GetData()!);
                GameService.GSLive.RealTime.OnAvailableRoomsReceived(rooms)
                GameService.GSLive.TurnBased.OnAvailableRoomsReceived(rooms)
                break
            case Actions.Command.ActionRoleDetail:
                let roleDetail = JSON.parse(packet.GetData()!);
                GameService.GSLive.RealTime.OnRoleDetail(roleDetail)
                GameService.GSLive.TurnBased.OnRoleDetail(roleDetail)
                break

            case Actions.Command.ActionJoinRoom:
                // connect to relay
                let start = new StartGame();
                start.parse(packet.GetData()!)
                if (start.Room!["syncMode"] == 1)
                    await GameService.GSLive.TurnbasedController.Initilize(start.Room!["_id"], start.Area!.Endpoint, start.Area!.Port)
                else
                    await GameService.GSLive.RealTimeController.Initilize(start.Room!["_id"], start.Area?.Hash!, start.Area!.Endpoint, start.Area!.Port)
                this.isInAutoMatchQueue = false;
                break
            // case Actions.Command.ActionKickUser:

            //     break
            case Actions.Command.ActionFindUser:
                let result = JSON.parse(packet.GetData()!);
                GameService.GSLive.TurnBased.OnFindMemberReceived(result);
                GameService.GSLive.RealTime.OnFindMemberReceived(result);
                break
            case Actions.Command.ActionPushEvent:
                let event = new Event();
                event.Parse(packet.GetData()!)
                GameService.GSLive.Events.onPushEvent(event);
                break
            case Actions.Command.ActionGetUserEvents:
                let t = JSON.parse(packet.GetData()!);
                let events = [];
                for (let i = 0; i < t.length; i++) {
                    let event = new Event();
                    event.RawParse(t[i])
                    events.push(event)
                }
                GameService.GSLive.Events.onGetMemberEvents(events);
                break
            case Actions.Command.ActionEditRoom:
                let newRoomData = JSON.parse(packet.GetData()!);
                GameService.GSLive.TurnBased.onEditRoom(newRoomData);
                GameService.GSLive.RealTime.onEditRoom(newRoomData);
                break
            case Actions.Error:
                console.error(`[Command] [Error] [Msg: ${packet.GetMsg()}]`)
                break
        }
    }

    private onDisconnect = (event: nWebSocket.CloseEvent) => {
        if (event.wasClean) {
            Log("[Command]", `[close] Connection closed cleanly, code = ${event.code} reason = ${event.reason}`);
        } else {
            Log("[Command]", '[close] Connection died');
        }
        this.commandToken = "";
    }
}