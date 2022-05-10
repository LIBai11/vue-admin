import kxRequest from '@/service'
import { ICommonState } from '@/store/types'
import {
    IAddPhotoParams,
    IDeletePhotoParams,
    IEditPhotoParams,
    IImagesInfoState,
    IQueryPhotoParams,
    IRemovePhotoParams,
} from '@/store/images'
import qs from 'qs'
import { IPhotoState } from '@/store/images/photo/types'

enum PhotoAPI {
    photo = 'admin/photos',
    ImagesInfo = 'admin/photos/albums',
    deletePhoto = 'admin/photos/delete',
    removePhoto = 'admin/photos/album',
}

//获取相册信息
export function asyncGetImagesInfo(payload: number) {
    return kxRequest.get<ICommonState<IImagesInfoState>>({
        url: `${PhotoAPI.ImagesInfo}/${payload}/info`,
    })
}
//获取照片数据
export function asyncGetImagesPhoto(payload: IQueryPhotoParams) {
    const params = {
        current: payload.currentPage || 1,
        size: payload.currentSize || 10,
        albumId: payload.albumId,
        isDelete: payload.isDelete,
    }
    const strParams = qs.stringify(params)
    return kxRequest.get<ICommonState<IPhotoState>>({
        url: `${PhotoAPI.photo}?${strParams}`,
    })
}
//新增
export function asyncAddPhoto(payload: IAddPhotoParams) {
    return kxRequest.post<ICommonState<IPhotoState>>({
        url: PhotoAPI.photo,
        data: payload,
        headers: {
            'Content-Type': 'application/json',
        },
    })
}
//编辑
export function asyncEditPhoto(payload: IEditPhotoParams) {
    return kxRequest.put<ICommonState<IPhotoState>>({
        url: PhotoAPI.photo,
        data: payload,
        headers: {
            'Content-Type': 'application/json',
        },
    })
}
//删除/恢复
export function asyncDeletePhoto(payload: IDeletePhotoParams) {
    return kxRequest.put<ICommonState<IPhotoState>>({
        url: PhotoAPI.deletePhoto,
        data: payload,
        headers: {
            'Content-Type': 'application/json',
        },
    })
}

//移动
export function asyncRemovePhoto(payload: IRemovePhotoParams) {
    return kxRequest.put<ICommonState<IPhotoState>>({
        url: PhotoAPI.removePhoto,
        data: payload,
        headers: {
            'Content-Type': 'application/json',
        },
    })
}
//彻底删除照片
export function asyncDeleteDraftPhoto(payload: number[]) {
    return kxRequest.delete<ICommonState<any>>({
        url: PhotoAPI.photo,
        data: payload,
        headers: {
            'Content-Type': 'application/json',
        },
    })
}
