import { Actions, Url } from '../../../../Utils/Consts';
import { GameService } from '../../../index';
import WebSocket from 'ws';
import { Area, Packet, Payload, StartGame } from './models';
import { Message } from '../../Chats/models';
import { Log } from '../../../../Utils/Logger';
import { GSLive } from '../..';

export class Command {
    constructor(public superThis: GameService) { }

    commandToken: string = "";
    isInAutoMatchQueue = false;

    public Initilize() {
        Log("[Command]", `[Connecting][${Url.Command.Endpoint}]`);
        GSLive.CommandConnection = new WebSocket(Url.Command.Endpoint);
        GSLive.CommandConnection!.onopen = this.OnConnect
        GSLive.CommandConnection!.onmessage = this.OnReceive;
        GSLive.CommandConnection!.onclose = this.onDisconnect;
        GSLive.CommandConnection!.onerror = function (error) {
            throw error;
        };
    }

    protected OnConnect = (e: WebSocket.OpenEvent) => {
        // Send Auth pkt
        let payload = new Payload(this.superThis);
        payload.SetGameID(this.superThis.Authentication.gameID);
        payload.SetToken(this.superThis.Authentication.userToken);

        let pkt = new Packet(this.superThis);
        pkt.SetHead(Actions.Command.ActionAuth);
        pkt.SetData(payload.ToString())
        pkt.Send();
    }

    protected OnReceive = async (event: WebSocket.MessageEvent) => {
        // Log("[Command]", `[OnReceive]: ${ event.data }`);

        let packet = new Packet(this.superThis)
        packet.Parse(event.data);

        switch (packet.GetHead()) {
            case Actions.Command.ActionAuth:
                this.commandToken = packet.GetToken()!;
                this.superThis.onReady()
                break
            // ---- Chats ---- //
            case Actions.Command.ActionChat:
                let msgPublic = new Message(this.superThis);
                msgPublic.Parse(packet.GetData()!)
                this.superThis.GSLive.Chats.OnChatReceived(msgPublic.GetChannel()!, msgPublic.GetFrom()!, msgPublic.GetText()!, false)
                break
            case Actions.Command.ActionPrivateChat:
                let msgPrivate = new Message(this.superThis);
                msgPrivate.Parse(packet.GetData()!)
                this.superThis.GSLive.Chats.OnChatReceived(msgPrivate.GetChannel()!, msgPrivate.GetFrom()!, msgPrivate.GetText()!, true)
                break
            case Actions.Command.ActionSubscribe:
                this.superThis.GSLive.Chats.OnSubscribeChannel(packet.GetMsg()!)
                break
            case Actions.Command.ActionUnSubscribe:
                this.superThis.GSLive.Chats.OnUnSubscribeChannel()
                break
            case Actions.Command.ActionGetLastGroupMessages:
                let msgs: object[] = JSON.parse(packet.GetData()!);
                this.superThis.GSLive.Chats.ChannelsRecentMessages(msgs)
                break
            case Actions.Command.ActionGetMembersOfChannel:
                let members: object[] = JSON.parse(packet.GetData()!);
                this.superThis.GSLive.Chats.ChannelMembers(members)
                break
            case Actions.Command.ActionGetSubscribedChannels:
                let channels: object[] = JSON.parse(packet.GetData()!);
                this.superThis.GSLive.Chats.ChannelsSubscribed(channels)
                break
            case Actions.Command.ActionGetPendingMessages:
                let pendings: object[] = JSON.parse(packet.GetData()!);
                this.superThis.GSLive.Chats.PendingMessages(pendings)
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
                this.superThis.GSLive.TurnBased.OnAutoMatchUpdated(autoMatchInfo);
                this.superThis.GSLive.RealTime.OnAutoMatchUpdated(autoMatchInfo);
                this.isInAutoMatchQueue = true;
                break
            case Actions.Command.LeftWaitingQ:
                this.superThis.GSLive.TurnBased.OnAutoMatchCanceled(packet.GetMsg() || "")
                this.superThis.GSLive.RealTime.OnAutoMatchCanceled(packet.GetMsg() || "")
                this.isInAutoMatchQueue = false;
                break
            case Actions.Command.ActionGetRooms:

                break
            case Actions.Command.ActionJoinRoom:
                let joinInfo = JSON.parse(packet.GetData()!)
                // connect to relay
                let start = new StartGame();
                start.parse(packet.GetData()!)
                if (start.Room!["syncMode"] == 1)
                    await this.superThis.GSLive.TurnbasedController.Initilize(start.Room!["_id"], start.Area!.Endpoint, start.Area!.Port)
                else
                    await this.superThis.GSLive.RealTimeController.Initilize(start.Room!["_id"], start.Area?.Hash!, start.Area!.Endpoint, start.Area!.Port)
                this.isInAutoMatchQueue = false;
                break
            // case Actions.Command.ActionKickUser:

            //     break

            case Actions.Error:
                console.error(`[Error][Msg: ${packet.GetMsg()}]`)
                break
        }
    }

    private onDisconnect = (event: WebSocket.CloseEvent) => {
        if (event.wasClean) {
            Log("[Command]", `[close] Connection closed cleanly, code = ${event.code} reason = ${event.reason}`);
        } else {
            Log("[Command]", '[close] Connection died');
        }
        this.commandToken = "";
    }
}