import kxRequest from '@/service'
import { ICommonState } from '@/store/types'
import { IPubState } from '@/store/article/publish/search/types'

enum PublishSearchAPI {
    Tag = 'admin/tags/search',
    Category = 'admin/categories/search',
}

//tag获取请求
export function getTags() {
    return kxRequest.get<ICommonState<IPubState>>({
        url: PublishSearchAPI.Tag,
    })
}

//category获取请求
export function getCategories() {
    return kxRequest.get<ICommonState<IPubState>>({
        url: PublishSearchAPI.Category,
    })
}
