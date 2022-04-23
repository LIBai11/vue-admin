import { IRootState } from '@/store/types'
import { Module } from 'vuex'

export const noAsyncModule: Module<any, IRootState> = {
    namespaced: true,
    state: () => {
        return {
            menuStatus: 0,
        }
    },
    getters: {},
    mutations: {
        changeMenuStatus(state, menuStatus) {
            state.menuStatus = menuStatus
        },
    },
}
