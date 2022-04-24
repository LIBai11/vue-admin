<template>
    <div class="articles-search">
        <el-form>
            <el-form-item>
                <el-row :gutter="15">
                    <el-col :xs="0" :sm="6" :md="4" :lg="3" :xl="4">
                        <el-button type="danger" :icon="Delete" round>批量删除</el-button>
                    </el-col>
                    <el-col :xs="24" :sm="6" :md="4" :lg="4" :xl="4">
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
                    <el-col :xs="24" :sm="6" :md="4" :lg="4" :xl="4">
                        <el-form-item>
                            <el-select
                                v-model="categoryId"
                                @change="handleChangeCategory"
                                clearable
                                placeholder="请选择分类"
                            >
                                <el-option
                                    v-for="category in categoryList"
                                    :key="category.categoryName"
                                    :label="category.categoryName"
                                    :value="category.id"
                                />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="6" :md="4" :lg="4" :xl="4">
                        <el-form-item>
                            <el-select
                                v-model="tagId"
                                @change="handleChangeTag"
                                clearable
                                placeholder="请选择标签"
                            >
                                <el-option
                                    v-for="tag in tagsList"
                                    :key="tag.tagName"
                                    :label="tag.tagName"
                                    :value="tag.id"
                                />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="6" :md="4" :lg="4" :xl="4">
                        <el-form-item>
                            <el-input
                                v-model="articleTitle"
                                placeholder="请输入文章名"
                                style="width: 200px"
                                @input="handleChangeArticleTitle"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="0" :sm="6" :md="4" :lg="3" :xl="4">
                        <el-button type="success" :icon="Search" round>搜索</el-button>
                    </el-col>
                    <el-col :xs="6" :sm="0" :md="0" :lg="0" :xl="0">
                        <el-button type="danger" :icon="Delete" round />
                    </el-col>
                    <el-col :xs="6" :sm="0" :md="0" :lg="0" :xl="0">
                        <el-button type="success" :icon="Search" round />
                    </el-col>
                </el-row>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import { computed, defineProps, onMounted, ref } from 'vue'
import { useStore } from '@/store'
import { Delete, Search } from '@element-plus/icons-vue'
import { ICategoryState, ITagState } from '@/store/article/publish/search/types'

const store = useStore()
const props = defineProps<{
    status?: number | undefined
    isDelete?: number | undefined
}>()
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
const asyncQueryArticle = () => {
    store.dispatch('searchArticlesModule/queryArticles', {
        tagId: tagId.value,
        categoryId: categoryId.value,
        typeId: typeId.value,
        articleTitle: articleTitle.value,
        status: props.status,
        isDelete: props.isDelete,
    })
}
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
</script>

<style scoped lang="less">
:deep(.el-icon) {
    margin-left: 1px;
}

:deep(.el-col) {
    margin-top: 15px;
    margin-right: 10px;
}
</style>
