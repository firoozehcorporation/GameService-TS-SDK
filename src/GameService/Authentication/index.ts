import { Actions, Url } from '../../Utils/Consts';
import { Log } from '../../Utils/Logger';
import * as Statistics from '../../Utils/Statistics';
import { GameService } from '../index';
import { v4 } from 'uuid';
import axios from 'axios';

export class Authentication {
    userToken: string = "";
    gameToken: string = "";
    gameID: string = "";

    constructor(public superThis: GameService) { }

    async Login(Email: string, Password: string): Promise<string> {
        try {
            let { data } = await axios.post(`${Url.Api.Endpoint}${Url.Api.Login}`, {
                "email": Email,
                "password": Password,
                "device_id": v4(),
            })

            // Log("Login", data);

            this.userToken = data.token;

            await this.Start()

            return data.token;
        } catch (e) {
            if (e && e.response) {
                if (e.response.data)
                    throw e.response.data
                throw e.response
            } else
                throw e
        }
    }
    async LoginWithToken(Token: string) {
        this.userToken = Token;
        await this.Start()
    }
    async SignUp(NickName: string, Email: string, Password: string): Promise<string> {
        try {
            let { data } = await axios.post(`${Url.Api.Endpoint}${Url.Api.Login}`, {
                "mode": "register",
                "name": NickName,
                "client_id": this.superThis.ClientID,
                "email": Email,
                "password": Password,
                "device_id": v4(),
            })

            Log("SignUp", data);

            this.userToken = data.token;

            await this.Start()

            return data.token;
        } catch (e) {
            if (e && e.response) {
                throw e.response.data.msg
            } else
                throw e
        }
    }
    async CheckSmsStatus(): Promise<boolean> {
        return true
    }
    async SendLoginCodeSms(PhoneNumber: string): Promise<boolean> {
        try {
            let { data } = await axios.post(`${Url.Api.Endpoint}${Url.Api.SMSAuth}`, {
                "game": this.superThis.ClientID,
                "secret": this.superThis.ClientSecret,
                "phone_number": PhoneNumber,
            })

            Log("SendLoginCodeSms", data);

            return true;
        } catch (e) {
            if (e && e.response) {
                throw e.response.data.msg
            } else
                throw e
        }
    }
    async LoginOrSignUpWithSms(NickName: string, PhoneNumber: string, Code: string): Promise<string> {
        try {
            let { data } = await axios.post(`${Url.Api.Endpoint}${Url.Api.SMSAuthCallback}`, {
                "name": NickName,
                "code": Code,
                "phone_number": PhoneNumber,
                "device_id": v4(),
            })

            Log("SendLoginCodeSms", data);

            return data.token;
        } catch (e) {
            if (e && e.response) {
                throw e.response.data.msg
            } else
                throw e
        }
    }
    async LoginAsGuest(): Promise<string> {
        try {
            let { data } = await axios.post(`${Url.Api.Endpoint}${Url.Api.Login}`, {
                "device_id": v4(),
            })

            Log("LoginAsGuest", data);

            this.userToken = data.token;

            await this.Start()

            return data.token;
        } catch (e) {
            if (e && e.response) {
                throw e.response.data.msg
            } else
                throw e
        }
    }
    private async Start() {
        try {
            let { data } = await axios.post(`${Url.Api.Endpoint}${Url.Api.Start}`, {
                "game": this.superThis.ClientID,
                "system_info": Statistics.get(),
                "secret": this.superThis.ClientSecret,
                "token": this.userToken,
                "connectionType": "wss"
            })

            // Log("Start", data);

            this.gameToken = data.token;
            this.gameID = data.game._id;

            await this.superThis.GSLive.Command.Initilize(data.command);

            return data.token;
        } catch (e) {
            // if (this.superThis.Verbose) 
            if (e && e.response) {
                throw e.response.data.msg
            } else
                throw e
        }
    }
}