export interface IHomeBseState {
    viewsCount: number
    messageCount: number
    userCount: number
    articleCount: number
    categoryDTOList: ICategoryDTOList[]
    tagDTOList: ITagDTOList[]
    articleStatisticsList: IArticleStatisticsList[]
    uniqueViewDTOList: any[]
    articleRankDTOList?: any
}

export interface ICategoryDTOList {
    id: number
    categoryName: string
    articleCount: number
}

export interface ITagDTOList {
    id: number
    tagName: string
}

export interface IArticleStatisticsList {
    date: string
    count: number
}

//下面是用户地域
