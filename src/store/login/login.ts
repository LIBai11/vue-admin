import { Module } from 'vuex'
import { ILoginState, IMenuState, IUserData } from '@/store/login/types'
import { ICommonState, IRootState } from '@/store/types'
import { ILoginData } from '@/views/login/types'
import { accountLoginRequest, menuListRequest } from '@/service/login/login'
import { ElMessage } from 'element-plus'
import { useSessionCache } from '@/utils/use-storage'
import { useRouter } from 'vue-router'
import router from '@/router'

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
        async handleLoginAction({ commit }, payload: ILoginData) {
            /**
             * 登录请求
             * */
            const { code, data, flag, message }: ICommonState<ILoginState> =
                await accountLoginRequest(payload)
            // console.log('开始调用', loginResData.code)
            //将结果传给common
            // commit('commonModule/changeCode', loginResData.code, { root: true })
            // commit('commonModule/changeData', loginResData.data, { root: true })
            // commit('commonModule/changeFlag', loginResData.flag, { root: true })
            // commit('commonModule/changeMessage', loginResData.message, { root: true })
            if (flag) {
                if (code === 20000) {
                    ElMessage.success(message)
                } else {
                    ElMessage.error(message)
                }
            } else {
                ElMessage.error(message)
            }

            /**
             *  获取菜单
             **/
            const menuList: ICommonState<IMenuState> = await menuListRequest()
            // console.log(menuList.data)
            if (code === 20000) {
                //将数据拼接起来
                const cacheData: IUserData = Object.assign(
                    {},
                    { collapse: false },
                    { avatar: data.avatar },
                    { tabList: [{ name: '首页', path: '/' }] },
                    { userId: data.userInfoId },
                    { nickname: data.nickname },
                    { userMenuList: menuList.data }
                )

                //将数据存到localstorage中
                useSessionCache.setCache('userData', cacheData)

                router.push('/main')
            }
        },
    },
}
