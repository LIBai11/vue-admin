export interface ISearchArticlesState {
    recordList: IRecordList[]
    count: number
}

export interface IRecordList {
    id: number
    articleCover: string
    articleTitle: string
    createTime: string
    likeCount?: any
    viewsCount?: any
    categoryName: string
    tagDTOList: IRecordListTagDTOList[]
    type: number
    isTop: number
    isDelete: number
    status: number
}

export interface IRecordListTagDTOList {
    id: number
    tagName: string
}

//定义传入异步查询的payload的类型
export interface IQueryArticlesParams {
    current?: number
    size?: number
    articleTitle?: string
    typeId?: number
    tagId?: number
    categoryId?: number
    isDelete?: number
    status?: number
}
