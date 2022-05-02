<template>
    <div class="publish-header">
        <page-title title="发布文章"></page-title>
        <el-row class="head">
            <el-col :lg="18" :md="24" :sm="18" :xl="18" :xs="24">
                <div>
                    <el-input
                        v-model="header"
                        class="article-title"
                        placeholder="请输入文章标题"
                        @input="inputArticleHeader"
                    >
                        <template #prepend>{{ nowDate }}</template>
                    </el-input>
                </div>
            </el-col>
            <el-col :lg="4" :md="24" :sm="4" :xl="4" :xs="24">
                <div>
                    <n-button
                        style="margin-right: 10px; margin-bottom: 10px"
                        type="tertiary"
                        @click="articleDraftClick"
                    >
                        保存草稿
                    </n-button>
                    <n-button type="primary" @click="pubArticleClick">发布文章</n-button>
                </div>
            </el-col>
        </el-row>
    </div>
    <!--发布的dialog-->
    <el-dialog
        v-model="isIssueDialog"
        custom-class="publishDialog"
        destroy-on-close
        draggable
        title="发布文章"
        @closed="handleDialogClose"
    >
        <el-form
            ref="articleFormRef"
            :model="articleForm"
            :rules="articleFormRules"
            class="form"
            label-width="120px"
        >
            <el-row>
                <el-col :span="24">
                    <el-form-item label="文章分类" prop="categoryName">
                        <category-button
                            :categoryData="categories"
                            @pushCategoryData="getCategoryData"
                        />
                    </el-form-item>
                </el-col>

                <el-col :span="24">
                    <el-form-item label="文章标签" prop="tagNameList">
                        <tag-button :tagData="tags" @pushTagsData="getTagsData" />
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="文章类型" prop="type">
                        <el-select
                            v-model="modelSelect"
                            clearable
                            placeholder="请选择文章类型"
                            size="large"
                            @change="typeChange"
                        >
                            <el-option
                                v-for="selection in typeSelections"
                                :key="selection.type"
                                :label="selection.label"
                                :value="selection.label"
                            />
                        </el-select>
                    </el-form-item>
                </el-col>

                <template v-if="modelSelect === '转载'">
                    <el-col :span="24">
                        <el-form-item label="原文链接" prop="originalUrl">
                            <el-input
                                key="reprint"
                                v-model="articleForm.originalUrl"
                                placeholder="请输入原文链接~"
                            />
                        </el-form-item>
                    </el-col>
                </template>
                <template v-if="modelSelect === '翻译'">
                    <el-col :span="24">
                        <el-form-item label="原文链接" prop="originalUrl">
                            <el-input
                                key="translate"
                                v-model="articleForm.originalUrl"
                                placeholder="请输入原文链接~"
                            />
                        </el-form-item>
                    </el-col>
                </template>

                <el-col :span="24">
                    <el-form-item label="上传文章封面" prop="articleCover">
                        <upload-img @pushImgUrl="getImgUrl"></upload-img>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="是否置顶">
                        <el-switch v-model="isTop" active-color="#13ce66" @change="topChange" />
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="发布形式">
                        <el-radio-group
                            v-model="articleStatusLabel"
                            size="small"
                            @change="statusChange"
                        >
                            <el-radio-button label="公开" name="1" />
                            <el-radio-button label="私密" name="2" />
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>

        <template #footer>
            <span class="dialog-footer">
                <el-button @click="articleFormReset(articleFormRef)">重置</el-button>
                <el-button type="primary" @click="handleConfirmBtnClick(articleFormRef)">
                    确认发布
                </el-button>
            </span>
        </template>
    </el-dialog>

    <!--草稿的dialog-->
    <el-dialog
        v-model="isDraftDialog"
        custom-class="publishDialog"
        destroy-on-close
        draggable
        title="保存草稿"
        @closed="handleDialogClose"
    >
        <el-form class="form" label-width="120px">
            <el-row>
                <el-col :span="24">
                    <el-form-item label="文章分类">
                        <category-button
                            :categoryData="categories"
                            @pushCategoryData="getCategoryData"
                        />
                    </el-form-item>
                </el-col>

                <el-col :span="24">
                    <el-form-item label="文章标签">
                        <tag-button :tagData="tags" @pushTagsData="getTagsData" />
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="文章类型">
                        <el-select
                            v-model="modelSelect"
                            clearable
                            placeholder="请选择文章类型"
                            size="large"
                            @change="typeChange"
                        >
                            <el-option
                                v-for="selection in typeSelections"
                                :key="selection.type"
                                :label="selection.label"
                                :value="selection.label"
                            />
                        </el-select>
                    </el-form-item>
                </el-col>

                <template v-if="modelSelect === '转载'">
                    <el-col :span="24">
                        <el-form-item label="原文链接" prop="originalUrl">
                            <el-input
                                key="reprint"
                                v-model="articleForm.originalUrl"
                                placeholder="请输入原文链接~"
                            />
                        </el-form-item>
                    </el-col>
                </template>
                <template v-if="modelSelect === '翻译'">
                    <el-col :span="24">
                        <el-form-item label="原文链接" prop="originalUrl">
                            <el-input
                                key="translate"
                                v-model="articleForm.originalUrl"
                                placeholder="请输入原文链接~"
                            />
                        </el-form-item>
                    </el-col>
                </template>

                <el-col :span="24">
                    <el-form-item label="上传文章封面" prop="articleCover">
                        <upload-img @pushImgUrl="getImgUrl"></upload-img>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="是否置顶">
                        <el-switch v-model="isTop" active-color="#13ce66" @change="topChange" />
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="发布形式">
                        <el-radio-group
                            v-model="articleStatusLabel"
                            disabled
                            size="small"
                            @change="statusChange"
                        >
                            <el-radio-button label="草稿箱" name="3" />
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>

        <template #footer>
            <span class="dialog-footer">
                <el-button @click="articleFormReset">重置</el-button>
                <el-button type="primary" @click="handleDraftBtnClick">保存草稿</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { defineProps, reactive, ref } from 'vue'
