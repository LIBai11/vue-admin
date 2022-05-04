// export type IManageMenuState = IManageMenu[]
export interface IManageMenu {
    id: number | null
    name: string
    path: string
    component: string
    icon: string
    createTime: string
    orderNum: number
    isDisable?: any
    isHidden: number
    children: any[]
    parentId?: number
}
export interface IManageMenuState {
    data: IManageMenu[]
}
