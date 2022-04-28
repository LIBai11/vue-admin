import kxRequest from '@/service'
import { ICommonState } from '@/store/types'
import qs from 'qs'
import { IArticleTagsState } from '@/store/article/articles/tags/types'

enum ArticleTagsAPI {
    Tags = 'admin/tags',
}

//查询标签列表
export function asyncGetTags(payload: any) {
    const queryParams = {
        current: payload.currentPage || undefined,
        size: payload.currentSize || undefined,
        keywords: payload.keywords || undefined,
    }
    const strQueryParams = qs.stringify(queryParams)
    return kxRequest.get<ICommonState<IArticleTagsState>>({
        url: `${ArticleTagsAPI.Tags}?${strQueryParams}`,
    })
}

//修改标签名
export function asyncChangeTag(payload: any) {
    return kxRequest.post<ICommonState<IArticleTagsState>>({
        url: ArticleTagsAPI.Tags,
        data: payload,
        headers: { 'Content-Type': 'application/json' },
    })
}

//删除标签
export function asyncDeleteTags(payload: any) {
    return kxRequest.delete<ICommonState<IArticleTagsState>>({
        url: ArticleTagsAPI.Tags,
        data: payload,
        headers: { 'Content-Type': 'application/json' },
    })
}
