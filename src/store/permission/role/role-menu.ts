import { Module } from 'vuex'
import { IRootState } from '@/store/types'
import { IRoleMenuChild, IRoleMenuState } from '@/store/permission/role/types'

import { ElMessage } from 'element-plus'
import { asyncGetRoleMenuList } from '@/service/permission'

export const roleMenuModule: Module<IRoleMenuState, IRootState> = {
    namespaced: true,
    state: () => {
        return {
            data: [],
        }
    },
    mutations: {
        changeRoleMenu(state, recordList: IRoleMenuChild[]) {
            state.data = recordList
        },
    },
    getters: {},
    actions: {
        //获取角色列表
        async getRoleMenuList({ commit }) {
            const data = await asyncGetRoleMenuList()
            if (data.code === 20000) {
                commit('changeRoleMenu', data.data)
            } else {
                ElMessage.error(data.message)
            }
        },
    },
}
