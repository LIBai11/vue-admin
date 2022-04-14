import { IMenuState, IUserData } from '@/store/login/types'
import { useSessionCache } from '@/utils/use-storage'
import { getMenuList } from '@/utils/use-menus'
import { IMenuConfig } from '@/views/main/config/menu-config/type'

const userData: IUserData = useSessionCache.getCache('userData')
const menuListData: IMenuState = userData.userMenuList
const naiMenuList = getMenuList(menuListData)

export const menuConfig: IMenuConfig = {
    options: naiMenuList,
    width: '200',
    collapsedWidth: '70',
    collapsedIconSize: '22',
    showTrigger: true,
    bordered: true,
}
