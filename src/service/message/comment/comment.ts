import qs from 'qs'
import kxRequest from '@/service'
import { ICommonState } from '@/store/types'
import { ICommentState } from '@/store/message/comment/types'
import { ICommentParams } from '@/views/main/main-content/message/comment/page-comment'

enum CommentAPI {
    comments = '/admin/comments',
}

export function asyncGetComments(payload: ICommentParams) {
    const params = {
        current: payload.currentPage || 1,
        size: payload.currentSize || 10,
        type: payload.type || undefined,
        keywords: payload.keywords || undefined,
        isReview: payload.isReview,
    }

    const strParams = qs.stringify(params)
    return kxRequest.get<ICommonState<ICommentState>>({
        url: `${CommentAPI.comments}?${strParams}`,
        headers: {
            'Content-Type': 'application/json',
        },
    })
}
