export interface Party {

}

export interface PartyInfo {

}

export interface PartyData {
    Id: string
    Name: string
    Logo: string
    Description: string
    MemberCount: number
    MaxMember: number
    Variables: [string, string][]
    CreateTime: Date
}