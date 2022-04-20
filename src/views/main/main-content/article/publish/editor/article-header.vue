<template>
    <div class="publish-header">
        <div class="title">发布文章</div>
        <el-row class="head">
            <el-col :lg="18" :sm="18" :md="24" :xs="24">
                <div>
                    <el-input class="article-title" placeholder="请输入文章标题" v-model="heading">
                        <template #prepend>{{ nowDate }}</template>
                    </el-input>
                </div>
            </el-col>
            <el-col :lg="4" :sm="4" :md="24" :xs="24">
                <div>
                    <n-button type="tertiary" style="margin-right: 10px; margin-bottom: 10px">
                        保存草稿
                    </n-button>
                    <n-button type="primary" @click="pubArticleClick">发布文章</n-button>
                </div>
            </el-col>
        </el-row>
    </div>

    <el-dialog v-model="isDialog" destroy-on-close draggable title="发布文章">
        <el-form label-width="120px" class="form">
            <el-row>
                <el-col :span="24">
                    <el-form-item label="文章分类">
                        <el-button>添加分类</el-button>
                    </el-form-item>
                </el-col>

                <el-col :span="24">
                    <el-form-item label="文章标签">
                        <el-button>添加标签</el-button>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="文章类型">
                        <el-select
                            v-model="typeValue"
                            class="m-2"
                            placeholder="Select"
                            size="large"
                        >
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="上传文章封面">
                        <upload-img></upload-img>
                    </el-form-item>
                </el-col>
                <el-col :span="24"></el-col>
                <el-col :span="24"></el-col>
            </el-row>
        </el-form>

        <template #footer>
            <span class="dialog-footer">
                <el-button>Cancel</el-button>
                <el-button type="primary">Confirm</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue'
import { ElMessage } from 'element-plus'
import { UploadImg } from './index'

const props = defineProps<{
    textContent: string
}>()

//获取日期
const date = new Date()
const nowDate = ref(date.toLocaleDateString())
//发布文章的对话框判断
const isDialog = ref<boolean>(false)

//文章标题
const heading = ref<string>('')

//发布文章按钮事件
const pubArticleClick = (): void => {
    if (heading.value === '') {
        ElMessage.warning('请输入文章标题!')
        isDialog.value = false
    } else if (props.textContent === '') {
        ElMessage.warning('请输入文章内容!')
        isDialog.value = false
    } else {
        isDialog.value = true
    }
}

const typeValue = ref<string>('')
const options = [
    {
        value: 'Option1',
        label: 'Option1',
    },
    {
        value: 'Option2',
        label: 'Option2',
    },
    {
        value: 'Option3',
        label: 'Option3',
    },
]
</script>

<style scoped lang="less">
.title {
    font-size: 20px;
    font-weight: bold;
    margin-top: -15px;
}
.head {
    width: 100%;
    display: flex;
    justify-content: space-between;
}
.article-title {
    margin-bottom: 10px;
    width: 100%;
}
.form {
    display: flex;
}
</style>
