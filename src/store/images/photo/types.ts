export interface IPhotoState {
    recordList: IPhotoRecordList[]
    count: number
}
export interface IPhotoRecordList {
    id: number
    photoName: string
    photoDesc?: any
    photoSrc: string
}

//新增照片参数
export interface IAddPhotoParams {
    albumId: string
    photoUrlList?: any[]
}

//编辑照片参数
export interface IEditPhotoParams {
    id: number
    photoName: string
    photoDesc: string
    photoSrc: string
}

//删除照片
export interface IDeletePhotoParams {
    idList: number[]
    isDelete: number
}
//移动照片
export interface IRemovePhotoParams {
    albumId: number
    photoIdList: any[]
    photoUrlList: any[]
}

//查询照片
export interface IQueryPhotoParams {
    currentPage: number
    currentSize: number
    isDelete: number
    albumId: number
}
//查询相册信息
export interface IImagesInfoState {
    id: number
    albumName: string
    albumDesc: string
    albumCover: string
    photoCount: number
    status: number
}
