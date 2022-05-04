export interface IRoleState {
    recordList: IRoleRecordList[]
    count: number
}
export interface IRoleRecordList {
    id: number
    roleName: string
    roleLabel: string
    createTime: string
    isDisable: number
    resourceIdList: number[]
    menuIdList: number[]
}

//菜单
export interface IRoleMenuState {
    data: IRoleMenuChild[]
}
export interface IRoleMenuChild {
    id: number
    label: string
    children: any[]
}

//资源
export interface IRoleResourceState {
    data: IRoleResourceChild[]
}
export interface IRoleResourceChild {
    id: number
    label: string
    children?: IRoleResourceChild[]
}

//查询参数
export interface IQueryRoleListParams {
    currentSize?: number
    currentPage?: number
    keywords?: string
}
//新增参数
export interface IAddRoleParams {
    roleName: string
    roleLabel: string
    resourceIdList?: any
    menuIdList: number[]
}

//修改菜单/资源参数
export interface IUpdateRoleParams {
    id: number
    roleName: string
    roleLabel: string
    createTime: string
    isDisable: number
    resourceIdList?: any
    menuIdList?: number[]
}
