import { Chats } from '../GSLive/Chats/index';
import { TurnBased } from '../GSLive/TurnBased/index';
import { RealTime } from '../GSLive/RealTime/index';
import { Events } from '../GSLive/Events/index';

import { Command } from './Controllers/Command';
import { TurnBased as TurnbasedController } from './Controllers/ُTurnBased';
import { RealTime as RealTimeController } from './Controllers/RealTime';

import nWebSocket from 'ws';

export class GSLive {
    constructor() {
        // controllers
        this.Command = new Command();
        this.TurnbasedController = new TurnbasedController();
        this.RealTimeController = new RealTimeController();

        // functions
        this.TurnBased = new TurnBased();
        this.RealTime = new RealTime();
        this.Chats = new Chats();
        this.Events = new Events();
    }

    static CommandConnection: WebSocket | nWebSocket | undefined = undefined
    Cipher: string = "";
    isEncriptionActive = false;

    IsCommandAvailable(): boolean {
        return true
    }
    IsTurnBasedAvailable(): boolean {
        return true
    }
    IsRealTimeAvailable(): boolean {
        return true
    }
    GetPing(): number {
        return 0
    }

    // Functions
    public Chats: Chats
    public Events: Events
    public TurnBased: TurnBased
    public RealTime: RealTime

    // Controllers
    public Command: Command
    public TurnbasedController: TurnbasedController
    public RealTimeController: RealTimeController
}