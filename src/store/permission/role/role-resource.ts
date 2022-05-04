import { Module } from 'vuex'
import { IRootState } from '@/store/types'
import { IRoleResourceState, IRoleResourceChild } from '@/store/permission/role/types'

import { ElMessage } from 'element-plus'
import { asyncGetRoleResourceList } from '@/service/permission'

export const roleResourceModule: Module<IRoleResourceState, IRootState> = {
    namespaced: true,
    state: () => {
        return {
            data: [],
        }
    },
    mutations: {
        changeRoleResource(state, recordList: IRoleResourceChild[]) {
            state.data = recordList
        },
    },
    getters: {},
    actions: {
        //获取角色列表
        async getRoleResourceList({ commit }) {
            const data = await asyncGetRoleResourceList()
            if (data.code === 20000) {
                commit('changeRoleResource', data.data)
            } else {
                ElMessage.error(data.message)
            }
        },
    },
}
