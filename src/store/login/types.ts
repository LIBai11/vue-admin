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

export type IUserMenusState = IUserChild[]

export interface IChildChildren {
    name: string
    path: string
    component: string
    icon: string
    hidden?: any
    children?: any
}

export interface IUserChild {
    name?: any
    path: string
    component: string
    icon?: any
    hidden: boolean
    children: IChildChildren[]
}

export interface IUserData {
    collapse: boolean
    avatar: string
    tabList: RootObjectTabList[]
    userId: number
    nickname: string
    userMenuList: IUserMenusState
}

interface RootObjectTabList {
    name: string
    path: string
}
