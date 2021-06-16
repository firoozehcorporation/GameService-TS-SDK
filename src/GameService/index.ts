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

    static ClientID: string = "";
    static ClientSecret: string = "";
    static Verbose: boolean = false;

    public static Initilize(clientId: string, clientSecret: string, Verbose: boolean = true) {
        if (typeof clientId !== 'string' || typeof clientSecret !== 'string')
            throw new Error(Errors.Internal.InvalidInput)

        GameService.ClientID = clientId;
        GameService.ClientSecret = clientSecret;
        GameService.Verbose = Verbose;

        GameService.Authentication = new Authentication()
        GameService.Assets = new Assets()
        GameService.Achievements = new Achievements()
        GameService.Leaderboards = new Leaderboards()
        GameService.Player = new Player()
        GameService.Save = new Save()
        GameService.Table = new Table()
        GameService.GSLive = new GSLive()
        GameService.Social = new Social()
    }

    IsAuthenticated(): boolean {
        return GameService.Authentication.gameToken != ""
    }


    IsCommandAvailabe(): boolean {
        return GSLive.CommandConnection?.readyState === WebSocket.OPEN && GameService.GSLive.Command.commandToken != ""
    }

    // Functions 
    static Authentication: Authentication
    static Assets: Assets
    static Achievements: Achievements
    static Leaderboards: Leaderboards
    static Player: Player
    static Save: Save
    static Table: Table
    static GSLive: GSLive
    static Social: Social

    // Events
    static onReady: Function = () => { }
}
