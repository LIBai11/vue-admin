import kxRequest from '@/service'
import { ICommonState } from '@/store/types'
import { IManageMenu } from '@/store/permission/menus/type'
import qs from 'qs'

enum MenusAPI {
    manageMenus = 'admin/menus',
}

export interface IQueryManageMenusParams {
    keywords?: string
}

export function asyncGetMenuList(payload: IQueryManageMenusParams) {
    const params = {
        keywords: payload.keywords,
    }
    const strParams = qs.stringify(params)
    return kxRequest.get<ICommonState<IManageMenu[]>>({
        url: `${MenusAPI.manageMenus}?${strParams}`,
    })
}
//删除菜单
export function asyncDeleteMenu(payload: number) {
    return kxRequest.delete<ICommonState<IManageMenu[]>>({
        url: `${MenusAPI.manageMenus}/${payload}`,
    })
}

//编辑菜单
