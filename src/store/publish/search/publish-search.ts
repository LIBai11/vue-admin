import { Module } from 'vuex'
import { IRootState } from '@/store/types'
import { ICategoryState, IPubState, ITagState } from '@/store/publish/search/types'
import { getCategories, getTags } from '@/service/publish'
import { ElNotification } from 'element-plus'

export const publishSearchModule: Module<IPubState, IRootState> = {
    namespaced: true,
    state: () => {
        return {
            tags: [
                {
                    id: 0,
                    tagsName: '',
                },
            ],
            categories: [
                {
                    id: 0,
                    categoryName: '',
                },
            ],
        }
    },
    mutations: {
        changeTags(state: IPubState, tags: ITagState[]) {
            state.tags = tags
        },
        changeCategories(state: IPubState, categories: ICategoryState[]) {
            state.categories = categories
        },
    },
    getters: {
        getTagId(state: IPubState) {
            return state.tags
        },
        getCategoryId(state: IPubState) {
            return state.categories
        },
    },
    actions: {
        async getPublishSearch({ commit }) {
            //tags的response
            const obtainTagName = await getTags()

            //成功
            if (obtainTagName.code === 20000) {
                const tagsData = obtainTagName.data
                commit('changeTags', tagsData)
            } else {
                ElNotification({
                    title: 'Error',
                    message: '分类信息获取失败!请检查网络或重试',
                    type: 'error',
                })
            }

            //categories的response
            const obtainCategoryName = await getCategories()
            //成功
            if (obtainCategoryName.code === 20000) {
                const categoriesData = obtainCategoryName.data
                commit('changeCategories', categoriesData)
            } else {
                ElNotification({
                    title: 'Error',
                    message: '分类信息获取失败!请检查网络或重试',
                    type: 'error',
                })
            }
        },
    },
}
