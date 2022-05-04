import { Module } from 'vuex'
import { IRootState } from '@/store/types'
import {
    IAddRoleParams,
    IQueryRoleListParams,
    IRoleRecordList,
    IRoleState,
    IUpdateRoleParams,
} from '@/store/permission/role/types'
import {
    asyncAddRole,
    asyncDeleteRole,
    asyncGetRoleList,
    asyncUpdateResourceRole,
} from '@/service/permission'
import { kxNotification } from '@/base-ui'

export const roleModule: Module<IRoleState, IRootState> = {
    namespaced: true,
    state: () => {
        return {
            recordList: [],
            count: 0,
        }
    },
    mutations: {
        changeRecordList(state, recordList: IRoleRecordList[]) {
            state.recordList = recordList
        },
        changeCount(state, count: number) {
            state.count = count
        },
    },
    getters: {},
    actions: {
        //获取角色列表
        async getRoleList({ commit }, payload: IQueryRoleListParams) {
            const data = await asyncGetRoleList(payload)
            if (data.code === 20000) {
                commit('changeRecordList', data.data.recordList)
                commit('changeCount', data.data.count)
                kxNotification.success('获取角色成功')
            } else {
                kxNotification.error(data.message)
            }
        },
        //新增角色
        async addRole({ state }, payload: IAddRoleParams) {
            const data = await asyncAddRole(payload)
            if (data.code === 20000) {
                kxNotification.success('添加成功')
            } else {
                kxNotification.error(data.message)
            }
        },
        //修改菜单权限
        async updateMenuRole({ state }, payload: IUpdateRoleParams) {
            const data = await asyncUpdateResourceRole(payload)
            if (data.code === 20000) {
                kxNotification.success('修改成功')
            } else {
                kxNotification.error(data.message)
            }
        },
        //修改资源权限
        async updateResourceRole({ state }, payload: IUpdateRoleParams) {
            const data = await asyncUpdateResourceRole(payload)
            if (data.code === 20000) {
                kxNotification.success('修改成功')
            } else {
                kxNotification.error(data.message)
            }
        },
        //删除角色
        async deleteRole({ state }, payload: number[]) {
            const data = await asyncDeleteRole(payload)
            if (data.code === 20000) {
                kxNotification.success('删除成功')
            } else {
                kxNotification.error(data.message)
            }
        },
    },
}
