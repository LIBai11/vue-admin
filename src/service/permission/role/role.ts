import qs from 'qs'
import kxRequest from '@/service'
import { ICommonState } from '@/store/types'
import {
    IAddRoleParams,
    IQueryRoleListParams,
    IRoleMenuState,
    IRoleResourceState,
    IRoleState,
    IUpdateRoleParams,
} from '@/store/permission/role/types'

enum RoleAPI {
    roleList = 'admin/roles',
    role = 'admin/role',
    roleResource = 'admin/role/resources',
    roleMenu = 'admin/role/menus',
}

//获取角色列表
export function asyncGetRoleList(payload: IQueryRoleListParams) {
    const params = {
        current: payload.currentPage || 1,
        size: payload.currentSize || 10,
        keywords: payload.keywords,
    }
    const strParams = qs.stringify(params)
    return kxRequest.get<ICommonState<IRoleState>>({
        url: `${RoleAPI.roleList}?${strParams}`,
    })
}
//获取菜单列表
export function asyncGetRoleMenuList() {
    return kxRequest.get<ICommonState<IRoleMenuState>>({
        url: RoleAPI.roleMenu,
    })
}
//获取资源列表
export function asyncGetRoleResourceList() {
    return kxRequest.get<ICommonState<IRoleResourceState>>({
        url: RoleAPI.roleResource,
    })
}
//新增角色
export function asyncAddRole(payload: IAddRoleParams) {
    return kxRequest.post<ICommonState<IRoleState>>({
        url: RoleAPI.role,
        data: payload,
        headers: { 'Content-Type': 'application/json' },
    })
}
//修改菜单/资源权限
export function asyncUpdateResourceRole(payload: IUpdateRoleParams) {
    return kxRequest.post<ICommonState<IRoleState>>({
        url: RoleAPI.role,
        data: payload,
        headers: { 'Content-Type': 'application/json' },
    })
}
//删除
export function asyncDeleteRole(payload: number[]) {
    return kxRequest.delete<ICommonState<IRoleState>>({
        url: RoleAPI.roleList,
        data: payload,
        headers: { 'Content-Type': 'application/json' },
    })
}
