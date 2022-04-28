import kxRequest from '@/service'
import { ICommonState } from '@/store/types'
import qs from 'qs'
import { IArticleCategoriesState } from '@/store/article/articles/categories/types'

enum ArticleCategoriesAPI {
    Categories = 'admin/categories',
}

//查询标签列表
export function asyncGetCategories(payload: any) {
    const queryParams = {
        current: payload.currentPage || undefined,
        size: payload.currentSize || undefined,
        keywords: payload.keywords || undefined,
    }
    const strQueryParams = qs.stringify(queryParams)
    return kxRequest.get<ICommonState<IArticleCategoriesState>>({
        url: `${ArticleCategoriesAPI.Categories}?${strQueryParams}`,
    })
}

//修改标签名
export function asyncChangeCategory(payload: any) {
    return kxRequest.post<ICommonState<IArticleCategoriesState>>({
        url: ArticleCategoriesAPI.Categories,
        data: payload,
        headers: { 'Content-Type': 'application/json' },
    })
}

//删除标签
export function asyncDeleteCategory(payload: any) {
    return kxRequest.delete<ICommonState<IArticleCategoriesState>>({
        url: ArticleCategoriesAPI.Categories,
        data: payload,
        headers: { 'Content-Type': 'application/json' },
    })
}
