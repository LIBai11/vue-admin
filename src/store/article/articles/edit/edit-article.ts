import { ICommonState, IRootState } from '@/store/types'
import { Module } from 'vuex'
import { asyncGetArticleDetails } from '@/service/article/articles/article-edit/article-edit'
import { ElNotification } from 'element-plus'
import { IArticleForm } from '@/views/main/main-content/article/change/editor/publish-form/types'

export const editArticleModule: Module<IArticleForm, IRootState> = {
    namespaced: true,
    state: () => {
        return {
            id: 0,
            articleCover: '',
            articleTitle: '',
            articleContent: '',
            categoryName: '',
            tagNameList: [],
            type: 0,
            originalUrl: '',
            isTop: 0,
            status: 0,
        }
    },
    mutations: {
        changeId(state, id) {
            state.id = id
        },
        changeArticleCover(state, articleCover) {
            state.articleCover = articleCover
        },
        changeArticleTitle(state, articleTitle) {
            state.articleTitle = articleTitle
        },
        changeArticleContent(state, articleContent) {
            state.articleContent = articleContent
        },

        changeCategoryName(state, categoryName) {
            state.categoryName = categoryName
        },
        changeTagNameList(state, tagNameList) {
            state.tagNameList = tagNameList
        },
        changeType(state, type) {
            state.type = type
        },
        changeIsTop(state, isTop) {
            state.isTop = isTop
        },
        changeStatus(state, status) {
            state.status = status
        },
        changeOriginalUrl(state, originalUrl) {
            state.originalUrl = originalUrl
        },
    },
    getters: {},
    actions: {
        async getArticleDetails({ commit }, articleId: number) {
            const data: ICommonState<IArticleForm> = await asyncGetArticleDetails(articleId)
            if (data.code === 20000) {
                const articleDetails = data.data
                commit('changeId', articleDetails.id)
                commit('changeArticleCover', articleDetails.articleCover)
                commit('changeArticleTitle', articleDetails.articleTitle)
                commit('changeCategoryName', articleDetails.categoryName)
                commit('changeTagNameList', articleDetails.tagNameList)
                commit('changeType', articleDetails.type)
                commit('changeIsTop', articleDetails.isTop)
                commit('changeStatus', articleDetails.status)
                commit('changeOriginalUrl', articleDetails.originalUrl)
                commit('changeArticleContent', articleDetails.articleContent)
                ElNotification({
                    message: '获取文章内容成功!',
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
