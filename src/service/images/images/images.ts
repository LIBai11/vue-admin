import kxRequest from '@/service'
import { ICommonState } from '@/store/types'
import { IImagesState, IQueryImagesParams, IUpdateImagesParams } from '@/store/images'
import qs from 'qs'

enum ImagesAPI {
    images = 'admin/photos/albums',
}

//获取数据
export function asyncGetImagesList(payload: IQueryImagesParams) {
    const params = {
        current: payload.currentPage || 1,
        size: payload.currentSize || 10,
        keywords: payload.keywords || undefined,
    }
    const strParams = qs.stringify(params)
    return kxRequest.get<ICommonState<IImagesState>>({
        url: `${ImagesAPI.images}?${strParams}`,
    })
}
//更新
export function asyncUpdateImages(payload: IUpdateImagesParams) {
    return kxRequest.post<ICommonState<IImagesState>>({
        url: ImagesAPI.images,
        data: payload,
        headers: {
            'Content-Type': 'application/json',
        },
    })
}
//删除
export function asyncDeleteImages(payload: number) {
    return kxRequest.delete<ICommonState<IImagesState>>({
        url: `${ImagesAPI.images}/${payload}`,
    })
}
