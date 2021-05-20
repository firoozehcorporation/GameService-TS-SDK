import { Member } from '../Player/models'

export enum LeaderboardOrderTypes {

}

export interface Leaderboard {
    key: string
    name: string
    from: number
    to: number
    image: string
    desc: string
    order: LeaderboardOrderTypes
    status: boolean
}

export interface SubmitScoreResponse {
    leaderboard_r: Leaderboard
    score: number
    tries: number
}

export interface LeaderBoardDetails {
    leaderboard: Leaderboard
    scores: Score[]
}

export interface Score {
    member: Member
    Rank: number
    value: number
    tries: number
}