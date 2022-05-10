import { Module } from 'vuex'
import { IRootState } from '@/store/types'
import { kxNotification } from '@/base-ui'
import {
    IImagesRecordList,
    IImagesState,
    IQueryImagesParams,
    IUpdateImagesParams,
} from '@/store/images'
import { asyncDeleteImages, asyncGetImagesList, asyncUpdateImages } from '@/service/images'

export const imagesModule: Module<IImagesState, IRootState> = {
    namespaced: true,
    state: () => {
        return {
            recordList: [],
            count: 0,
        }
    },
    mutations: {
        changeImagesList(state, recordList: IImagesRecordList[]) {
            state.recordList = recordList
        },
        changeImagesCount(state, count: number) {
            state.count = count
        },
    },
    getters: {},
    actions: {
        //查询相册列表
        async getImagesList({ commit }, payload: IQueryImagesParams) {
            const data = await asyncGetImagesList(payload)
            if (data.code === 20000) {
                kxNotification.success('获取相册成功')
                commit('changeImagesList', data.data.recordList)
                commit('changeImagesCount', data.data.count)
            } else {
                kxNotification.error(data.message)
            }
        },
        //更新
        async updateImages({ state }, payload: IUpdateImagesParams) {
            const data = await asyncUpdateImages(payload)
            if (data.code === 20000) {
                kxNotification.success('修改成功')
            } else {
                kxNotification.error(data.message)
            }
        },
        //删除
        async deleteImages({ state }, payload: number) {
            const data = await asyncDeleteImages(payload)
            if (data.code === 20000) {
                kxNotification.success('删除成功')
            } else {
                kxNotification.error(data.message)
            }
        },
    },
}
