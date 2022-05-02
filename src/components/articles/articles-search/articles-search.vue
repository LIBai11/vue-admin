<template>
    <div class="articles-search">
        <el-form>
            <el-form-item>
                <el-row :gutter="15">
                    <el-col :lg="3" :md="4" :sm="6" :xl="4" :xs="0">
                        <el-button :icon="Delete" round type="danger" @click="handleDeleteDialog">
                            批量删除
                        </el-button>
                    </el-col>
                    <el-col :lg="4" :md="4" :sm="6" :xl="4" :xs="24">
                        <el-form-item>
                            <el-select
                                v-model="typeId"
                                clearable
                                placeholder="请选择文章类型"
                                @change="handleChangeType"
                            >
                                <el-option
                                    v-for="type in typeOptions"
                                    :key="type.name"
                                    :label="type.name"
                                    :value="type.key"
                                />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :lg="4" :md="4" :sm="6" :xl="4" :xs="24">
                        <el-form-item>
                            <el-select
                                v-model="categoryId"
                                clearable
                                placeholder="请选择分类"
                                @change="handleChangeCategory"
                            >
                                <el-option
                                    v-for="category in categoryList"
                                    :key="category.categoryName"
                                    :label="category.categoryName"
                                    :value="category.id"
                                    filterable
                                />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :lg="4" :md="4" :sm="6" :xl="4" :xs="24">
                        <el-form-item>
                            <el-select
                                v-model="tagId"
                                clearable
                                placeholder="请选择标签"
                                @change="handleChangeTag"
                            >
                                <el-option
                                    v-for="tag in tagsList"
                                    :key="tag.tagName"
                                    :label="tag.tagName"
                                    :value="tag.id"
                                    filterable
                                />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :lg="4" :md="4" :sm="6" :xl="4" :xs="24">
                        <el-form-item>
                            <el-input
                                v-model="articleTitle"
                                placeholder="请输入文章名"
                                style="width: 200px"
                                @input="handleChangeArticleTitle"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :lg="3" :md="4" :sm="6" :xl="4" :xs="0">
                        <el-button
                            :icon="Search"
                            round
                            type="success"
                            @click="handleSearchBtnClick"
                        >
                            搜索
                        </el-button>
                    </el-col>
                    <el-col :lg="0" :md="0" :sm="0" :xl="0" :xs="6">
                        <el-button :icon="Delete" round type="danger" @click="handleDeleteDialog" />
                    </el-col>
                    <el-col :lg="0" :md="0" :sm="0" :xl="0" :xs="6">
                        <el-button
                            :icon="Search"
                            round
                            type="success"
                            @click="handleSearchBtnClick"
                        />
                    </el-col>
                </el-row>
            </el-form-item>
        </el-form>
        <el-dialog
            v-model="deleteDialogVisible"
            close-on-press-escape
            title="确认删除所选文章?"
            width="30%"
        >
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="handleDeleteDialog">取消</el-button>
                    <el-popconfirm
                        v-if="!props.destroyBtn"
                        :icon="InfoFilled"
                        cancel-button-text="取消"
                        confirm-button-text="确认删除"
                        icon-color="red"
                        title="请再次确认是否删除文章!"
                        @confirm="handleDeleteTwiceConfirmBtn"
                    >
                        <template #reference>
                            <el-button type="primary">确认删除</el-button>
                        </template>
                    </el-popconfirm>
                    <el-popconfirm
                        v-else
                        :icon="InfoFilled"
                        cancel-button-text="取消"
                        confirm-button-text="确认删除"
                        icon-color="red"
                        title="请再次确认是否销毁文章!这将不可恢复"
                        @confirm="handleDestroyTwiceConfirmBtn"
                    >
                        <template #reference>
                            <el-button type="primary">确认删除</el-button>
                        </template>
                    </el-popconfirm>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { computed, defineExpose, defineProps, onMounted, ref, watch, withDefaults } from 'vue'
import { useStore } from '@/store'
import { Delete, InfoFilled, Search } from '@element-plus/icons-vue'
import { ICategoryState, ITagState } from '@/store/article/publish/search/types'
import { ElMessage } from 'element-plus'

