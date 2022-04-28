<template>
    <div class="articles-content">
        <el-table
            :data="articleList"
            border
            stripe
            fit
            @selection-change="handleSelectColumn"
            @select-all="handleSelectColumn"
        >
            <el-table-column type="selection" width="50" align="center"></el-table-column>
            <el-table-column prop="articleCover" label="文章封面" align="center" width="220">
                <template #default="scope">
                    <div>
                        <el-image
                            :preview-src-list="[scope.row.articleCover]"
                            :src="scope.row.articleCover"
                            preview-teleported
                            hide-on-click-modal
                        />
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                prop="articleTitle"
                label="标题"
                show-overflow-tooltip
                align="center"
            ></el-table-column>
            <el-table-column
                prop="categoryName"
                label="分类"
                width="100"
                align="center"
            ></el-table-column>
            <el-table-column prop="tagDTOList" label="标签" width="95" align="center">
                <template #default="scope">
                    <span>
                        <el-tag v-for="tag in scope.row.tagDTOList" :key="tag">
                            {{ tag.tagName }}
                        </el-tag>
                    </span>
                </template>
            </el-table-column>
            <el-table-column
                prop="viewsCount"
                label="浏览量"
                width="80"
                align="center"
            ></el-table-column>
            <el-table-column
                prop="likeCount"
                label="点赞量"
                width="80"
                align="center"
            ></el-table-column>
            <el-table-column
                prop="type"
                label="类型"
                width="80"
                :formatter="formatType"
                align="center"
            >
                <template #default="scope">
                    {{ formatType(scope.row.type) }}
                </template>
            </el-table-column>
            <el-table-column prop="createTime" label="发表时间" width="140" align="center">
                <template #default="scope">
                    <span>{{ $filters.formatTime(scope.row.createTime) }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="isTop" label="置顶" width="85" align="center">
                <template #default="scope">
                    <el-switch
                        v-model="scope.row.isTop"
                        :active-value="1"
                        :inactive-value="0"
                        active-color="#13ce66"
                        @change="handleChangeTop(scope.row)"
                    ></el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
                <!--非删除界面-->
                <template #default="scope" v-if="!props.destroyBtn">
                    <el-popconfirm
                        confirm-button-text="确认"
                        cancel-button-text="取消"
                        :icon="InfoFilled"
                        icon-color="red"
                        title="确认删除这篇文章吗?"
                        @confirm="handleConfirmDeleteBtn(scope.row.id)"
                    >
                        <template #reference>
                            <el-button
                                class="delete-btn"
                                type="danger"
                                size="small"
                                :icon="Delete"
                                round
                            />
                        </template>
                    </el-popconfirm>

                    <el-button
                        type="success"
                        size="small"
                        :icon="Edit"
                        round
                        @click="handleEditArticle(scope.row.id)"
                    />
                </template>
                <!--删除界面-->
                <template #default="scope" v-else>
                    <el-popconfirm
                        confirm-button-text="确认"
                        cancel-button-text="取消"
                        :icon="InfoFilled"
                        icon-color="red"
                        title="确认永久删除这篇文章吗?这将不可恢复!"
                        @confirm="handleDestroyBtn(scope.row.id)"
                    >
                        <template #reference>
                            <el-button
                                class="delete-btn"
                                type="danger"
                                size="small"
                                :icon="Delete"
                                round
                            />
                        </template>
                    </el-popconfirm>
                    <!--编辑按钮-->
                    <el-popconfirm
                        confirm-button-text="确认"
                        cancel-button-text="取消"
                        :icon="InfoFilled"
                        icon-color="red"
                        title="确认恢复这篇文章吗?"
                        @confirm="handleRecoverBtn(scope.row.id)"
                    >
                        <template #reference>
                            <el-button type="success" size="small" :icon="Select" round />
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex'
import { computed, defineEmits, defineProps, withDefaults } from 'vue'
import { IRecordList } from '@/store/article/articles/search/types'
import { Delete, Edit, InfoFilled, Select } from '@element-plus/icons-vue'
import router from '@/router'

const emits = defineEmits(['handleDelete'])
interface IDestroyBtn {
    destroyBtn?: boolean
}
const props = withDefaults(defineProps<IDestroyBtn>(), {
    destroyBtn: false,
})

const store = useStore()
const articleList = computed<IRecordList>(() => store.state.searchArticlesModule.recordList)

const formatType = (type: number) => {
    if (type === 1) {
        return '原创'
    } else if (type === 2) {
        return '转载'
    } else {
        return '翻译'
    }
}
//处理选中index
const handleSelectColumn = (row: any) => {
    const selectArr: number[] = []
    row.forEach((item: IRecordList) => {
        selectArr.push(item.id)
    })
    store.commit('noAsyncModule/changeDeleteIdArr', selectArr)
}

//置顶状态改变
const handleChangeTop = (articleData: any) => {
    let newTop = 1
    if (articleData.isTop === 1) {
        newTop = 1
    } else {
        newTop = 0
    }
    store.dispatch('searchArticlesModule/changeArticleTop', {
        id: articleData.id,
        isTop: newTop,
    })
}
//确认删除文章
const handleConfirmDeleteBtn = (articleId: number) => {
    store.dispatch('searchArticlesModule/deleteArticleById', articleId).then(() => {
        emits('handleDelete')
    })
}
//销毁文章
const handleDestroyBtn = (articleId: number) => {
    store.dispatch('searchArticlesModule/destroyArticleById', articleId).then(() => {
        emits('handleDelete')
    })
}

//恢复文章
const handleRecoverBtn = (articleId: number) => {
    store.dispatch('searchArticlesModule/recoverArticleById', articleId).then(() => {
        emits('handleDelete')
    })
}

//编辑文章
const handleEditArticle = (articleId: number) => {
    store.dispatch('editArticleModule/getArticleDetails', articleId).then(() => {
        router.push('/article/change')
    })
}
</script>

<style scoped lang="less">
.delete-btn {
    margin-left: 13px;
}
:deep(.el-tag) {
    margin: 3px;
}
</style>
