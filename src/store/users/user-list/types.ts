export interface IUserListState {
    recordList: IUserListRecordList[]
    count: number
}

export interface IUserListRecordListRoleList {
    id: number
    roleName: string
}

export interface IUserListRecordList {
    id: number
    userInfoId: number
    avatar: string
    nickname: string
    roleList: IUserListRecordListRoleList[]
    loginType: number
    ipAddress: string
    ipSource: string
    createTime: string
    lastLoginTime: string
    isDisable: number
    status?: any
}

export interface IUserRolesState {
    data: IUserRolesChildren
}

export interface IUserRolesChildren {
    id: number
    roleName: string
}
