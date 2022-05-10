import kxRequest from '@/service'
import { ICommonState } from '@/store/types'

enum AboutAPI {
    about = 'about',
    updateMineIntro = 'admin/about',
}

//获取数据
export function asyncGetMineIntro() {
    return kxRequest.get<ICommonState<any>>({
        url: AboutAPI.about,
    })
}
//更新
export function asyncUpdateMine(payload: any) {
    return kxRequest.put<ICommonState<any>>({
        url: AboutAPI.updateMineIntro,
        data: payload,
        headers: {
            'Content-Type': 'application/json',
        },
    })
}
