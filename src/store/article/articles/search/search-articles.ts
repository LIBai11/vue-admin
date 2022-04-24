import { Module } from 'vuex'
import { IRootState } from '@/store/types'
import { IQueryArticlesParams, IRecordList, ISearchArticlesState } from './types'
import { asyncArticleByCondition } from '@/service/article'

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
        async queryArticles({ commit }, payload: any) {
            //条件查询文章
            const data = await asyncArticleByCondition(payload)
        },
    },
}
