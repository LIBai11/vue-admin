// 菜单
import {
    asyncGetMenuList,
    asyncDeleteMenu,
    asyncUpdateMenu,
    IQueryManageMenusParams,
} from './menus/menus'
export { asyncGetMenuList, asyncDeleteMenu, asyncUpdateMenu, IQueryManageMenusParams }

//接口
import { asyncGetApiList, asyncUpdateApi, asyncDeleteApi } from './api/apis'
export { asyncGetApiList, asyncUpdateApi, asyncDeleteApi }

//角色
import {
    asyncGetRoleList,
    asyncAddRole,
    asyncUpdateResourceRole,
    asyncDeleteRole,
    asyncGetRoleMenuList,
    asyncGetRoleResourceList,
} from './role/role'
export {
    asyncGetRoleList,
    asyncAddRole,
    asyncUpdateResourceRole,
    asyncDeleteRole,
    asyncGetRoleMenuList,
    asyncGetRoleResourceList,
}
