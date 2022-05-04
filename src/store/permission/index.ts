import { menuModule } from './menus/menus'
import { apiModule } from '@/store/permission/api/apis'
import { IUpdateApiParams, IQueryApiParams, IAddApiParams } from './api/types'
import { roleModule } from './role/role'
import { roleMenuModule } from './role/role-menu'
import { roleResourceModule } from './role/role-resource'
import {
    IQueryRoleListParams,
    IAddRoleParams,
    IUpdateRoleParams,
    IRoleMenuChild,
    IRoleMenuState,
    IRoleResourceChild,
    IRoleResourceState,
} from './role/types'

//api参数
export { IUpdateApiParams, IQueryApiParams, IAddApiParams }
//role参数
export { IQueryRoleListParams, IAddRoleParams, IUpdateRoleParams }
export { IRoleMenuChild, IRoleMenuState, IRoleResourceChild, IRoleResourceState }

//模块
export { menuModule, apiModule, roleModule, roleMenuModule, roleResourceModule }
