import { IUserMenusState } from '@/store/login/types'

export interface IMenuConfig {
    options: IUserMenusState
    width?: number
    collapsedWidth?: number
    collapsedIconSize?: number
    showTrigger?: boolean
    bordered?: boolean
    routeKeysMap?: any
}
