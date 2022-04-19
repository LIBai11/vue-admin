import kxRequest from '@/service'
import { ICommonState } from '@/store/types'
import { IHomeBseState } from '@/store/main/home/types'

enum HomeAPI {
    Admin = '/admin',
    Area = '/admin/users/area',
}

export function homeBaseData() {
    return kxRequest.get<ICommonState<IHomeBseState>>({
        url: HomeAPI.Admin,
    })
}
export function toUserAreaList(type: number) {
    return kxRequest.get<ICommonState<IHomeBseState>>({
        url: `${HomeAPI.Area}?type=${type}`,
    })
}
