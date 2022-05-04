import kxRequest from '@/service'
import { ICommonState } from '@/store/types'
import {
    IAddApiParams,
    IApiSate,
    IQueryApiParams,
    IUpdateApiParams,
} from '@/store/permission/api/types'
import qs from 'qs'

enum ResourceAPI {
    resource = 'admin/resources',
}

export function asyncGetApiList(payload: IQueryApiParams) {
    const params = {
        keywords: payload.keywords,
    }
    const strParams = qs.stringify(params)
    return kxRequest.get<ICommonState<IApiSate>>({
        url: `${ResourceAPI.resource}?${strParams}`,
    })
}
//更新api
export function asyncUpdateApi(payload: IUpdateApiParams) {
    return kxRequest.post<ICommonState<IApiSate>>({
        url: ResourceAPI.resource,
        data: payload,
        headers: { 'Content-Type': 'application/json' },
    })
}

//删除api
export function asyncDeleteApi(payload: number) {
    return kxRequest.delete<ICommonState<IApiSate>>({
        url: `${ResourceAPI.resource}/${payload}`,
        headers: { 'Content-Type': 'application/json' },
    })
}
//新增模块
export function asyncAddApi(payload: IAddApiParams) {
    return kxRequest.post<ICommonState<IApiSate>>({
        url: ResourceAPI.resource,
        data: payload,
        headers: { 'Content-Type': 'application/json' },
    })
}

//修改访问状态
export function asyncUpdateApiStatus(payload: IUpdateApiParams) {
    return kxRequest.post<ICommonState<IApiSate>>({
        url: ResourceAPI.resource,
        data: payload,
        headers: { 'Content-Type': 'application/json' },
    })
}
