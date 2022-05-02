import qs from 'qs'
import kxRequest from '@/service'
import { ICommonState } from '@/store/types'
import { IMessageParams } from '@/views/main/main-content/message/comment/page-comment'
import { IWordsState } from '@/store/message/words/types'

enum WordsAPI {
    words = '/admin/messages',
    isReview = 'admin/messages/review',
}

export function asyncGetWords(payload: IMessageParams) {
    const params = {
        current: payload.currentPage || 1,
        size: payload.currentSize || 10,
        type: payload.type || undefined,
        keywords: payload.keywords || undefined,
        isReview: payload.isReview,
    }

    const strParams = qs.stringify(params)
    return kxRequest.get<ICommonState<IWordsState>>({
        url: `${WordsAPI.words}?${strParams}`,
        headers: {
            'Content-Type': 'application/json',
        },
    })
}

export function asyncDeleteWords(payload: IMessageParams) {
    return kxRequest.delete<ICommonState<IWordsState>>({
        url: WordsAPI.words,
        data: payload,
        headers: {
            'Content-Type': 'application/json',
        },
    })
}

export function asyncPassWords(payload: IMessageParams) {
    return kxRequest.put<ICommonState<IWordsState>>({
        url: WordsAPI.isReview,
        data: payload,
        headers: {
            'Content-Type': 'application/json',
        },
    })
}
