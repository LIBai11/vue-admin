import { IRootState } from '@/store/types'
import { Module } from 'vuex'
import { useSessionCache } from '@/utils/use-storage'

export const noAsyncModule: Module<any, IRootState> = {
    namespaced: true,
    state: () => {
        return {
            menuStatus: null,
            tagId: null,
            categoryId: null,
            typeId: null,
            articleTitle: null,
            status: null,
            isDelete: null,
            deleteIdArr: [],
            tabs: [],
        }
    },
    mutations: {
        changeMenuStatus(state, menuStatus) {
            state.menuStatus = menuStatus
        },
        changeTagId(state, tagId: number) {
            state.tagId = tagId
        },
        changeCategoryId(state, categoryId: number) {
            state.categoryId = categoryId
        },
        changeTypeId(state, typeId: number) {
            state.typeId = typeId
        },
        changeArticleTitle(state, articleTitle: string) {
            state.articleTitle = articleTitle
        },
        changeStatusTitle(state, status: number) {
            state.status = status
        },
        changeIsDeleteTitle(state, isDelete: number) {
            state.isDelete = isDelete
        },
        changeDeleteIdArr(state, deleteIdArr: any[]) {
            state.deleteIdArr = deleteIdArr
        },
        changeTabs(state, tabs) {
            state.tabs = tabs
        },
    },
    getters: {
        getMenuStatus(state) {
            return state.menuStatus
        },
        getTagId(state) {
            return state.tagId
        },
        getCategoryId(state) {
            return state.categoryId
        },
        getTypeId(state) {
            return state.typeId
        },
        getArticleTitle(state) {
            return state.articleTitle
        },
        getStatusTitle(state) {
            return state.status
        },
        getIsDeleteTitle(state) {
            return state.isDelete
        },
    },
    actions: {
        setSessionTabs({ commit }, tabs) {
            if (tabs !== {}) {
                useSessionCache.setCache('tabs', tabs)
            }
        },
    },
}
