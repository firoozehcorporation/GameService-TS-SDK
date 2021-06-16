import { Achievement } from './models';
import { Url } from '../../Utils/Consts';
import { Log } from '../../Utils/Logger';
import axios from 'axios';
import { GameService } from '..';


export class Achievements {
    constructor() { }

    async GetAchievements(): Promise<Achievement[]> {
        try {
            let { data } = await axios.get(`${Url.Api.Endpoint}${Url.Api.GetAchievements}`, {
                headers: {
                    "x-access-token": GameService.Authentication.gameToken
                }
            })

            Log("GetAchievements", data);

            return data.achievement;
        } catch (e) {
            if (e.response) {
                throw e.response.data.msg
            } else
                throw e
        }
    }
    async Unlock(achievementid: string): Promise<Achievement> {
        try {
            let { data } = await axios.post(`${Url.Api.Endpoint}${Url.Api.GetAchievementsv2}/${achievementid}`, null, {
                headers: {
                    "x-access-token": GameService.Authentication.gameToken
                }
            })

            Log("Unlock", data);

            return data.new;
        } catch (e) {
            if (e.response) {
                throw e.response.data.msg
            } else
                throw e
        }
    }
}