import { Module } from 'vuex'
import { IRootState } from '@/store/types'
import { ICommentRecordList, ICommentState } from '@/store/message/comment/types'
import {
    asyncDeleteComments,
    asyncGetComments,
    asyncPassComments,
} from '@/service/message/comment/comment'
import { IMessageParams } from '@/views/main/main-content/message/comment/page-comment'
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
        async getComments({ state, commit }, payload: IMessageParams) {
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
        //删除评论
        async deleteComments({ commit }, payload: any) {
            const data = await asyncDeleteComments(payload)
            if (data) {
                kxNotification.success('删除评论成功')
            } else {
                kxNotification.error('删除失败')
            }
        },
        //通过审核
        async passComments({ commit }, payload: any) {
            const params = {
                idList: payload,
                isReview: 1,
            }
            const data = await asyncPassComments(params)
            if (data) {
                kxNotification.success('修改成功')
            } else {
                kxNotification.error('修改失败')
            }
        },
    },
}
