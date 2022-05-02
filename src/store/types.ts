import { ILoginState, IUserMenusState } from '@/store/login/types'
import { ICategoryState, ITagState } from '@/store/article/publish/search/types'

export type T = ILoginState | IUserMenusState | ICategoryState | ITagState | any

export interface ICommonState<T> {
    code: number
    data: T
    flag: boolean
    message: string
}

export type IRootState = any

interface IRootWidthModule {
    loginModule: ILoginState
    commonModule: ICommonState<T>
}

export type IStore = IRootState & IRootWidthModule
