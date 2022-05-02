import qs from 'qs'
import kxRequest from '@/service'
import { ICommonState } from '@/store/types'

enum ActiveUserAPI {
    activeUser = 'admin/users/online',
    logoff = 'admin/users',
}

export interface IActiveUsersParams {
    current?: number
    size?: number
    keywords?: number
}

//搜索用户
export function asyncQueryActiveUsers(payload: IActiveUsersParams) {
    const params = {
        current: payload.current || 1,
        size: payload.size || 10,
        keywords: payload.keywords,
    }
    const strParams = qs.stringify(params)
    return kxRequest.get<ICommonState<any>>({
        url: `${ActiveUserAPI.activeUser}?${strParams}`,
    })
}

//下线用户
export function asyncLogoffUsers(payload: number) {
    return kxRequest.delete<ICommonState<any>>({
        url: `${ActiveUserAPI.logoff}/${payload}/online`,
    })
}
