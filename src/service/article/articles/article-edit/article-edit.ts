import kxRequest from '@/service'
import { ICommonState } from '@/store/types'

enum ArticleEdit {
    querySingleArticle = 'admin/articles/',
}
export function asyncGetArticleDetails(articleId: number) {
    return kxRequest.get<ICommonState<any>>({
        url: ArticleEdit.querySingleArticle + articleId,
    })
}
