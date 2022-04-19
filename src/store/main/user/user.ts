import { toUserAreaList } from '@/service/main/home/home'
import { Module } from 'vuex'
import { IUserArea, IUserAreaList } from '@/store/main/user/types'
import { IRootState } from '@/store/types'

export const userModule: Module<IUserAreaList, IRootState> = {
    namespaced: true,
    state: () => {
        return {
            userAreaList: [{ name: '', value: 0 }],
        }
    },
    mutations: {
        //下面是用户地域分布
        changeUserAreaList(state, userAreaList: IUserArea[]) {
            state.userAreaList = userAreaList
        },
    },
    actions: {
        async getUserAreaList({ commit }, type: number) {
            const { data, flag } = await toUserAreaList(type)
            if (flag) {
                commit('changeUserAreaList', data)
            }
        },
    },
}
