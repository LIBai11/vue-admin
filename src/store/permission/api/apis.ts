import { Module } from 'vuex'
import { IRootState } from '@/store/types'
import { IApiSate, IApiList, IUpdateApiParams, IAddApiParams } from '@/store/permission/api/types'
import { kxNotification } from '@/base-ui'
import { asyncDeleteApi, asyncGetApiList, asyncUpdateApi } from '@/service/permission'
import { asyncAddApi } from '@/service/permission/api/apis'

export const apiModule: Module<IApiSate, IRootState> = {
    namespaced: true,
    state: () => {
        return {
            data: [],
        }
    },
    mutations: {
        changeData(state, resource: IApiList[]) {
            state.data = resource
        },
    },
    getters: {},
    actions: {
        //获取接口列表
        async getApiList({ commit }, payload: any) {
            const data = await asyncGetApiList(payload)
            if (data.code === 20000) {
                commit('changeData', data.data)
                kxNotification.success('接口获取成功')
            } else {
                kxNotification.error(data.message)
            }
        },
        //修改接口
        async updateApi({ commit }, payload: IUpdateApiParams) {
            const data = await asyncUpdateApi(payload)
            if (data.code === 20000) {
                kxNotification.success('接口修改成功')
            } else {
                kxNotification.error(data.message)
            }
        },
        //删除接口
        async deleteApi({ commit }, payload: number) {
            const data = await asyncDeleteApi(payload)
            if (data.code === 20000) {
                kxNotification.success('接口修改成功')
            } else {
                kxNotification.error(data.message)
            }
        },
        //新增接口
        async addApi({ commit }, payload: IAddApiParams) {
            const data = await asyncAddApi(payload)
            if (data.code === 20000) {
                kxNotification.success('添加成功')
            } else {
                kxNotification.error(data.message)
            }
        },
    },
}
