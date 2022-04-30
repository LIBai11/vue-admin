import { Module } from 'vuex'
import { IRootState } from '@/store/types'
import { IWordsRecordList, IWordsState } from '@/store/message/words/types'
import { IMessageParams } from '@/views/main/main-content/message/comment/page-comment'
import { kxNotification } from '@/base-ui'
import { asyncDeleteWords, asyncGetWords, asyncPassWords } from '@/service/message/words/words'

export const wordsModule: Module<IWordsState, IRootState> = {
    namespaced: true,
    state: () => {
        return {
            recordList: [],
            count: 0,
        }
    },
    mutations: {
        changeRecordList(state, recordList: IWordsRecordList[]) {
            state.recordList = recordList
        },
        changeCount(state, count: number) {
            state.count = count
        },
    },
    getters: {},
    actions: {
        async getWords({ state, commit }, payload: IMessageParams) {
            const data = await asyncGetWords(payload)
            if (data) {
                const words = data.data
                commit('changeRecordList', words.recordList)
                commit('changeCount', words.count)
                kxNotification.success('获取留言成功')
            } else {
                kxNotification.error('留言获取失败')
            }
        },
        //删除评论
        async deleteWords({ commit }, payload: any) {
            const data = await asyncDeleteWords(payload)
            if (data) {
                kxNotification.success('删除留言成功')
            } else {
                kxNotification.error('删除失败')
            }
        },
        //通过审核
        async passWords({ commit }, payload: any) {
            const params = {
                idList: payload,
                isReview: 1,
            }
            const data = await asyncPassWords(params)
            if (data) {
                kxNotification.success('修改成功')
            } else {
                kxNotification.error('修改失败')
            }
        },
    },
}