import { ElMessage, ElNotification, FormInstance, FormRules } from 'element-plus'
import { useStore } from '@/store'
import useState from '@/utils/useState'
import { PageTitle } from '@/base-ui/index'
import { UploadImg } from './index'
import { CategoryButton, TagButton } from './publish-form/index'
import { IArticleForm } from './publish-form/types'
import { ICategoryState, ITagState } from '@/store/article/publish/search/types'
import { issueArticle } from '@/service/article'

const props = defineProps<{
    textContent: string
}>()
const store = useStore()

//获取表格实例
const articleFormRef = ref<FormInstance>()
//获取日期
const date = new Date()
const nowDate = ref(date.toLocaleDateString())

//发布文章的对话框判断
const isIssueDialog = ref<boolean>(false)
//保存草稿的对话框判断
const isDraftDialog = ref<boolean>(false)

//文章类型
const modelSelect = ref('原创')

const typeSelections = [
    {
        type: '1',
        label: '原创',
    },
    {
        type: '2',
        label: '转载',
    },
    {
        type: '3',
        label: '翻译',
    },
]
//文章标题
const header = ref<string>('')

//是否置顶
const isTop = ref(false)
//文章发布形式的中文(展示)
const articleStatusLabel = ref('公开')
//文章发布形式:1公开,2隐藏,3草稿
const articleStatus = ref(1)

//定义一个响应式对象来储存文章类型改变后的type:1原创,2转载,3草稿
// const hasTypeSelection = ref<number>(1)
//存放表单数据
const articleForm = reactive<IArticleForm>({
    id: null,
    articleTitle: header.value,
    articleContent: '',
    articleCover: '',
    categoryName: '',
    tagNameList: [],
    originalUrl: '',
    isTop: 0,
    type: 1,
    status: 1,
})
//表单校验规则
const articleFormRules = reactive<FormRules>({
    articleCover: [
        {
            required: true,
            message: '请上传文章封面!',
            trigger: 'blur',
        },
    ],
    categoryName: [
        {
            required: true,
            message: '请选择文章分类',
            trigger: 'change',
        },
    ],
    tagNameList: [
        {
            required: true,
            message: '请选择文章标签',
            trigger: 'change',
        },
    ],
    originalUrl: [
        {
            required: true,
            message: '请输入原文地址!',
            trigger: 'blur',
        },
    ],
    type: [
        {
            required: true,
            message: '请选择文章类型!',
            trigger: 'change',
        },
    ],
})

