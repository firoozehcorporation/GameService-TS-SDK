import { Url } from '../../Utils/Consts';
import { Member, MemberInfo, Profile, ActiveDevice } from './models';
import { Log } from '../../Utils/Logger';
import axios from 'axios';
import { GameService } from '..';
import { v4 } from 'uuid';

export class Player {
    constructor() { }

    async GetCurrentPlayer(): Promise<Member> {
        try {
            let { data } = await axios.get(`${Url.Api.Endpoint}${Url.Api.GetCurrentPlayer}`, {
                headers: {
                    "x-access-token": GameService.Authentication.gameToken
                }
            })

            Log("GetCurrentPlayer", data);

            return data.data;
        } catch (e) {
            if (e && e.response) {
                throw e.response.data.msg
            } else
                throw e
        }
    }
    async GetMemberData(memberId: string): Promise<Member> {
        try {
            let { data } = await axios.get(`${Url.Api.Endpoint}${Url.Api.GetCurrentPlayer}/${memberId}`, {
                headers: {
                    "x-access-token": GameService.Authentication.gameToken
                }
            })

            Log("GetCurrentPlayer", data);

            return data;
        } catch (e) {
            if (e && e.response) {
                throw e.response.data.msg
            } else
                throw e
        }
    }
    async GetLastLoginMemberInfo(): Promise<MemberInfo> {
        try {
            let { data } = await axios.post(`${Url.Api.Endpoint}${Url.Api.LastLoginInfo}`, {
                "game": GameService.ClientID,
                "secret": GameService.ClientSecret,
                "device_id": v4()
            }, {
                headers: {
                    "x-access-token": GameService.Authentication.gameToken
                }
            })

            Log("GetLastLoginMemberInfo", data);
            let memInfo = new MemberInfo();
            memInfo.Parse(data)
            return memInfo;
        } catch (e) {
            if (e && e.response) {
                throw e.response.data.msg
            } else
                throw e
        }
    }
    async EditCurrentPlayerProfile(input: Profile): Promise<MemberInfo> {
        try {
            let { data } = await axios.put(`${Url.Api.Endpoint}${Url.Api.GetCurrentPlayer}`,
                input.Export(),
                {
                    headers: {
                        "x-access-token": GameService.Authentication.gameToken
                    }
                }
            )

            // Log("EditCurrentPlayerProfile", data);
            let memInfo = new MemberInfo();
            memInfo.Parse(data)
            return memInfo;
        } catch (e) {
            if (e && e.response) {
                throw e.response.data.msg
            } else
                throw e
        }

    }
    async ChangePassword(currentPassword: string, newPassword: string): Promise<boolean> {
        try {
            let { data } = await axios.post(`${Url.Api.Endpoint}${Url.Api.GetCurrentUser}/changepassword`, {
                "old_password": currentPassword,
                "new_password": newPassword
            }, {
                headers: {
                    "x-access-token": GameService.Authentication.gameToken
                }
            })

            Log("ChangePassword", data);

            return data.data;
        } catch (e) {
            if (e && e.response) {
                throw e.response.data.msg
            } else
                throw e
        }
    }
    async GetActiveDevices(): Promise<ActiveDevice[]> {
        try {
            let { data } = await axios.get(`${Url.Api.Endpoint}${Url.Api.Devices}`, {
                headers: {
                    "x-access-token": GameService.Authentication.gameToken
                }
            })

            Log("GetActiveDevices", data);

            return data;
        } catch (e) {
            console.error(e)
            if (e && e.response) {
                throw e.response.data.msg
            } else
                throw e
        }
    }
    async RevokeActiveDevice(deviceId: string): Promise<boolean> {
        try {
            let { data } = await axios.post(`${Url.Api.Endpoint}${Url.Api.Devices}/${deviceId}`, {
                headers: {
                    "x-access-token": GameService.Authentication.gameToken
                }
            })

            Log("RevokeActiveDevice", data);

            return true;
        } catch (e) {
            if (e && e.response) {
                throw e.response.data.msg
            } else
                throw e
        }
    }
}