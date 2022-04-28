export interface IArticleTagsState {
    recordList: ITagsRecordList[]
    count: number
}
export interface ITagsRecordList {
    id: number
    tagName: string
    articleCount: number
    createTime: string
}
