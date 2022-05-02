import qs from 'qs'
import kxRequest from '@/service'
import { ICommonState } from '@/store/types'
import { IUserListState } from '@/store/users/user-list/types'

enum UserListAPI {
    list = 'admin/users',
    editRole = 'admin/users/role',
    changeDisable = 'admin/users/disable',
}

export interface IUserListParams {
    current?: number
    size?: number
    keywords?: number
    loginType?: number
}

//搜索用户
export function asyncQueryUserList(payload: IUserListParams) {
    const params = {
        current: payload.current || 1,
        size: payload.size || 10,
        keywords: payload.keywords,
        loginType: payload.loginType,
    }
    const strParams = qs.stringify(params)
    return kxRequest.get<ICommonState<IUserListState>>({
        url: `${UserListAPI.list}?${strParams}`,
    })
}

//编辑用户信息
export function asyncEditUser(payload: any) {
    return kxRequest.put<ICommonState<any>>({
        url: UserListAPI.editRole,
        data: payload,
        headers: { 'Content-Type': 'application/json' },
    })
}

//改变用户账号禁用或启用
export function asyncChangeUserDisable(payload: any) {
    return kxRequest.put<ICommonState<any>>({
        url: UserListAPI.changeDisable,
        data: payload,
        headers: { 'Content-Type': 'application/json' },
    })
}

//获取角色
export function asyncGetRoles() {
    return kxRequest.get<ICommonState<any>>({
        url: UserListAPI.editRole,
        headers: { 'Content-Type': 'application/json' },
    })
}
