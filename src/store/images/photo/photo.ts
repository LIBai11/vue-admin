import { Module } from 'vuex'
import { IRootState } from '@/store/types'
import { kxNotification } from '@/base-ui'
import {
    IAddPhotoParams,
    IDeletePhotoParams,
    IEditPhotoParams,
    IPhotoRecordList,
    IQueryPhotoParams,
    IRemovePhotoParams,
} from '@/store/images'
import { IPhotoState } from '@/store/images/photo/types'
import {
    asyncAddPhoto,
    asyncDeleteDraftPhoto,
    asyncDeletePhoto,
    asyncEditPhoto,
    asyncGetImagesInfo,
    asyncGetImagesPhoto,
    asyncRemovePhoto,
} from '@/service/images'
import { imagesInfoModule } from '@/store/images/photo/images-info'

export const photoModule: Module<IPhotoState, IRootState> = {
    namespaced: true,
    state: () => {
        return {
            recordList: [],
            count: 0,
        }
    },
    mutations: {
        changePhotoRecordList(state, recordList: IPhotoRecordList[]) {
            state.recordList = recordList
        },
        changePhotoCount(state, count: number) {
            state.count = count
        },
    },
    getters: {},
    actions: {
        //查询相册详情信息
        async getImagesInfo({ commit }, payload: number) {
            const data = await asyncGetImagesInfo(payload)
            if (data.code === 20000) {
                kxNotification.success('获取相册信息成功')
            } else {
                kxNotification.error(data.message)
            }
        },
        //查询相册的照片信息
        async getImagesPhoto({ commit }, payload: IQueryPhotoParams) {
            const data = await asyncGetImagesPhoto(payload)
            commit('changePhotoRecordList', data.data.recordList)
            commit('changePhotoCount', data.data.count)
            if (data.code === 20000) {
                kxNotification.success('获取照片成功')
            } else {
                kxNotification.error(data.message)
            }
        },
        //新增照片
        async addPhoto({ state }, payload: IAddPhotoParams) {
            const data = await asyncAddPhoto(payload)
            if (data.code === 20000) {
                kxNotification.success('添加成功')
            } else {
                kxNotification.error(data.message)
            }
        },
        //编辑照片
        async editPhoto({ state }, payload: IEditPhotoParams) {
            const data = await asyncEditPhoto(payload)
            if (data.code === 20000) {
                kxNotification.success('修改成功')
            } else {
                kxNotification.error(data.message)
            }
        },
        //删除照片
        async deletePhoto({ state }, payload: IDeletePhotoParams) {
            const data = await asyncDeletePhoto(payload)
            if (data.code === 20000) {
                if (payload.isDelete === 0) {
                    kxNotification.success('恢复成功')
                } else {
                    kxNotification.success('删除成功')
                }
            } else {
                kxNotification.error(data.message)
            }
        },
        //移动照片
        async removePhoto({ state }, payload: IRemovePhotoParams) {
            const data = await asyncRemovePhoto(payload)
            if (data.code === 20000) {
                kxNotification.success('移动成功')
            } else {
                kxNotification.error(data.message)
            }
        },
        //彻底删除
        async deleteDraftPhotos({ state }, payload: number[]) {
            const data = await asyncDeleteDraftPhoto(payload)
            if (data.code === 20000) {
                kxNotification.success('删除成功')
            } else {
                kxNotification.error(data.message)
            }
        },
    },
    modules: {
        imagesInfoModule,
    },
}
