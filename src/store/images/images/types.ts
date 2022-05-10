export interface IImagesState {
    recordList: IImagesRecordList[]
    count: number
}
export interface IImagesRecordList {
    id: number
    albumName: string
    albumDesc: string
    albumCover: string
    photoCount: number
    status: number
}

//查询参数
export interface IQueryImagesParams {
    currentPage?: number
    currentSize?: number
    keywords?: string | null
}

//更新参数
export interface IUpdateImagesParams {
    id: number
    albumName: string
    albumDesc: string
    albumCover: string
    photoCount: number
    status: number
}
