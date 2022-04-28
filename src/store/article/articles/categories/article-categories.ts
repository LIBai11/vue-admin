import { Module } from 'vuex'
import { IRootState } from '@/store/types'
import { IArticleCategoriesState, IRecordList } from './types'
import { asyncGetCategories, asyncChangeCategory, asyncDeleteCategory } from '@/service/article'
import { ElNotification } from 'element-plus'

export const articleCategoriesModule: Module<IArticleCategoriesState, IRootState> = {
    namespaced: true,
    state: () => {
        return {
            recordList: [
                {
                    id: 0,
                    categoryName: '',
                    articleCount: 0,
                    createTime: '',
                },
            ],
            count: 0,
        }
    },
    mutations: {
        changeRecordList(state, recordList: IRecordList[]) {
            state.recordList = recordList
        },
        changeCount(state, count: number) {
            state.count = count
        },
    },
    actions: {
        async getCategories({ commit }, payload) {
            const data = await asyncGetCategories(payload)
            if (data.code === 20000) {
                const categories: IArticleCategoriesState = data.data
                commit('changeRecordList', categories.recordList)
                commit('changeCount', categories.count)
                ElNotification({
                    message: '获取全部分类成功!',
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
        async changeCategory({ commit }, payload) {
            const data = await asyncChangeCategory(payload)
            if (data.code === 20000) {
                ElNotification({
                    message: '修改分类成功!',
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
        async deleteCategory({ commit }, payload) {
            const data = await asyncDeleteCategory(payload)
            if (data.code === 20000) {
                ElNotification({
                    message: '删除分类成功!',
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
