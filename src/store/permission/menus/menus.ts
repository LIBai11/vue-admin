import { Module } from 'vuex'
import { IRootState } from '@/store/types'
import { IManageMenu, IManageMenuState } from '@/store/permission/menus/type'
import { kxNotification } from '@/base-ui'
import {
    asyncDeleteMenu,
    asyncGetMenuList,
    IQueryManageMenusParams,
} from '@/service/permission/menus/menus'

export const menuModule: Module<IManageMenuState, IRootState> = {
    namespaced: true,
    state: () => {
        return {
            data: [],
        }
    },
    mutations: {
        changeMenu(state, menuList: IManageMenu[]) {
            state.data = menuList
        },
    },
    getters: {},
    actions: {
        async getMangeMenuList({ commit }, payload: IQueryManageMenusParams) {
            const data = await asyncGetMenuList(payload)
            if (data.code === 20000) {
                commit('changeMenu', data.data)
                kxNotification.success('菜单获取成功')
            } else {
                kxNotification.error(data.message)
            }
        },
        //删除菜单
        async deleteMenu({ commit }, payload: number) {
            const data = await asyncDeleteMenu(payload)
            if (data.code === 20000) {
                commit('changeMenu', data)
                kxNotification.success('菜单获取成功')
            } else {
                kxNotification.error(data.message)
            }
        },
    },
}
