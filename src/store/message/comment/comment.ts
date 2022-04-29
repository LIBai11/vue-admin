import { Module } from 'vuex'
import { IRootState } from '@/store/types'
import { ICommentRecordList, ICommentState } from '@/store/message/comment/types'
import { asyncGetComments } from '@/service/message/comment/comment'
import { ICommentParams } from '@/views/main/main-content/message/comment/page-comment'
import { kxNotification } from '@/base-ui'

export const commentModule: Module<ICommentState, IRootState> = {
    namespaced: true,
    state: () => {
        return {
            recordList: [],
            count: 0,
        }
    },
    mutations: {
        changeRecordList(state, recordList: ICommentRecordList[]) {
            state.recordList = recordList
        },
        changeCount(state, count: number) {
            state.count = count
        },
    },
    getters: {},
    actions: {
        async getComments({ state, commit }, payload: ICommentParams) {
            const data = await asyncGetComments(payload)
            if (data) {
                const comments = data.data
                commit('changeRecordList', comments.recordList)
                commit('changeCount', comments.count)
                kxNotification.success('获取评论成功')
            } else {
                kxNotification.error('评论获取失败')
            }
        },
    },
}
