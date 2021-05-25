import { Actions, } from '../../../../Utils/Consts';
import { GameService } from '../../../index';
import { Data, JoinPayload } from './models';
import { AuthPayload, BufferToString, Packet } from './models';
import WebSocket from 'ws';
import { Log } from '../../../../Utils/Logger';
import { GProtocolSendType, MessageType } from '../../RealTime/models';

export class RealTime {
    constructor(public superThis: GameService) { }

    realtimeToken: bigint = BigInt(0);
    RoomID: string = "";
    ConnectHash: string = "";
    static Connection: WebSocket | undefined = undefined

    public Initilize(RoomID: string, ConnectHash: string, Endpoint: string, Port: number) {
        Log("[RealTime]", `[Connecting] [${RoomID}] [ws://${Endpoint}:${Port}]`);

        this.RoomID = RoomID;
        this.ConnectHash = ConnectHash;

        RealTime.Connection = new WebSocket(`ws://${Endpoint}:${Port}`);
        RealTime.Connection.binaryType = "arraybuffer"
        RealTime.Connection!.onopen = this.OnConnect
        RealTime.Connection!.onmessage = this.OnReceive;
        RealTime.Connection!.onclose = this.onDisconnect;
        RealTime.Connection!.onerror = function (error) {
            throw error;
        };
    }
    protected OnConnect = (e: WebSocket.OpenEvent) => {
        Log("[RealTime]", "[onConnect]")
        // Send Auth pkt
        let payload = new AuthPayload();
        payload.RoomID = this.RoomID;
        payload.Token = this.superThis.Authentication.gameToken;
        payload.Hash = this.ConnectHash;

        let pkt = new Packet();
        pkt.Action = Actions.RealTime.ActionAuth;
        pkt.Payload = payload.ToBuffer()
        pkt.Send();
    }

    protected OnReceive = (event: WebSocket.MessageEvent) => {
        let packet = new Packet()
        packet.Deserialize(Buffer.from(event.data.toString(), "base64"));

        switch (packet.Action) {
            case Actions.RealTime.ActionAuth:
                this.realtimeToken = packet.Token!
                break
            // case Actions.RealTime.ActionData:

            //     break
            case Actions.RealTime.ActionPublicMessage:
                let msg = new Data();
                msg.Deserialize(packet.Payload!)
                this.superThis.GSLive.RealTime.NewMessageReceived({
                    MessageInfo: {
                        MessageType: MessageType[packet.Action],
                        SendType: GProtocolSendType[packet.Type],
                        ClientReceiveTime: packet.ClientSendTime,
                    },
                    Message: msg.Export(),
                })
                break
            case Actions.RealTime.ActionPrivateMessage:
                let msgPrv = new Data();
                msgPrv.Deserialize(packet.Payload!)
                this.superThis.GSLive.RealTime.NewMessageReceived({
                    MessageInfo: {
                        MessageType: MessageType[packet.Action],
                        SendType: GProtocolSendType[packet.Type],
                        ClientReceiveTime: packet.ClientSendTime,
                    },
                    Message: msgPrv.Export(),
                })
                break
            case Actions.RealTime.ActionJoin:
                let payload = new JoinPayload()
                payload.Parse(JSON.parse(BufferToString(packet.Payload!)))
                this.superThis.GSLive.RealTime.OnJoinedRoom(payload.Export())
                break
            case Actions.RealTime.ActionMembersDetail:
                let members = JSON.parse(BufferToString(packet.Payload!));
                this.superThis.GSLive.RealTime.RoomMembersDetailReceived(members)
                break
            case Actions.RealTime.ActionLeave:
                let member = JSON.parse(BufferToString(packet.Payload!));
                this.superThis.GSLive.RealTime.LeftRoom(member)
                if (member!.user!.isMe)
                    RealTime.Connection?.close()
                break
            // case Actions.RealTime.ActionDestroy:

            //     break
            // case Actions.RealTime.ActionStatus:

            //     break
            // case Actions.RealTime.ActionMirror:
            //     // Do Nothing
            //     break
            // case Actions.RealTime.ActionEventMessage:

            //     break
            // case Actions.RealTime.ActionGetRoomSnapshot:
            //     console.log("ActionGetRoomSnapshot", BufferToString(packet.Payload!))
            //     break
            // case Actions.RealTime.ActionObserver:

            //     break
            case Actions.RealTime.ActionRoomInfo:
                let roomInfo = JSON.parse(BufferToString(packet.Payload!));
                this.superThis.GSLive.RealTime.CurrentRoomInfoReceived(roomInfo)
                break
            case Actions.Error:
                console.error(`[Error] [Msg: ${packet.Payload?.toString()}]`)
                break

            default:
                Log("[RealTime]", `[OnReceive]: ${packet.ToString()}`);
        }
    }
    private onDisconnect = (event: WebSocket.CloseEvent) => {
        if (event.wasClean) {
            Log("[RealTime]", `[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
        } else {
            // e.g. server process killed or network down event.code is usually 1006 in this case
            Log("[RealTime]", '[close] Connection died');
        }
        this.realtimeToken = BigInt(0);
        this.ConnectHash = "";
    }
}