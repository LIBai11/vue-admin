import kxRequest from '@/service'
import { ICommonState } from '@/store/types'
import { ICategoryState } from '@/store/publish/search/types'

enum CategoriesAPI {
    search = 'admin/categories/search',
}

export function searchCategories(tagKeyWord: string) {
    return kxRequest.get<ICommonState<ICategoryState[]>>({
        url: `${CategoriesAPI.search}?keywords=${tagKeyWord}`,
    })
}
