<template>
    <div class="articles-content">
        <el-table
            :data="articleList"
            border
            fit
            stripe
            @selection-change="handleSelectColumn"
            @select-all="handleSelectColumn"
        >
            <el-table-column align="center" type="selection" width="50"></el-table-column>
            <el-table-column align="center" label="文章封面" prop="articleCover" width="220">
                <template #default="scope">
                    <div>
                        <el-image
                            :preview-src-list="[scope.row.articleCover]"
                            :src="scope.row.articleCover"
                            hide-on-click-modal
                            preview-teleported
                        />
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                label="标题"
                prop="articleTitle"
                show-overflow-tooltip
            ></el-table-column>
            <el-table-column
                align="center"
                label="分类"
                prop="categoryName"
                width="100"
            ></el-table-column>
            <el-table-column align="center" label="标签" prop="tagDTOList" width="95">
                <template #default="scope">
                    <span>
                        <el-tag v-for="tag in scope.row.tagDTOList" :key="tag">
                            {{ tag.tagName }}
                        </el-tag>
                    </span>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                label="浏览量"
                prop="viewsCount"
                width="80"
            ></el-table-column>
            <el-table-column
                align="center"
                label="点赞量"
                prop="likeCount"
                width="80"
            ></el-table-column>
            <el-table-column
                :formatter="formatType"
                align="center"
                label="类型"
                prop="type"
                width="80"
            >
                <template #default="scope">
                    {{ formatType(scope.row.type) }}
                </template>
            </el-table-column>
            <el-table-column align="center" label="发表时间" prop="createTime" width="140">
                <template #default="scope">
                    <span>{{ $filters.formatTime(scope.row.createTime) }}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="置顶" prop="isTop" width="85">
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
            <el-table-column align="center" label="操作">
                <!--非删除界面-->
                <template v-if="!props.destroyBtn" #default="scope">
                    <el-popconfirm
                        :icon="InfoFilled"
                        cancel-button-text="取消"
                        confirm-button-text="确认"
                        icon-color="red"
                        title="确认删除这篇文章吗?"
                        @confirm="handleConfirmDeleteBtn(scope.row.id)"
                    >
                        <template #reference>
                            <el-button
                                :icon="Delete"
                                class="delete-btn"
                                round
                                size="small"
                                type="danger"
                            />
                        </template>
                    </el-popconfirm>

                    <el-button
                        :icon="Edit"
                        round
                        size="small"
                        type="success"
                        @click="handleEditArticle(scope.row.id)"
                    />
                </template>
                <!--删除界面-->
                <template v-else #default="scope">
                    <el-popconfirm
                        :icon="InfoFilled"
                        cancel-button-text="取消"
                        confirm-button-text="确认"
                        icon-color="red"
                        title="确认永久删除这篇文章吗?这将不可恢复!"
                        @confirm="handleDestroyBtn(scope.row.id)"
                    >
                        <template #reference>
                            <el-button
                                :icon="Delete"
                                class="delete-btn"
                                round
                                size="small"
                                type="danger"
                            />
                        </template>
                    </el-popconfirm>
                    <!--编辑按钮-->
                    <el-popconfirm
                        :icon="InfoFilled"
                        cancel-button-text="取消"
                        confirm-button-text="确认"
                        icon-color="red"
                        title="确认恢复这篇文章吗?"
                        @confirm="handleRecoverBtn(scope.row.id)"
                    >
                        <template #reference>
                            <el-button :icon="Select" round size="small" type="success" />
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script lang="ts" setup>
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

<style lang="less" scoped>
.delete-btn {
    margin-left: 13px;
}

:deep(.el-tag) {
    margin: 3px;
}
</style>
