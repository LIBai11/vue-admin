export interface ILinkState {
    recordList: ILinkRecordList[]
    count: number
}
export interface ILinkRecordList {
    id: number
    linkName: string
    linkAvatar: string
    linkAddress: string
    linkIntro: string
    createTime: string
}
//查询参数
export interface IQueryLinkParams {
    keywords?: string
    currentSize?: number
    currentPage?: number
}
//更新参数
export interface IUpdateLinkParams {
    id?: number
    linkName: string
    linkAvatar: string
    linkAddress: string
    linkIntro: string
    createTime?: string
}
