import kxRequest from '@/service'
import { ICommonState } from '@/store/types'
import { IHomeBseState } from '@/store/main/home/types'

enum HomeAPI {
    Admin = '/admin',
}

export function homeBaseData() {
    return kxRequest.get<ICommonState<IHomeBseState>>({
        url: HomeAPI.Admin,
    })
}
