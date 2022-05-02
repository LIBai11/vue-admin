import { Module } from 'vuex'
import { ILoginState, IUserData, IUserMenusState } from '@/store/login/types'
import { ICommonState, IRootState } from '@/store/types'
import { ILoginData } from '@/views/login/types'
import { accountLoginRequest, browserFresh, menuListRequest } from '@/service/login/login'
import { useSessionCache } from '@/utils/use-storage'
import router from '@/router'
import { mapMenusToRoutes } from '@/utils/use-menus'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'

export const loginModule: Module<ILoginState, IRootState> = {
    namespaced: true,
    state: () => {
        return {
            articleLikeSet: [],
            avatar: '',
            commentLikeSet: [],
            email: '',
            id: 0,
            intro: '',
            ipAddress: '',
            ipSource: '',
            lastLoginTime: '',
            loginType: 0,
            nickname: '',
            talkLikeSet: [],
            userInfoId: 0,
            username: '',
        }
    },
    mutations: {
        changeArticleLikeSet(state, articleLikeSet) {
            state.articleLikeSet = articleLikeSet
        },
        changeAvatar(state, avatar) {
            state.avatar = avatar
        },
        changeCommentLikeSet(state, commentLikeSet) {
            state.commentLikeSet = commentLikeSet
        },
        changeEmail(state, email) {
            state.email = email
        },
        changeId(state, id) {
            state.id = id
        },
        changeIntro(state, intro) {
            state.intro = intro
        },
        changeIpAddress(state, ipAddress) {
            state.ipAddress = ipAddress
        },
        changeIpSource(state, ipSource) {
            state.ipSource = ipSource
        },
        changeLastLoginTime(state, lastLoginTime) {
            state.lastLoginTime = lastLoginTime
        },
        changeLoginType(state, loginType) {
            state.loginType = loginType
        },
        changeNickname(state, nickName) {
            state.nickname = nickName
        },
        changeTalkLikeSet(state, talkLikeSet) {
            state.talkLikeSet = talkLikeSet
        },
        changeUserInfoId(state, userInfoId) {
            state.userInfoId = userInfoId
        },
        changeUsername(state, username) {
            state.username = username
        },
    },
    getters: {},
    actions: {
        async handleLoginAction({ commit, dispatch }, payload: ILoginData) {
            /**
             * 登录请求
             * */
            const { code, data }: ICommonState<ILoginState> = await accountLoginRequest(payload)
            // console.log('开始调用', loginResData.code)
            //将结果传给common
            // commit('commonModule/changeCode', loginResData.code, { root: true })
            // commit('commonModule/changeData', loginResData.data, { root: true })
            // commit('commonModule/changeFlag', loginResData.flag, { root: true })
            // commit('commonModule/changeMessage', loginResData.message, { root: true })

            /**
             *  获取菜单
             **/
            const menuList: ICommonState<IUserMenusState> = await menuListRequest()
            // console.log(menuList.data)
            if (code === 20000) {
                ElMessage.success('登录成功!')
                //将数据拼接起来
                // 将数据存放在mutation中
                commit('changeAvatar', data.avatar)
                commit('changeUserInfoId', data.userInfoId)
                commit('changeNickname', data.nickname)
                commit('changeAvatar', data.avatar)
                const cacheData = ref<IUserData>()

                useSessionCache.setCache('userData', '')
                cacheData.value = Object.assign(
                    {},
                    { collapse: false },
                    { avatar: data.avatar },
                    // { tabList: rootState.noAsyncModule.tabs },
                    { userId: data.userInfoId },
                    { nickname: data.nickname },
                    { userMenuList: menuList.data }
                )
                useSessionCache.setCache('userData', cacheData.value)
                //将数据存到localstorage中

                dispatch('getLocalCache')
                await router.push('/home')
                // console.log(routes)
            }
        },

        async getLocalCache() {
            if (useSessionCache.getCache('userData')) {
                const userData: IUserData = useSessionCache.getCache('userData')
                const menuListData: IUserMenusState = userData.userMenuList
                // console.log(menuListData)
                const routes = mapMenusToRoutes(menuListData)
                routes.forEach((route) => {
                    router.addRoute('main', route)
                })
                const data = await browserFresh()
                if (data && data.code !== 20000) {
                    await router.push('/login')
                }
            }
        },
    },
}
