import { Module } from 'vuex'
import { IRootState } from '@/store/types'
import { kxNotification } from '@/base-ui'
import { asyncLogoffUsers, asyncQueryActiveUsers, IActiveUsersParams } from '@/service/users'
import { IActiveUserRecordList, IActiveUserState } from '@/store/users/active-users/types'

export const activeUsersModule: Module<IActiveUserState, IRootState> = {
    namespaced: true,
    state: () => {
        return {
            recordList: [],
            count: 0,
        }
    },
    mutations: {
        changeRecordList(state, recordList: IActiveUserRecordList[]) {
            state.recordList = recordList
        },
        changeCount(state, count: number) {
            state.count = count
        },
    },
    getters: {},
    actions: {
        async getActiveUsers({ state, commit }, payload: IActiveUsersParams) {
            const data = await asyncQueryActiveUsers(payload)
            if (data.code === 20000) {
                const activeUsers = data.data
                commit('changeRecordList', activeUsers.recordList)
                commit('changeCount', activeUsers.count)
                kxNotification.success('获取在线用户成功')
            } else {
                kxNotification.error(data.message)
            }
        },
        //下线用户
        async logoffUsers({ state, commit }, payload: number) {
            const data = await asyncLogoffUsers(payload)
            if (data.code === 20000) {
                kxNotification.success('下线成功')
            } else {
                kxNotification.error(data.message)
            }
        },
    },
}
