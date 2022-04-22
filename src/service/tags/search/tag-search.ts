import kxRequest from '@/service'
import { ICommonState, IRootState } from '@/store/types'
import { ITagState } from '@/store/publish/search/types'

enum TagsAPI {
    search = 'admin/tags/search',
}

export function searchTags(tagKeyWord: string) {
    return kxRequest.get<ICommonState<ITagState[]>>({
        url: `${TagsAPI.search}?keywords=${tagKeyWord}`,
    })
}
