import { Module } from 'vuex'
import { IRootState } from '@/store/types'
import { kxNotification } from '@/base-ui'
import { ILinkRecordList, ILinkState, IQueryLinkParams, IUpdateLinkParams } from './types'
import { asyncDeleteLink, asyncGetLinkData, asyncUpdateLink } from '@/service/system'

export const linkModule: Module<ILinkState, IRootState> = {
    namespaced: true,
    state: () => {
        return {
            recordList: [],
            count: 0,
        }
    },
    mutations: {
        changeLinkRecordList(state, recordList: ILinkRecordList[]) {
            state.recordList = recordList
        },
        changeCount(state, count: number) {
            state.count = count
        },
    },
    getters: {},
    actions: {
        //查询友链
        async getLinkData({ commit }, payload: IQueryLinkParams) {
            const data = await asyncGetLinkData(payload)
            if (data.code === 20000) {
                kxNotification.success('获取友链数据成功')
                commit('changeLinkRecordList', data.data.recordList)
                commit('changeCount', data.data.count)
            } else {
                kxNotification.error(data.message)
            }
        },
        //更新
        async updateLink({ state }, payload: IUpdateLinkParams) {
            const data = await asyncUpdateLink(payload)
            if (data.code === 20000) {
                kxNotification.success('修改成功')
            } else {
                kxNotification.error(data.message)
            }
        },
        //删除
        async deleteLink({ state }, payload: number[]) {
            const data = await asyncDeleteLink(payload)
            if (data.code === 20000) {
                kxNotification.success('删除成功')
            } else {
                kxNotification.error(data.message)
            }
        },
    },
}
