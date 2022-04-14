import { IMenuState } from '@/store/login/types'

export interface IMenuConfig {
    options: IMenuState
    width?: string
    collapsedWidth?: string
    collapsedIconSize?: string
    showTrigger?: boolean
    bordered?: boolean
}
