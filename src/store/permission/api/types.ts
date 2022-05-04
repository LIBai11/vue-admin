export interface IApiChildren {
    id: number
    resourceName: string
    url: string
    requestMethod: string
    isDisable?: any
    isAnonymous?: number
    createTime?: string
    children?: any
    parentId?: number
}
export interface IApiList {
    id: number
    resourceName: string
    url?: any
    requestMethod?: any
    isDisable?: any
    isAnonymous: number
    createTime: string
    children: IApiChildren[]
}

export interface IApiSate {
    data: IApiList[]
}
export interface IUpdateApiParams {
    id: number
    resourceName: string
    url: string
    requestMethod: string
    isDisable?: any
    isAnonymous: number
    createTime: string
    children?: any
}

export interface IQueryApiParams {
    keywords?: string
}
export interface IAddApiParams {
    resourceName?: string
}
