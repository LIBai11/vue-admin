import kxRequest from '@/service'
import { ICommonState } from '@/store/types'
import { ILoginState, IUserMenusState } from '@/store/login/types'
import { ILoginData } from '@/views/login/types'
import qs from 'qs'

enum LoginAPI {
    AccountLogin = '/login',
    MenuList = '/admin/user/menus',
    Fresh = '/report',
}

export function accountLoginRequest(loginData: ILoginData) {
    return kxRequest.post<ICommonState<ILoginState>>({
        url: LoginAPI.AccountLogin,
        data: qs.stringify(loginData),
    })
}

export function menuListRequest() {
    return kxRequest.get<ICommonState<IUserMenusState>>({
        url: LoginAPI.MenuList,
    })
}

export function browserFresh() {
    return kxRequest.post<ICommonState<any>>({
        url: LoginAPI.Fresh,
    })
}
