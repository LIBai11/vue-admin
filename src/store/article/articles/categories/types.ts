export interface IArticleCategoriesState {
    recordList: IRecordList[]
    count: number
}
export interface IRecordList {
    id: number
    categoryName: string
    articleCount: number
    createTime: string
}
