import { Module } from 'vuex'
import { IRootState } from '@/store/types'
import { IUserListRecordList, IUserListState } from './types'
import { kxNotification } from '@/base-ui'
import {
    asyncChangeUserDisable,
    asyncEditUser,
    asyncQueryUserList,
    IUserListParams,
} from '@/service/users'

export const userListModule: Module<IUserListState, IRootState> = {
    namespaced: true,
    state: () => {
        return {
            recordList: [],
            count: 0,
        }
    },
    mutations: {
        changeRecordList(state, recordList: IUserListRecordList[]) {
            state.recordList = recordList
        },
        changeCount(state, count: number) {
            state.count = count
        },
    },
    getters: {},
    actions: {
        async getUserList({ state, commit }, payload: IUserListParams) {
            const data = await asyncQueryUserList(payload)
            if (data.code === 20000) {
                const userList = data.data
                commit('changeRecordList', userList.recordList)
                commit('changeCount', userList.count)
                kxNotification.success('获取用户列表成功')
            } else {
                kxNotification.error('用户列表获取失败')
            }
        },
        async editUser({ state, commit }, payload: IUserListRecordList) {
            const data = await asyncEditUser(payload)
            if (data.code === 20000) {
                kxNotification.success('用户信息修改成功')
            } else {
                kxNotification.error('修改失败')
            }
        },
        //是否禁用账户
        async changeUserDisable({ state, commit }, payload: any) {
            const data = await asyncChangeUserDisable(payload)
            if (data.code === 20000) {
                kxNotification.success('修改成功')
            } else {
                kxNotification.error('修改失败')
            }
        },
    },
}
