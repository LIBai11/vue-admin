<template>
    <div class="other-info">
        <el-form style="width: 500px" label-width="120px" label-position="right">
            <el-form-item label="用户头像">
                <upload-img
                    :url="siteConfigForm.userAvatar"
                    @handleUploadImg="handleUploadUserAvatar"
                />
            </el-form-item>
            <el-form-item label="游客头像">
                <upload-img
                    :url="siteConfigForm.touristAvatar"
                    @handleUploadImg="handleUploadTouristAvatar"
                />
            </el-form-item>
            <el-form-item label="邮箱通知">
                <el-radio v-model="siteConfigForm.isEmailNotice" :label="1">开启</el-radio>
                <el-radio v-model="siteConfigForm.isEmailNotice" :label="0">关闭</el-radio>
            </el-form-item>
            <el-form-item label="评论审核">
                <el-radio v-model="siteConfigForm.isCommentReview" :label="1">开启</el-radio>
                <el-radio v-model="siteConfigForm.isCommentReview" :label="0">关闭</el-radio>
            </el-form-item>
            <el-form-item label="留言审核">
                <el-radio v-model="siteConfigForm.isMessageReview" :label="1">开启</el-radio>
                <el-radio v-model="siteConfigForm.isMessageReview" :label="0">关闭</el-radio>
            </el-form-item>
            <el-form-item label="打赏状态">
                <el-radio v-model="siteConfigForm.isReward" :label="1">开启</el-radio>
                <el-radio v-model="siteConfigForm.isReward" :label="0">关闭</el-radio>
            </el-form-item>
            <el-form-item label="微信收款码">
                <upload-img
                    :url="siteConfigForm.weiXinQRCode"
                    @handleUploadImg="handleUploadWeChatQRCode"
                />
            </el-form-item>
            <el-form-item label="支付宝收款码">
                <upload-img
                    :url="siteConfigForm.alipayQRCode"
                    @handleUploadImg="handleUploadALiPayQRCode"
                />
            </el-form-item>
            <el-form-item label="聊天室状态">
                <el-radio v-model="siteConfigForm.isChatRoom" :label="1">开启</el-radio>
                <el-radio v-model="siteConfigForm.isChatRoom" :label="0">关闭</el-radio>
            </el-form-item>
            <el-form-item label="WebSocket地址">
                <el-input v-model="siteConfigForm.websocketUrl"></el-input>
            </el-form-item>
            <el-form-item label="音乐播放器状态">
                <el-radio v-model="siteConfigForm.isMusicPlayer" :label="1">开启</el-radio>
                <el-radio v-model="siteConfigForm.isMusicPlayer" :label="0">关闭</el-radio>
            </el-form-item>
            <el-form-item>
                <el-button color="#FF6EB8" @click="putConfigBtn" plain>提交修改</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useStore } from '@/store'
import { IWebsiteConfig } from '@/store/system'
import { UploadImg } from '@/components'

const store = useStore()

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

watch(
    () => siteConfig.value,
    () => {
        //
        siteConfigForm.websiteAuthor = siteConfig.value.websiteAuthor
        siteConfigForm.websiteAvatar = siteConfig.value.websiteAvatar
        siteConfigForm.websiteName = siteConfig.value.websiteName
        siteConfigForm.websiteCreateTime = siteConfig.value.websiteCreateTime
        siteConfigForm.websiteIntro = siteConfig.value.websiteIntro
        siteConfigForm.websiteNotice = siteConfig.value.websiteNotice
        siteConfigForm.websiteRecordNo = siteConfig.value.websiteRecordNo
        siteConfigForm.socialLoginList = siteConfig.value.socialLoginList
        //
        siteConfigForm.gitee = siteConfig.value.gitee
        siteConfigForm.github = siteConfig.value.github
        siteConfigForm.socialUrlList = siteConfig.value.socialUrlList
        siteConfigForm.qq = siteConfig.value.qq
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
    }
)
const change = (value: any) => {
    console.log(value)
}
/**
 * 提交
 */
const handleUploadUserAvatar = (imgUrl: string) => {
    siteConfigForm.websiteAvatar = imgUrl
}
const handleUploadTouristAvatar = (imgUrl: string) => {
    siteConfigForm.websiteAvatar = imgUrl
}
const handleUploadWeChatQRCode = (imgUrl: string) => {
    siteConfigForm.websiteAvatar = imgUrl
}
const handleUploadALiPayQRCode = (imgUrl: string) => {
    siteConfigForm.websiteAvatar = imgUrl
}

const putConfigBtn = () => {
    console.log(siteConfigForm)
    store.dispatch('websiteModule/updateWebsiteConfig', siteConfigForm).then(() => {
        getWebsiteConfig()
    })
}
</script>

<style scoped lang="less"></style>