//分类组件传来的数据
const getCategoryData = (categoryData: ICategoryState) => {
    articleForm.categoryName = categoryData.categoryName
}
//标签组件传来的数据
const getTagsData = (tagsData: ITagState[]) => {
    articleForm.tagNameList = []
    tagsData.forEach((tag) => {
        articleForm.tagNameList.push(tag.tagName)
    })
}
//图片上传组件传来的数据
const getImgUrl = (imgUrl: string) => {
    articleForm.articleCover = imgUrl
}
//发布文章按钮事件
const pubArticleClick = (): void => {
    // console.log(articleForm)
    if (header.value === '') {
        ElMessage.warning('请输入文章标题!')
        isIssueDialog.value = false
    } else if (props.textContent === '') {
        ElMessage.warning('请输入文章内容!')
        isIssueDialog.value = false
    } else {
        articleForm.type = 1
        articleForm.originalUrl = ''
        store.dispatch('publishSearchModule/getPublishSearch')
        articleForm.articleContent = props.textContent
        isIssueDialog.value = true
    }
}
//发布文章dialog关闭事件
const handleDialogClose = () => {
    modelSelect.value = '原创'
    articleForm.type = 1
    articleForm.originalUrl = ''
}
//保存到草稿箱按钮触发事件
const articleDraftClick = (): void => {
    if (header.value === '') {
        ElMessage.warning('请输入文章标题!')
        isDraftDialog.value = false
    } else if (props.textContent === '') {
        ElMessage.warning('请输入文章内容!')
        isDraftDialog.value = false
    } else {
        articleForm.status = articleStatus.value = 3
        store.dispatch('publishSearchModule/getPublishSearch')
        articleForm.articleContent = props.textContent
        isDraftDialog.value = true
    }
}
//发布状态改变触发的事件
const statusChange = (value: '公开' | '私密') => {
    if (value === '公开') {
        articleForm.status = articleStatus.value = 1
    } else if (value === '私密') {
        articleForm.status = articleStatus.value = 2
    } else {
        articleForm.status = articleStatus.value = 3
    }
}
//置顶状态改变触发的事件
const topChange = (topVal: boolean) => {
    if (topVal) {
        articleForm.isTop = 1
    } else {
        articleForm.isTop = 0
    }
}
//选择文章类型触发事件
const typeChange = (type: any) => {
    if (type === '原创') {
        articleForm.type = 1
    } else if (type === '转载') {
        articleForm.type = 2
    }
    if (type === '翻译') {
        articleForm.type = 3
    }
}
const { tags, categories } = useState({
    tags: (state: any) => state.publishSearchModule.tags,
    categories: (state: any) => state.publishSearchModule.categories,
})

//监听标题输入框
const inputArticleHeader = () => {
    articleForm.articleTitle = header.value
}

//确认发布按钮
const handleConfirmBtnClick = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate(async (valid) => {
        if (valid) {
            const data = await issueArticle(articleForm)
            // console.log(data)
            if (data && data.code === 20000) {
                ElNotification({
                    title: 'Success',
                    message: '发布成功!',
                    type: 'success',
                })
                isIssueDialog.value = false
            } else {
                ElNotification({
                    title: 'Error!',
                    message: data.message,
                    type: 'error',
                })
            }
        }
    })
}
//草稿箱确认保存按钮
const handleDraftBtnClick = async () => {
    const data = await issueArticle(articleForm)
    if (data && data.code === 20000) {
        ElNotification({
            title: 'Success',
            message: '保存成功!',
            type: 'success',
        })
        isDraftDialog.value = false
    } else {
        ElNotification({
            title: 'Error!',
            message: data.message,
            type: 'error',
        })
    }
}
const articleFormReset = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}
</script>

<style lang="less" scoped>
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
<style>
.publishDialog {
    min-width: 400px;
}
</style>
