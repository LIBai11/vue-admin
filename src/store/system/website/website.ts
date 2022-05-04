import { Module } from 'vuex'
import { IRootState } from '@/store/types'
import { IWebsiteConfig, IWebsiteState } from '@/store/system'
import { kxNotification } from '@/base-ui'
import { asyncGetWebsiteConfig } from '@/service/system'
import { asyncUpdateWebsiteConfig } from '@/service/system/website/website'

export const websiteModule: Module<IWebsiteState, IRootState> = {
    namespaced: true,
    state: () => {
        return {
            data: {
                websiteAvatar: '',
                websiteName: '',
                websiteAuthor: '',
                websiteIntro: '',
                websiteNotice: '',
                websiteCreateTime: '',
                websiteRecordNo: '',
                socialLoginList: [],
                socialUrlList: [],
                qq: '',
                github: '',
                gitee: '',
                touristAvatar: '',
                userAvatar: '',
                isCommentReview: 0,
                isMessageReview: 0,
                isEmailNotice: 0,
                isReward: 0,
                weiXinQRCode: '',
                alipayQRCode: '',
                isChatRoom: 0,
                websocketUrl: '',
                isMusicPlayer: 0,
            },
        }
    },
    mutations: {
        changeWebsiteConfig: (state, websiteConfig: IWebsiteConfig) => {
            state.data = websiteConfig
        },
    },
    getters: {},
    actions: {
        //获取信息
        async getWebsiteConfig({ commit }) {
            const data = await asyncGetWebsiteConfig()
            if (data.code === 20000) {
                kxNotification.success('获取配置成功')
                commit('changeWebsiteConfig', data.data)
            } else {
                kxNotification.error(data.message)
            }
        },
        //修改信息
        async updateWebsiteConfig({ commit }, payload: IWebsiteConfig) {
            const data = await asyncUpdateWebsiteConfig(payload)
            if (data.code === 20000) {
                kxNotification.success('修改成功')
            } else {
                kxNotification.error(data.message)
            }
        },
    },
}
