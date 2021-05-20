import { AssetInfoData } from './models';
import { Url } from '../../Utils/Consts';
import { Log } from '../../Utils/Logger';
import axios from 'axios';
import { GameService } from '../index';

export class Assets {
    constructor(public superThis: GameService) { }
    
    async GetAssetInfo(tag: string): Promise<AssetInfoData> {
        try {
            let { data } = await axios.get(`${Url.Api.Endpoint}${Url.Api.DownloadAssets}/${this.superThis.ClientID}/datapack/?tag=${tag}`, {
                headers: {
                    "x-access-token": this.superThis.Authentication.gameToken
                }
            })

            Log("GetAssetInfo", data);

            return data.data;
        } catch (e) {
            if (e.response) {
                throw e.response.data.msg
            } else
                throw e
        }
    }
}