import { IUserData, IUserMenusState } from '@/store/login/types'
import { useSessionCache } from '@/utils/use-storage'
import { getMenuList } from '@/utils/use-menus'
import { IMenuConfig } from '@/views/main/config/menu-config/type'

let naiMenuList = []
const userData: IUserData = useSessionCache.getCache('userData')
const menuListData: IUserMenusState = userData.userMenuList
naiMenuList = getMenuList(menuListData)
//key和路由的绑定
const routeKeysMap = new Map()
naiMenuList.forEach((routeKey: any) => {
    routeKeysMap.set(routeKey.href, routeKey.key)
    if (routeKey.children) {
        routeKey.children.forEach((routeKeyC: any) => {
            routeKeysMap.set(routeKeyC.href, routeKeyC.key)
        })
    }
})

export const menuConfig: IMenuConfig = {
    options: naiMenuList,
    width: 200,
    collapsedWidth: 64,
    collapsedIconSize: 22,
    showTrigger: true,
    bordered: true,
    routeKeysMap: routeKeysMap,
}
