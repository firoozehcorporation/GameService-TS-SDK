import { Authentication } from "./Authentication/index";
import Errors from '../Utils/Errors';
import { Assets } from "./Assets/index";
import { Leaderboards } from "./Leaderboards/index";
import { Achievements } from "./Achievements/index";
import { Player } from "./Player/index";
import { Save } from "./Save/index";
import { Table } from "./Table/index";
import { GSLive } from "./GSLive/index";
import { Social } from "./Social/index";

export class GameService {

    ClientID: string = "";
    ClientSecret: string = "";
    Verbose: boolean = false;

    constructor(clientId: string, clientSecret: string, Verbose: boolean = true) {
        if (typeof clientId !== 'string' || typeof clientSecret !== 'string')
            throw new Error(Errors.Internal.InvalidInput)

        this.ClientID = clientId;
        this.ClientSecret = clientSecret;
        this.Verbose = Verbose;

        this.Authentication = new Authentication(this)
        this.Assets = new Assets(this)
        this.Achievements = new Achievements(this)
        this.Leaderboards = new Leaderboards(this)
        this.Player = new Player(this)
        this.Save = new Save(this)
        this.Table = new Table(this)
        this.GSLive = new GSLive(this)
        this.Social = new Social(this)
    }

    IsAuthenticated(): boolean {
        return this.Authentication.gameToken != ""
    }


    IsCommandAvailabe(): boolean {
        return GSLive.CommandConnection?.readyState === WebSocket.OPEN && this.GSLive.Command.commandToken != ""
    }

    // Functions 
    Authentication: Authentication
    Assets: Assets
    Achievements: Achievements
    Leaderboards: Leaderboards
    Player: Player
    Save: Save
    Table: Table
    GSLive: GSLive
    Social: Social

    // Events
    onReady: Function = () => { }
}
