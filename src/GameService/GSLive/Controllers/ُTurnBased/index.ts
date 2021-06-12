import { Actions } from '../../../../Utils/Consts';
import { GameService } from '../../../index';
import { Payload } from '../Command/models';
import { GameResult, JoinDetail, Packet, PropertyChange, Room, VoteDetail } from './models';
import nWebSocket from 'ws';
import { Log } from '../../../../Utils/Logger';
import { JoinPayload } from '../RealTime/models';

export class TurnBased {
    constructor(public superThis: GameService) { }

    turnbasedToken: string = "";
    RoomID: string = "";
    static Connection: nWebSocket | WebSocket | undefined = undefined

    public Initilize(RoomID: string, Endpoint: string, Port: number) {
        this.RoomID = RoomID;
        if (Endpoint == undefined || Port == undefined)
            throw `No valid area returned from Command, ${RoomID}, ${Endpoint}, ${Port}`

        if (typeof window === 'undefined') {
            Log("[TurnBased]", `[Node] [Connecting] [ws://${Endpoint}:${Port}]`);
            TurnBased.Connection = new nWebSocket(`ws://${Endpoint}:${Port}`, { maxPayload: 1024 * 2 });
        } else {
            Log("[TurnBased]", `[Browser] [Connecting] [ws://${Endpoint}:${Port}]`);
            TurnBased.Connection = new WebSocket(`ws://${Endpoint}:${Port}`);
        }

        TurnBased.Connection!.onopen = this.OnConnect
        TurnBased.Connection!.onmessage = this.OnReceive;
        TurnBased.Connection!.onclose = this.onDisconnect;
        TurnBased.Connection!.onerror = (err: nWebSocket.ErrorEvent) => {
            throw err;
        };

    }
    protected OnConnect = (e: nWebSocket.OpenEvent) => {
        // Send Auth pkt
        let payload = new Payload(this.superThis);
        payload.SetGameID(this.RoomID);
        payload.SetToken(this.superThis.Authentication.gameToken);

        let pkt = new Packet(this.superThis);
        pkt.SetHead(Actions.TurnBased.ActionAuth);
        pkt.SetData(payload.ToString())
        pkt.Send(false);
    }

    protected OnReceive = (event: nWebSocket.MessageEvent) => {
        // Log("[TurnBased]", `[OnReceive]: ${event.data}`);

        let packet = new Packet(this.superThis)
        packet.Parse(event.data, this.superThis.GSLive.Cipher != "");

        switch (packet.GetHead()) {
            case Actions.TurnBased.ActionAuth:
                this.turnbasedToken = packet.GetToken()!;
                break
            case Actions.TurnBased.ActionJoin:
                let joinData = JSON.parse(packet.GetData()!);
                let joinDetail = new JoinDetail();
                joinDetail.Parse(joinData)
                this.superThis.GSLive.TurnBased.OnJoinedRoom(joinDetail.Export())
                break
            case Actions.TurnBased.ActionTakeTurn:
                let turnData = JSON.parse(packet.GetData()!);
                this.superThis.GSLive.TurnBased.OnTakeTurn(turnData["1"], turnData[0])
                break
            case Actions.TurnBased.ActionChooseNext:
                let nextData = JSON.parse(packet.GetData()!);
                this.superThis.GSLive.TurnBased.OnChoosedNext(nextData)
                break
            case Actions.TurnBased.ActionLeave:
                let member = JSON.parse(packet.GetData()!);
                this.superThis.GSLive.TurnBased.OnLeaveRoom(member)
                if (member!.user!.isMe) {
                    TurnBased.Connection?.close()
                    this.turnbasedToken = ""
                    this.RoomID = ""
                    TurnBased.Connection = undefined;
                }
                break
            case Actions.TurnBased.ActionVote:
                let voteDetail = JSON.parse(packet.GetData()!);
                let vote = new VoteDetail();
                vote.Parse(voteDetail);
                this.superThis.GSLive.TurnBased.OnVoteReceived(vote.Member!, vote.Outcome!)
                break
            case Actions.TurnBased.ActionAcceptVote:
                let resultdata = JSON.parse(packet.GetData()!);
                let result = new GameResult();
                result.Parse(resultdata)
                this.superThis.GSLive.TurnBased.OnComplete(result)
                break
            case Actions.TurnBased.ActionGetUsers:
                let members = JSON.parse(packet.GetData()!);
                this.superThis.GSLive.TurnBased.OnRoomMembersDetailReceived(members)
                break
            case Actions.TurnBased.ActionCurrentTurnDetail:
                let currentTurn = JSON.parse(packet.GetData()!);
                this.superThis.GSLive.TurnBased.OnCurrentTurnMember(currentTurn)
                break
            case Actions.TurnBased.ModifyValue:
                let value = JSON.parse(packet.GetData()!);
                let propertyChange = new PropertyChange();
                propertyChange.Parse(value)
                this.superThis.GSLive.TurnBased.OnPropertyUpdated(propertyChange)
                break
            case Actions.TurnBased.GetRoomInfo:
                let roomInfoS = JSON.parse(packet.GetData()!);
                let roomInfo = new Room();
                roomInfo.Parse(roomInfoS);
                this.superThis.GSLive.TurnBased.OnCurrentRoomInfoReceived(roomInfo.Export())
                break
            case Actions.Error:
                console.error(`[Error] [Msg: ${packet.GetMsg()}]`)
                break
        }
    }

    private onDisconnect = (event: nWebSocket.CloseEvent) => {
        if (event.wasClean) {
            Log("[TurnBased]", `[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
        } else {
            // e.g. server process killed or network down event.code is usually 1006 in this case
            Log("[TurnBased]", '[close] Connection died');
        }
        this.turnbasedToken = "";
    }
}