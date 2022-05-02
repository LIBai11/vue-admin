import { Module } from 'vuex'
import { IRootState } from '@/store/types'
import { asyncGetRoles } from '@/service/users'
import { kxNotification } from '@/base-ui'
import { IUserRolesChildren } from '@/store/users/user-list/types'

export const userRolesModule: Module<any, IRootState> = {
    namespaced: true,
    state: () => {
        return {
            data: [],
        }
    },
    mutations: {
        changeRoleData(state, roleName: IUserRolesChildren[]) {
            state.data = roleName
        },
    },
    actions: {
        async gerRoles({ commit }) {
            const data = await asyncGetRoles()
            if (data.code === 20000) {
                commit('changeRoleData', data.data)
                kxNotification.success('获取成功')
            }
        },
    },
}
