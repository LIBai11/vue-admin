import { Module } from 'vuex'
import { IRootState } from '@/store/types'
import { IArticleTagsState, ITagsRecordList } from './types'
import { asyncChangeTag, asyncDeleteTags, asyncGetTags } from '@/service/article'
import { ElNotification } from 'element-plus'

export const articleTagsModule: Module<IArticleTagsState, IRootState> = {
    namespaced: true,
    state: () => {
        return {
            recordList: [
                {
                    id: 0,
                    tagName: '',
                    articleCount: 0,
                    createTime: '',
                },
            ],
            count: 0,
        }
    },
    mutations: {
        changeRecordList(state, recordList: ITagsRecordList[]) {
            state.recordList = recordList
        },
        changeCount(state, count: number) {
            state.count = count
        },
    },
    actions: {
        async getTags({ commit }, payload) {
            const data = await asyncGetTags(payload)
            if (data.code === 20000) {
                const tags: IArticleTagsState = data.data
                commit('changeRecordList', tags.recordList)
                commit('changeCount', tags.count)
                ElNotification({
                    message: '获取全部标签成功!',
                    type: 'success',
                })
            } else {
                ElNotification({
                    message: data.message,
                    type: 'error',
                })
            }
        },
        //编辑请求
        async changeTag({ commit }, payload) {
            const data = await asyncChangeTag(payload)
            if (data.code === 20000) {
                ElNotification({
                    message: '修改标签成功!',
                    duration: 2000,
                    type: 'success',
                })
            } else {
                ElNotification({
                    message: data.message,
                    type: 'error',
                    duration: 2000,
                })
            }
        },
        //删除请求
        async deleteTags({ commit }, payload) {
            const data = await asyncDeleteTags(payload)
            if (data.code === 20000) {
                ElNotification({
                    message: '删除标签成功!',
                    duration: 2000,
                    type: 'success',
                })
            } else {
                ElNotification({
                    message: data.message,
                    type: 'error',
                    duration: 2000,
                })
            }
        },
    },
}
