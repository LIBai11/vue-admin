import kxRequest from '@/service'
import { IQueryArticlesParams, ISearchArticlesState } from '@/store/article/articles/search/types'
import { ICommonState } from '@/store/types'
import qs from 'qs'

enum QueryArticles {
    QueryArticlesAPI = 'admin/articles',
}

export function asyncArticleByCondition(payload: IQueryArticlesParams) {
    const params = {
        current: payload.current || 0,
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
