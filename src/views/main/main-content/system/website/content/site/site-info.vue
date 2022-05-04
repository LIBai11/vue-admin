<template>
    <div class="site-info">
        <el-form style="width: 500px" label-width="120px">
            <el-form-item label="网站头像">
                <upload-img
                    :url="siteConfigForm.websiteAvatar"
                    @handleUploadImg="handleUploadImg"
                />
            </el-form-item>
            <el-form-item label="网站名称">
                <el-input v-model="siteConfigForm.websiteName" placeholder="请输入网站名称" />
            </el-form-item>
            <el-form-item label="网站作者">
                <el-input v-model="siteConfigForm.websiteAuthor" placeholder="请输入网站公告" />
            </el-form-item>
            <el-form-item label="网站简介">
                <el-input v-model="siteConfigForm.websiteIntro" placeholder="请输入网站公告" />
            </el-form-item>
            <el-form-item label="网站创建日期">
                <el-date-picker
                    v-model="siteConfigForm.websiteCreateTime"
                    type="date"
                    placeholder="请选择网站创建日期"
                    :disabled-date="disabledDate"
                />
            </el-form-item>
            <el-form-item label="网站公告">
                <el-input
                    v-model="siteConfigForm.websiteNotice"
                    type="textarea"
                    :rows="8"
                    placeholder="请输入网站公告"
                />
            </el-form-item>
            <el-form-item label="备案号">
                <el-input v-model="siteConfigForm.websiteRecordNo" placeholder="请输入备案号" />
            </el-form-item>
            <el-form-item label="第三方登录">
                <el-checkbox-group v-model="loginTypes" @change="loginTypeChecked">
                    <el-checkbox-button v-for="type in ['qq', 'weibo']" :key="type" :label="type">
                        {{ loginFilter(type) }}
                    </el-checkbox-button>
                </el-checkbox-group>
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
/**
 * 第三方登录过滤器
 */
const loginTypes = ref<string[]>([])

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
        siteConfigForm.isChatRoom = siteConfig.value.isChatRoom
        siteConfigForm.isCommentReview = siteConfig.value.isCommentReview
        siteConfigForm.isEmailNotice = siteConfig.value.isEmailNotice
        siteConfigForm.isMessageReview = siteConfig.value.isMessageReview
        siteConfigForm.isMusicPlayer = siteConfig.value.isMusicPlayer
        siteConfigForm.isReward = siteConfig.value.isReward
        siteConfigForm.weiXinQRCode = siteConfig.value.weiXinQRCode
        siteConfigForm.alipayQRCode = siteConfig.value.alipayQRCode
        siteConfigForm.socialUrlList = siteConfig.value.socialUrlList
        siteConfigForm.qq = siteConfig.value.qq
        siteConfigForm.userAvatar = siteConfig.value.userAvatar
        siteConfigForm.touristAvatar = siteConfig.value.touristAvatar
        siteConfigForm.websocketUrl = siteConfig.value.websocketUrl
        siteConfigForm.gitee = siteConfig.value.gitee
        siteConfigForm.github = siteConfig.value.github

        siteConfigForm.socialLoginList.forEach((type) => {
            loginTypes.value.push(type)
        })
    }
)

/**
 * 时间过滤
 */
const disabledDate = (time: Date) => {
    return time.getTime() > Date.now()
}

const loginFilter = (data: string) => {
    if (data === 'weibo') return '微博'
    else if (data === 'qq') return 'QQ'
}

/**
 * 选择第三方登录
 */
const loginTypeChecked = (type: any) => {
    siteConfigForm.socialLoginList = type
}

/**
 * 提交
 */
const handleUploadImg = (imgUrl: string) => {
    siteConfigForm.websiteAvatar = imgUrl
}
const putConfigBtn = () => {
    store.dispatch('websiteModule/updateWebsiteConfig', siteConfigForm).then(() => {
        getWebsiteConfig()
    })
}
</script>

<style scoped lang="less"></style>
