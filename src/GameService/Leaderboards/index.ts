import { Leaderboard, SubmitScoreResponse, LeaderBoardDetails, Score } from './models';
import axios from 'axios';
import { GameService } from '..';
import { Url } from '../../Utils/Consts';
import { Log } from '../../Utils/Logger';

export class Leaderboards {
    constructor(public superThis: GameService) { }

    async GetLeaderBoards(): Promise<Leaderboard[]> {
        try {
            let { data } = await axios.get(`${Url.Api.Endpoint}${Url.Api.Leaderboard}`, {
                headers: {
                    "x-access-token": this.superThis.Authentication.gameToken
                }
            })

            Log("GetLeaderBoards", data);

            return data.leaderboard;
        } catch (e) {
            console.error(e)
            if (e.response) {
                throw e.response.data.msg
            } else
                throw e
        }
    }
    async SubmitScore(leaderboardId: string, score: number): Promise<SubmitScoreResponse> {
        try {
            let { data } = await axios.post(`${Url.Api.Endpoint}${Url.Api.LeaderboardV2}${leaderboardId}`, {
                "value": score,
            }, {
                headers: {
                    "x-access-token": this.superThis.Authentication.gameToken
                }
            })

            Log("SubmitScore", data);

            return data.leaderboard;
        } catch (e) {
            if (e.response) {
                throw e.response.data.msg
            } else
                throw e
        }
    }
    async GetLeaderBoardDetails(leaderboardId: string, skip: number = 0, limit: number = 25): Promise<LeaderBoardDetails> {
        try {
            let { data } = await axios.get(`${Url.Api.Endpoint}${Url.Api.LeaderboardV2}${leaderboardId}?skip=${skip}&limit=${limit}`, {
                headers: {
                    "x-access-token": this.superThis.Authentication.gameToken
                }
            })

            Log("GetLeaderBoardDetails", data);

            return { scores: data.scores, leaderboard: data.leaderboard };
        } catch (e) {
            if (e.response) {
                throw e.response.data.msg
            } else
                throw e
        }
    }
    async GetCurrentPlayerScore(leaderboardId: string): Promise<Score> {
        try {
            let { data } = await axios.get(`${Url.Api.Endpoint}${Url.Api.LeaderboardV2}${leaderboardId}/me`, {
                headers: {
                    "x-access-token": this.superThis.Authentication.gameToken
                }
            })

            Log("GetCurrentPlayerScore", data);

            return data;
        } catch (e) {
            if (e.response) {
                throw e.response.data.msg
            } else
                throw e
        }
    }

}