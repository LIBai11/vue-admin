// export type IManageMenuState = IManageMenu[]
export interface IManageMenu {
    id: number
    name: string
    path: string
    component: string
    icon: string
    createTime: string
    orderNum: number
    isDisable?: any
    isHidden: number
    children: any[]
}
export interface IManageMenuState {
    data: IManageMenu[]
}
