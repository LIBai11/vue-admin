import { IQueryLinkParams, IUpdateLinkParams } from '@/store/system'
import kxRequest from '@/service'
import { ICommonState } from '@/store/types'
import { ILinkState } from '@/store/system/link/types'
import qs from 'qs'

enum LinkAPI {
    link = 'admin/links',
}

//获取数据
export function asyncGetLinkData(payload: IQueryLinkParams) {
    const params = {
        current: payload.currentPage || 1,
        size: payload.currentSize || 10,
        keywords: payload.keywords || undefined,
    }
    const strParams = qs.stringify(params)
    return kxRequest.get<ICommonState<ILinkState>>({
        url: `${LinkAPI.link}?${strParams}`,
    })
}
//更新
export function asyncUpdateLink(payload: IUpdateLinkParams) {
    return kxRequest.post<ICommonState<ILinkState>>({
        url: LinkAPI.link,
        data: payload,
        headers: {
            'Content-Type': 'application/json',
        },
    })
}
//删除
export function asyncDeleteLink(payload: number[]) {
    return kxRequest.delete<ICommonState<ILinkState>>({
        url: LinkAPI.link,
        data: payload,
        headers: { 'Content-Type': 'application/json' },
    })
}
