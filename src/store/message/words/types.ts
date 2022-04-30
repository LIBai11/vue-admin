export interface IWordsState {
    recordList: IWordsRecordList[]
    count: number
}
export interface IWordsRecordList {
    id: number
    ipAddress: string
    ipSource: string
    nickname: string
    avatar: string
    messageContent: string
    isReview: number
    createTime: string
}
