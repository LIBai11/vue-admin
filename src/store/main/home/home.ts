import { IRootState } from '@/store/types'
import {
    IArticleStatisticsList,
    ICategoryDTOList,
    IHomeBseState,
    ITagDTOList,
} from '@/store/main/home/types'
import { Module } from 'vuex'
import { homeBaseData } from '@/service/main/home/home'

export const homeModule: Module<IHomeBseState, IRootState> = {
    namespaced: true,
    state: () => {
        return {
            viewsCount: 0,
            messageCount: 0,
            userCount: 0,
            articleCount: 0,
            categoryDTOList: [
                {
                    id: 0,
                    categoryName: '',
                    articleCount: 0,
                },
            ],
            tagDTOList: [
                {
                    id: 0,
                    tagName: '',
                },
            ],
            articleStatisticsList: [
                {
                    date: '',
                    count: 0,
                },
            ],
            uniqueViewDTOList: [],
            articleRankDTOList: 0,
        }
    },
    mutations: {
        changeViewsCount(state, viewsCount: number) {
            state.viewsCount = viewsCount
        },
        changeMessageCount(state, messageCount: number) {
            state.messageCount = messageCount
        },
        changeUserCount(state, userCount: number) {
            state.userCount = userCount
        },
        changeArticleCount(state, articleCount: number) {
            state.articleCount = articleCount
        },
        changeCategoryDTOList(state, categoryDTOList: ICategoryDTOList[]) {
            state.categoryDTOList = categoryDTOList
        },
        changeTagDTOList(state, tagDTOList: ITagDTOList[]) {
            state.tagDTOList = tagDTOList
        },
        changeArticleStatisticsList(state, articleStatisticsList: IArticleStatisticsList[]) {
            state.articleStatisticsList = articleStatisticsList
        },
        changeUniqueViewDTOList(state, uniqueViewDTOList: any[]) {
            state.uniqueViewDTOList = uniqueViewDTOList
        },
        changeArticleRankDTOList(state, articleRankDTOList: number) {
            state.articleRankDTOList = articleRankDTOList
        },
    },
    getters: {
        getViewsCount(state) {
            return state.viewsCount
        },
        getMessageCount(state) {
            return state.messageCount
        },
        getUserCount(state) {
            return state.userCount
        },
        getArticleCount(state) {
            return state.articleCount
        },
    },
    actions: {
        async getHomeBaseData({ commit }) {
            const { data, flag } = await homeBaseData()
            //存入数据到state
            if (flag) {
                commit('changeArticleCount', data.articleCount)
                commit('changeViewsCount', data.viewsCount)
                commit('changeMessageCount', data.messageCount)
                commit('changeUserCount', data.userCount)
                commit('changeArticleRankDTOList', data.articleRankDTOList)
                commit('changeArticleStatisticsList', data.articleStatisticsList)
                commit('changeCategoryDTOList', data.categoryDTOList)
                commit('changeUniqueViewDTOList', data.uniqueViewDTOList)
                commit('changeTagDTOList', data.tagDTOList)
            }
        },
    },
}
