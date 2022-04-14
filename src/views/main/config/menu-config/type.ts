import { IMenuState } from '@/store/login/types'

export interface IMenuConfig {
    options: IMenuState
    width?: number
    collapsedWidth?: number
    collapsedIconSize?: number
    showTrigger?: boolean
    bordered?: boolean
}
