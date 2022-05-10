import { Module } from 'vuex'
import { IRootState } from '@/store/types'
import { IPageData, IPageState, IUpdatePageParams } from '@/store/system/page/types'
import { kxNotification } from '@/base-ui'
import { asyncDeletePage, asyncGetPageList, asyncUpdatePage } from '@/service/system'

export const pageModule: Module<IPageState, IRootState> = {
    namespaced: true,
    state: () => {
        return {
            data: [],
        }
    },
    mutations: {
        changePage(state, page: IPageData[]) {
            state.data = page
        },
    },
    getters: {},
    actions: {
        async getPageList({ commit }) {
            const data = await asyncGetPageList()
            if (data.code === 20000) {
                kxNotification.success('获取页面成功')
                commit('changePage', data.data)
            } else {
                kxNotification.error(data.message)
            }
        },
        //page更新
        async updatePage({ state }, payload: IUpdatePageParams) {
            const data = await asyncUpdatePage(payload)
            if (data.code === 20000) {
                kxNotification.success('修改成功')
            } else {
                kxNotification.error(data.message)
            }
        },
        //删除
        async deletePage({ state }, payload: number) {
            const data = await asyncDeletePage(payload)
            if (data.code === 20000) {
                kxNotification.success('删除成功')
            } else {
                kxNotification.error(data.message)
            }
        },
    },
}
