import { Module } from 'vuex'
import { ICommonState, IRootState, T } from '@/store/types'

export const commonModule: Module<ICommonState<T>, IRootState> = {
    namespaced: true,
    state: () => {
        return {
            code: 0,
            data: {},
            flag: true,
            message: '',
        }
    },
    mutations: {
        changeCode(state, code) {
            state.code = code
        },
        changeData(state, data) {
            state.data = data
        },
        changeFlag(state, flag) {
            state.flag = flag
        },
        changeMessage(state, message) {
            state.message = message
        },
    },
    getters: {
        getCode(state) {
            return state.code
        },
        /*  getData(state, data) {
              state.data = data
          },
          getFlag(state, flag) {
              state.flag = flag
          },
          getMessage(state, message) {
              state.message = message
          },*/
    },
    actions: {},
}
