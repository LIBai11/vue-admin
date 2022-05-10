import { Module } from 'vuex'
import { IRootState } from '@/store/types'
import { kxNotification } from '@/base-ui'
import { asyncGetMineIntro, asyncUpdateMine } from '@/service/system'

export const aboutModule: Module<any, IRootState> = {
    namespaced: true,
    state: () => {
        return {
            data: '',
        }
    },
    mutations: {
        changeMineIntro(state, mineData: string) {
            state.data = mineData
        },
    },
    getters: {},
    actions: {
        //查询友链
        async getMineIntro({ commit }) {
            const data = await asyncGetMineIntro()
            if (data.code === 20000) {
                kxNotification.success('获取数据成功')
                commit('changeMineIntro', data.data)
            } else {
                kxNotification.error(data.message)
            }
        },
        //更新
        async updateMine({ state }, payload: string) {
            const data = await asyncUpdateMine(payload)
            if (data.code === 20000) {
                kxNotification.success('修改成功')
            } else {
                kxNotification.error(data.message)
            }
        },
    },
}
