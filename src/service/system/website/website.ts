import kxRequest from '@/service'
import { ICommonState } from '@/store/types'
import { IWebsiteConfig } from '@/store/system'

enum WebsiteAPI {
    config = 'admin/website/config',
}

//获取信息
export function asyncGetWebsiteConfig() {
    return kxRequest.get<ICommonState<IWebsiteConfig>>({
        url: WebsiteAPI.config,
    })
}
//获取信息
export function asyncUpdateWebsiteConfig(payload: IWebsiteConfig) {
    return kxRequest.put<ICommonState<any>>({
        url: WebsiteAPI.config,
        data: payload,
        headers: { 'Content-Type': 'application/json' },
    })
}
