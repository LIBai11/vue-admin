import { Module } from 'vuex'
import { IRootState } from '@/store/types'

export const recoveryModule: Module<any, IRootState> = {
    namespaced: true,
    state: () => {
        return {}
    },
    mutations: {},
    getters: {},
    actions: {},
}
