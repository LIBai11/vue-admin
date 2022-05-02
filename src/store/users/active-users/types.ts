export interface IActiveUserState {
    recordList: IActiveUserRecordList[]
    count: number
}

export interface IActiveUserRecordList {
    userInfoId: number
    nickname: string
    avatar: string
    ipAddress: string
    ipSource: string
    browser: string
    os: string
    lastLoginTime: string
}
