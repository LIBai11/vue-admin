export interface ICommentState {
    recordList: ICommentRecordList[]
    count: number
}

export interface ICommentRecordList {
    id: number
    avatar: string
    nickname: string
    replyNickname?: any
    articleTitle: string
    commentContent: string
    type: number
    isReview: number
    createTime: string
}