const store = useStore()

interface IDestroyBtn {
    status?: number | undefined
    isDelete?: number | undefined
    currentPage?: number
    pageSize?: number
    destroyBtn?: boolean
}

const props = withDefaults(defineProps<IDestroyBtn>(), {
    destroyBtn: false,
})

//获取分类和标签
store.dispatch('publishSearchModule/getPublishSearch')

//标签列表
const tagId = ref()
const tagsList = computed<ITagState[]>(() => {
    return store.state.publishSearchModule.tags
})

//分类列表
const categoryId = ref()
const categoryList = computed<ICategoryState[]>(() => {
    return store.state.publishSearchModule.categories
})

//文章标题
const articleTitle = ref()

//文章类型列表
const typeId = ref()
const typeOptions = [
    {
        name: '原创',
        key: 1,
    },
    {
        name: '转载',
        key: 2,
    },
    {
        name: '翻译',
        key: 3,
    },
]
//删除确认模态框
const deleteDialogVisible = ref(false)
//查询请求
const asyncQueryArticle = (currentPage?: number, pageSize?: number) => {
    store.dispatch('searchArticlesModule/queryArticles', {
        tagId: tagId.value,
        categoryId: categoryId.value,
        typeId: typeId.value,
        articleTitle: articleTitle.value,
        status: props.status,
        isDelete: props.isDelete,
        current: currentPage || 1,
        size: pageSize || 10,
    })
}

watch(
    () => props.currentPage,
    () => {
        // console.log(props.currentPage)
        asyncQueryArticle(props.currentPage)
    }
)
watch(
    () => props.pageSize,
    () => {
        asyncQueryArticle(props.currentPage, props.pageSize)
    }
)
onMounted(() => {
    articleTitle.value = store.getters['noAsyncModule/getArticleTitle']
    categoryId.value = store.getters['noAsyncModule/getCategoryId']
    tagId.value = store.getters['noAsyncModule/getTagId']
    typeId.value = store.getters['noAsyncModule/getTypeId']
    asyncQueryArticle()
})
//选择文章类型触发
const handleChangeType = (typeId: string) => {
    store.commit('noAsyncModule/changeTypeId', typeId)
    asyncQueryArticle()
}
//选择文章分类触发
const handleChangeCategory = (categoryId: string) => {
    store.commit('noAsyncModule/changeCategoryId', categoryId)
    asyncQueryArticle()
}
//选择文章标签触发
const handleChangeTag = (tagId: string) => {
    store.commit('noAsyncModule/changeTagId', tagId)
    asyncQueryArticle()
}

//文章标题输入框中内容发生改变时
const handleChangeArticleTitle = (title: string) => {
    store.commit('noAsyncModule/changeArticleTitle', title)
}
//搜索按钮点击
const handleSearchBtnClick = () => {
    asyncQueryArticle()
}
//批量删除按钮点击
const handleDeleteArticles = () => {
    store.dispatch('searchArticlesModule/deleteArticleById').then(() => {
        asyncQueryArticle()
    })
}
//确认删除对话框
const handleDeleteDialog = () => {
    const selectDeleteId = computed(() => {
        return store.state.noAsyncModule.deleteIdArr
    })
    if (selectDeleteId.value.length === 0) {
        ElMessage.warning('未选择文章!')
        return
    }
    deleteDialogVisible.value = !deleteDialogVisible.value
}
//再次确认是否删除的模态框
const handleDeleteTwiceConfirmBtn = () => {
    handleDeleteArticles()
    deleteDialogVisible.value = !deleteDialogVisible.value
}

//再次确认是否销毁的模态框
const handleDestroyTwiceConfirmBtn = () => {
    store.dispatch('searchArticlesModule/destroyArticleById').then(() => {
        asyncQueryArticle()
        deleteDialogVisible.value = !deleteDialogVisible.value
    })
}

defineExpose({
    asyncQueryArticle,
})
</script>

<style lang="less" scoped>
:deep(.el-icon) {
    margin-left: 1px;
}

:deep(.el-col) {
    margin-top: 15px;
    margin-right: 10px;
}
</style>
