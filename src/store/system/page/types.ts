export interface IPageState {
    data: IPageData[]
}
export interface IPageData {
    pageCover: string
    id: number
    pageName: string
    pageLabel: string
}
export interface IUpdatePageParams {
    id?: any
    pageName: string
    pageLabel: string
    pageCover: string
}
