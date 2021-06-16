import { SaveDetails } from './models';
import axios from 'axios';
import { GameService } from '..';
import { Url } from '../../Utils/Consts';
import { Log } from '../../Utils/Logger';

export class Save {
    constructor() { }

    async Set(saveName: string, saveData: string | object): Promise<SaveDetails> {
        try {
            if (typeof saveData === "object")
                saveData = JSON.stringify(saveData);
            let { data } = await axios.post(`${Url.Api.Endpoint}${Url.Api.SaveGame}`, {
                "data": saveData,
                "name": saveName
            }, {
                headers: {
                    "x-access-token": GameService.Authentication.gameToken
                }
            })

            Log("SetSave", data);

            return data.new;
        } catch (e) {
            if (e.response) {
                throw e.response.data.msg
            } else
                throw e
        }
    }
    async Get(saveName: string = ""): Promise<object | string> {
        try {
            let { data } = await axios.get(`${Url.Api.Endpoint}${Url.Api.SaveGame}${saveName}`, {
                headers: {
                    "x-access-token": GameService.Authentication.gameToken
                }
            })

            Log("GetSave", data);

            return data;
        } catch (e) {
            if (e.response) {
                throw e.response.data.msg
            } else
                throw e
        }
    }
    async Remove(saveName: string): Promise<boolean> {
        try {
            let { data } = await axios.delete(`${Url.Api.Endpoint}${Url.Api.SaveGame}${saveName}`, {
                headers: {
                    "x-access-token": GameService.Authentication.gameToken
                }
            })

            Log("RemoveSave", data);

            return true;
        } catch (e) {
            if (e.response) {
                throw e.response.data.msg
            } else
                throw e
        }
    }
}