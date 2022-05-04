<template>
    <div class="social-info">
        <el-form style="width: 500px" label-width="120px">
            <el-form-item label="QQ">
                <el-input v-model="siteConfigForm.qq" placeholder="请输入QQ号码" />
                <span>是否展示</span>
                <el-switch
                    v-model="qqChecked"
                    active-value="qq"
                    inactive-value="unqq"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    @change="showingChecked"
                />
            </el-form-item>
            <el-form-item label="GitHub">
                <el-input v-model="siteConfigForm.github" placeholder="请输入Github地址" />
                <span>是否展示</span>
                <el-switch
                    v-model="githubChecked"
                    active-value="github"
                    inactive-value="ungithub"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    @change="showingChecked"
                />
            </el-form-item>
            <el-form-item label="Gitee">
                <el-input v-model="siteConfigForm.gitee" placeholder="请输入Gitee地址" />
                <span>是否展示</span>
                <el-switch
                    v-model="giteeChecked"
                    active-value="gitee"
                    inactive-value="ungitee"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    @change="showingChecked"
                />
            </el-form-item>
            <el-form-item>
                <el-button color="#FF6EB8" @click="putConfigBtn" plain>提交修改</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import { useStore } from '@/store'
import { computed, reactive, ref, watch } from 'vue'
import { IWebsiteConfig } from '@/store/system'

const store = useStore()
const checkedSet = new Set<string>()
/**
 * 表单
 */
const siteConfigForm = reactive<IWebsiteConfig>({
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
})

/**
 * 获取数据
 */
const getWebsiteConfig = () => {
    store.dispatch('websiteModule/getWebsiteConfig')
}
getWebsiteConfig()
const siteConfig = computed<IWebsiteConfig>(() => store.state.websiteModule.data)
const qqChecked = ref<string>()
const githubChecked = ref<string>()
const giteeChecked = ref<string>()
watch(
    () => siteConfig.value,
    () => {
        siteConfigForm.websiteAuthor = siteConfig.value.websiteAuthor
        siteConfigForm.websiteAvatar = siteConfig.value.websiteAvatar
        siteConfigForm.websiteName = siteConfig.value.websiteName
        siteConfigForm.websiteCreateTime = siteConfig.value.websiteCreateTime
        siteConfigForm.websiteIntro = siteConfig.value.websiteIntro
        siteConfigForm.websiteNotice = siteConfig.value.websiteNotice
        siteConfigForm.websiteRecordNo = siteConfig.value.websiteRecordNo
        siteConfigForm.socialLoginList = siteConfig.value.socialLoginList
        //
        siteConfigForm.socialUrlList = siteConfig.value.socialUrlList
        siteConfigForm.qq = siteConfig.value.qq
        siteConfigForm.gitee = siteConfig.value.gitee
        siteConfigForm.github = siteConfig.value.github
        //
        siteConfigForm.isChatRoom = siteConfig.value.isChatRoom
        siteConfigForm.isCommentReview = siteConfig.value.isCommentReview
        siteConfigForm.isEmailNotice = siteConfig.value.isEmailNotice
        siteConfigForm.isMessageReview = siteConfig.value.isMessageReview
        siteConfigForm.isMusicPlayer = siteConfig.value.isMusicPlayer
        siteConfigForm.isReward = siteConfig.value.isReward
        siteConfigForm.weiXinQRCode = siteConfig.value.weiXinQRCode
        siteConfigForm.alipayQRCode = siteConfig.value.alipayQRCode
        siteConfigForm.userAvatar = siteConfig.value.userAvatar
        siteConfigForm.touristAvatar = siteConfig.value.touristAvatar
        siteConfigForm.websocketUrl = siteConfig.value.websocketUrl

        /**
         * 判断是否存在需要展示的社交链接
         */

        if (siteConfigForm.socialUrlList.indexOf('qq') !== -1) {
            qqChecked.value = 'qq'
        }
        if (siteConfigForm.socialUrlList.indexOf('github') !== -1) {
            githubChecked.value = 'github'
        }
        if (siteConfigForm.socialUrlList.indexOf('gitee') !== -1) {
            giteeChecked.value = 'gitee'
        }
        siteConfigForm.socialUrlList.forEach((url) => {
            checkedSet.add(url)
        })
    }
)
/**
 * 选择是否展示
 */
const showingChecked = (value: any) => {
    if (value === 'qq' || value === 'github' || value === 'gitee') {
        checkedSet.add(value)
    } else if (value === 'unqq' || value === 'ungithub' || value === 'ungitee') {
        checkedSet.delete(value.substring(2))
    }

    siteConfigForm.socialUrlList = [...checkedSet]
}

/**
 * 提交
 */
const putConfigBtn = () => {
    store.dispatch('websiteModule/updateWebsiteConfig', siteConfigForm).then(() => {
        getWebsiteConfig()
    })
}
</script>

<style scoped lang="less">
.social-info {
}
</style>
