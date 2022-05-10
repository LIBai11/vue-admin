import { Module } from 'vuex'
import { IRootState } from '@/store/types'
import { kxNotification } from '@/base-ui'

import { IImagesInfoState } from '@/store/images/photo/types'
import { asyncGetImagesInfo } from '@/service/images'

export const imagesInfoModule: Module<IImagesInfoState, IRootState> = {
    namespaced: true,
    state: () => {
        return {
            id: 0,
            albumName: '',
            albumDesc: '',
            albumCover: '',
            photoCount: 0,
            status: 0,
        }
    },
    mutations: {
        changeImagesId(state, id: number) {
            state.id = id
        },
        changeImagesAlbumName(state, albumName: string) {
            state.albumName = albumName
        },
        changeImagesAlbumDesc(state, albumDesc: string) {
            state.albumDesc = albumDesc
        },
        changeImagesAlbumCover(state, albumCover: string) {
            state.albumCover = albumCover
        },
        changeImagesPhotoCount(state, photoCount: number) {
            state.photoCount = photoCount
        },
        changeImagesStatus(state, status: number) {
            state.status = status
        },
    },
    getters: {},
    actions: {
        //查询相册详情信息
        async getImagesInfo({ commit }, payload: number) {
            const data = await asyncGetImagesInfo(payload)
            if (data.code === 20000) {
                kxNotification.success('获取相册信息成功')
                commit('changeImagesAlbumCover', data.data.albumCover)
                commit('changeImagesAlbumDesc', data.data.albumDesc)
                commit('changeImagesAlbumName', data.data.albumName)
                commit('changeImagesId', data.data.id)
                commit('changeImagesStatus', data.data.status)
                commit('changeImagesPhotoCount', data.data.photoCount)
            } else {
                kxNotification.error(data.message)
            }
        },
    },
}
