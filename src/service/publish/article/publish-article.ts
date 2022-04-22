import { IArticleForm } from '@/views/main/main-content/article/publish/editor/publish-form/types'
import kxRequest from '@/service'
import { ICommonState } from '@/store/types'

enum PublishArticleAPI {
    Issue = '/admin/articles',
    Draft = '/admin/articles',
}

export function issueArticle(payload: IArticleForm) {
    return kxRequest.post<ICommonState<any>>({
        url: PublishArticleAPI.Issue,
        data: payload,
        headers: { 'Content-Type': 'application/json' },
    })
}

export function saveDraft(payload: IArticleForm) {
    return kxRequest.post<ICommonState<any>>({
        url: PublishArticleAPI.Issue,
        data: payload,
    })
}
