import { GameService } from '..';
import { Chats } from '../GSLive/Chats/index';
import { TurnBased } from '../GSLive/TurnBased/index';
import { RealTime } from '../GSLive/RealTime/index';

import { Command } from './Controllers/Command';
import { TurnBased as TurnbasedController } from './Controllers/ُTurnBased';
import { RealTime as RealTimeController } from './Controllers/RealTime';

import WebSocket from 'ws';

export class GSLive {
    constructor(public superThis: GameService) {
        // controllers
        this.Command = new Command(superThis);
        this.TurnbasedController = new TurnbasedController(superThis);
        this.RealTimeController = new RealTimeController(superThis);

        // functions
        this.TurnBased = new TurnBased(superThis);
        this.RealTime = new RealTime(superThis);
        this.Chats = new Chats(superThis);
    }

    static CommandConnection: WebSocket | undefined = undefined

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
    public TurnBased: TurnBased
    public RealTime: RealTime

    // Controllers
    public Command: Command
    public TurnbasedController: TurnbasedController
    public RealTimeController: RealTimeController
}