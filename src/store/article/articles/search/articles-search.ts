import { Module } from 'vuex'
import { IRootState } from '@/store/types'
import { IQueryArticlesParams, IRecordList, ISearchArticlesState } from './types'
import { asyncArticleByCondition } from '@/service/article'
import {
    asyncChangeArticleTopById,
    asyncDeleteArticleById,
} from '@/service/article/articles/articles-search/articles-search'
import { ElNotification } from 'element-plus'

export const searchArticlesModule: Module<ISearchArticlesState, IRootState> = {
    namespaced: true,
    state: () => {
        return {
            recordList: [
                {
                    id: 0,
                    articleCover: '',
                    articleTitle: '',
                    createTime: '1970-01-01T00:00:00',
                    likeCount: 0,
                    viewsCount: 0,
                    categoryName: '',
                    tagDTOList: [
                        {
                            id: 0,
                            tagName: '',
                        },
                    ],
                    type: 0,
                    isTop: 0,
                    isDelete: 0,
                    status: 0,
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
    getters: {},
    actions: {
        async queryArticles({ commit }, payload: IQueryArticlesParams) {
            //条件查询文章
            const data = await asyncArticleByCondition(payload)
            if (data) {
                if (data.code === 20000) {
                    ElNotification({
                        message: '查询文章成功!',
                        type: 'success',
                    })
                    const articlesData = data.data
                    commit('changeRecordList', articlesData.recordList)
                    commit('changeCount', articlesData.count)
                } else {
                    ElNotification({
                        title: 'Error!',
                        message: data.message,
                        type: 'error',
                    })
                }
            }
        },

        // 通过id删除文章
        async deleteArticleById({ rootState }, articleId?: number[]) {
            const payload: number[] = articleId ? [articleId] : rootState.noAsyncModule.deleteIdArr

            if (payload) {
                const data = await asyncDeleteArticleById(payload)
                if (data.code === 20000) {
                    ElNotification({
                        message: '删除文章成功!',
                        type: 'success',
                    })
                } else {
                    ElNotification({
                        title: 'Error!',
                        message: data.message,
                        type: 'error',
                    })
                }
            }
        },
        async changeArticleTop({ state, rootState }, isTopData: any) {
            const data = await asyncChangeArticleTopById(isTopData)
            if (data.code === 20000) {
                ElNotification({
                    message: '修改置顶成功!',
                    type: 'success',
                })
            } else {
                ElNotification({
                    title: 'Error!',
                    message: data.message,
                    type: 'error',
                })
            }
        },
    },
}
