import kxRequest from '@/service'
import { IQueryArticlesParams, ISearchArticlesState } from '@/store/article/articles/search/types'
import { ICommonState } from '@/store/types'
import qs from 'qs'

enum QueryArticles {
    QueryArticlesAPI = 'admin/articles',
    ToppingArticleAPI = 'admin/articles/top',
}

export function asyncArticleByCondition(payload: IQueryArticlesParams) {
    const params = {
        current: payload.current || 1,
        size: payload.size || 10,
        keywords: payload.articleTitle,
        categoryId: payload.categoryId,
        status: payload.status,
        tagId: payload.tagId,
        type: payload.typeId,
        isDelete: payload.isDelete || 0,
    }
    const queryArticlesParams = qs.stringify(params)
    return kxRequest.get<ICommonState<ISearchArticlesState>>({
        url: `${QueryArticles.QueryArticlesAPI}?${queryArticlesParams}`,
    })
}

//删除文章
export function asyncDeleteArticleById(payload: number[]) {
    const deleteData = {
        idList: payload,
        isDelete: 1,
    }
    return kxRequest.put<ICommonState<ISearchArticlesState>>({
        url: QueryArticles.QueryArticlesAPI,
        data: deleteData,
        headers: { 'Content-Type': 'application/json' },
    })
}

//修改置顶
export function asyncChangeArticleTopById(isTopData: any) {
    return kxRequest.put<ICommonState<ISearchArticlesState>>({
        url: QueryArticles.ToppingArticleAPI,
        data: isTopData,
        headers: { 'Content-Type': 'application/json' },
    })
}
//销毁文章
export function asyncDestroyArticleById(payload: number[]) {
    return kxRequest.delete<ICommonState<ISearchArticlesState>>({
        url: QueryArticles.QueryArticlesAPI,
        data: payload,
        headers: { 'Content-Type': 'application/json' },
    })
}

//删除文章
export function asyncRecoverArticleById(payload: number[]) {
    const deleteData = {
        idList: payload,
        isDelete: 0,
    }
    return kxRequest.put<ICommonState<ISearchArticlesState>>({
        url: QueryArticles.QueryArticlesAPI,
        data: deleteData,
        headers: { 'Content-Type': 'application/json' },
    })
}
