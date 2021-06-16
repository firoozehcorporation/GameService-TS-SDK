import { Member } from '../../Player/models';
import { FriendData } from './models';
import { GameService } from '../..';
import { Url } from '../../../Utils/Consts';
import { Log } from '../../../Utils/Logger';
import axios from 'axios';

export class Friends {
    constructor() { }

    async FindMembers(query: string, skip: number = 0, limit: number = 25): Promise<[number, Member[]]> {
        try {
            let url = `${Url.Api.Endpoint}${Url.Api.Friends}?q=${query}&skip=${skip}&limit=${limit}`
            let { data } = await axios.get(url, {
                headers: {
                    "x-access-token": GameService.Authentication.gameToken
                }
            })

            Log("FindMembers", data);

            return [data.count, data.list];
        } catch (e) {
            if (e && e.response) {
                throw e.response.data.msg
            } else
                throw e
        }
    }
    async GetMyFriends(skip: number = 0, limit: number = 25): Promise<[number, Member[]]> {
        try {
            let url = `${Url.Api.Endpoint}${Url.Api.Friends}/me?skip=${skip}&limit=${limit}`
            let { data } = await axios.get(url, {
                headers: {
                    "x-access-token": GameService.Authentication.gameToken
                }
            })

            Log("GetMyFriends", data);

            return [data.count, data.list];
        } catch (e) {
            if (e && e.response) {
                throw e.response.data.msg
            } else
                throw e
        }
    }
    async GetFriendRequests(skip: number = 0, limit: number = 25): Promise<[number, FriendData[]]> {
        try {
            let url = `${Url.Api.Endpoint}${Url.Api.Friends}/me/pending?skip=${skip}&limit=${limit}`
            let { data } = await axios.get(url, {
                headers: {
                    "x-access-token": GameService.Authentication.gameToken
                }
            })

            Log("GetFriendRequests", data);

            return [data.count, data.list];
        } catch (e) {
            if (e && e.response) {
                throw e.response.data.msg
            } else
                throw e
        }
    }
    async SendFriendRequest(memberId: string): Promise<boolean> {
        try {
            let url = `${Url.Api.Endpoint}${Url.Api.Friends}/${memberId}`
            let { data } = await axios.post(url, undefined, {
                headers: {
                    "x-access-token": GameService.Authentication.gameToken
                }
            })

            Log("SendFriendRequest", data);

            return data.status;
        } catch (e) {
            if (e && e.response) {
                throw e.response.data.msg
            } else
                throw e
        }
    }
    async AcceptFriendRequest(memberId: string): Promise<boolean> {
        try {
            let url = `${Url.Api.Endpoint}${Url.Api.Friends}/${memberId}`
            let { data } = await axios.put(url, undefined, {
                headers: {
                    "x-access-token": GameService.Authentication.gameToken
                }
            })

            Log("AcceptFriendRequest", data);

            return data.status;
        } catch (e) {
            if (e && e.response) {
                throw e.response.data.msg
            } else
                throw e
        }
    }
    async DeleteFriend(memberId: string): Promise<boolean> {
        try {
            let url = `${Url.Api.Endpoint}${Url.Api.Friends}/${memberId}`
            let { data } = await axios.put(url, undefined, {
                headers: {
                    "x-access-token": GameService.Authentication.gameToken
                }
            })

            Log("AcceptFriendRequest", data);

            return data.status;
        } catch (e) {
            if (e && e.response) {
                throw e.response.data.msg
            } else
                throw e
        }
    }
}