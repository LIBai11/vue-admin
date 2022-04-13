export interface ILoginState {
    articleLikeSet: any[]
    avatar: string
    commentLikeSet: any[]
    email: string
    id: number
    intro: string
    ipAddress: string
    ipSource: string
    lastLoginTime: string
    loginType: number
    nickname: string
    talkLikeSet: any[]
    userInfoId: number
    username: string
}

export type IMenuState = RootObjectChild[]

export interface RootObjectChild {
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

export interface IUserData {
    collapse: boolean
    avatar: string
    tabList: RootObjectTabList[]
    userId: number
    nickname: string
    userMenuList: RootObjectUserMenuList[]
}

interface RootObjectTabList {
    name: string
    path: string
}

interface RootObjectUserMenuList {
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
