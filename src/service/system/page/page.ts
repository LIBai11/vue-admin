import { IPageData, IUpdatePageParams } from '@/store/system'
import kxRequest from '@/service'
import { ICommonState } from '@/store/types'

enum PageAPI {
    page = 'admin/pages',
}

//获取数据
export function asyncGetPageList() {
    return kxRequest.get<ICommonState<IPageData>>({
        url: PageAPI.page,
    })
}
//更新
export function asyncUpdatePage(payload: IUpdatePageParams) {
    return kxRequest.post<ICommonState<IPageData>>({
        url: PageAPI.page,
        data: payload,
        headers: {
            'Content-Type': 'application/json',
        },
    })
}
//删除
export function asyncDeletePage(payload: number) {
    return kxRequest.delete<ICommonState<IPageData>>({
        url: `${PageAPI.page}/${payload}`,
    })
}
