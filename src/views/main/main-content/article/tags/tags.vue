<template>
    <div class="tags">
        <kx-card :cardConfig="config">
            <template #header>
                <div class="tags-header">
                    <page-title title="标签管理" />
                    <el-row class="header-row">
                        <el-col
                            :lg="8"
                            :md="12"
                            :sm="12"
                            :xl="8"
                            :xs="18"
                            style="margin-bottom: 15px"
                        >
                            <div>
                                <el-button :icon="Plus" type="primary" @click="handleEditTagDialog">
                                    新增
                                </el-button>
                                <el-button :icon="Delete" type="danger" @click="batchDelete">
                                    批量删除
                                </el-button>
                            </div>
                        </el-col>

                        <el-col :lg="8" :md="12" :sm="18" :xl="8" :xs="24">
                            <div>
                                <el-input
                                    v-model="searchKeywords"
                                    placeholder="请输入标签名"
                                    style="width: 200px; margin-right: 15px"
                                />
                                <el-button
                                    :icon="Search"
                                    type="success"
                                    @click="handleSearchBtnClick"
                                >
                                    搜索
                                </el-button>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </template>

            <template #body>
                <div class="tags-content">
                    <div class="tag-table">
                        <tags-table
                            ref="tagsTableRef"
                            :current-page="currentPage"
                            :current-size="pageSize"
                            :data="tags"
                            :search-keywords="searchKeywords"
                            @handleSelect="handleSelect"
                        />
                    </div>

                    <div class="content-pagination">
                        <kx-pagination
                            :counts="count"
                            @handleWatchCurrent="handleWatchCurrent"
                            @handleWatchSize="handleWatchSize"
                        />
                    </div>
                </div>
            </template>
        </kx-card>
        <el-dialog
            v-model="deleteDialogVisible"
            close-on-press-escape
            title="确认删除所选标签名?"
            width="300px"
        >
            <span class="dialog-footer">
                <el-button @click="handleDeleteDialog">取消</el-button>
                <el-popconfirm
                    :icon="InfoFilled"
                    cancel-button-text="取消"
                    confirm-button-text="确认删除"
                    icon-color="red"
                    title="请再次确认是否删除选中的标签名!"
                    @confirm="handleDeleteTwiceConfirmBtn"
                >
                    <template #reference>
                        <el-button type="primary">确认删除</el-button>
                    </template>
                </el-popconfirm>
            </span>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { KxPagination, TagsTable } from '@/components'
import { Delete, InfoFilled, Plus, Search } from '@element-plus/icons-vue'
import { config } from './kx-card-config/config'
import { computed, ref, watch } from 'vue'
import { ITagsRecordList } from '@/store/article/articles/tags/types'
import { useStore } from '@/store'
import { KxCard, PageTitle } from '@/base-ui/'
import { ElMessage } from 'element-plus'

const store = useStore()
const tagsTableRef = ref<InstanceType<typeof TagsTable>>()

//当前页码
const currentPage = ref(1)
//一页展示的数据
const pageSize = ref(10)

//搜索数据
const searchKeywords = ref('')
//请取数据
const getTags = () => {
    store.dispatch('articleTagsModule/getTags', {
        currentPage: currentPage.value,
        currentSize: pageSize.value,
        keywords: searchKeywords.value ? searchKeywords.value : undefined,
    })
}
//批量删除对话框
const deleteDialogVisible = ref(false)

getTags()
//获取列表信息
const count = computed(() => store.state.articleTagsModule.count)
const tags = computed<ITagsRecordList>(() => {
    return store.state.articleTagsModule.recordList
})

//新增标签
const handleEditTagDialog = () => {
    tagsTableRef.value.handleEditTagDialog()
}
//页数变化
const handleWatchCurrent = (current: number) => {
    currentPage.value = current
}
//每页显示数量变化
const handleWatchSize = (size: number) => {
    pageSize.value = size
}

watch(
    () => currentPage.value,
    () => {
        getTags()
    }
)

watch(
    () => pageSize.value,
    () => {
        getTags()
    }
)

//取消删除对话框
const handleDeleteDialog = () => {
    deleteDialogVisible.value = false
}

//接收删除的id数组
const saveDeleteIdArr = ref<number[]>([])
const handleSelect = (selectionIdArr: number[]) => {
    saveDeleteIdArr.value = selectionIdArr
}
//批量删除按钮
const batchDelete = () => {
    if (saveDeleteIdArr.value.length === 0) {
        ElMessage.warning('未选择!')
    } else {
        deleteDialogVisible.value = true
    }
}
//确认删除
const handleDeleteTwiceConfirmBtn = () => {
    tagsTableRef.value.handleConfirmDeleteBtn(saveDeleteIdArr.value)
    deleteDialogVisible.value = false
}
//搜索
const handleSearchBtnClick = () => {
    getTags()
}
</script>

<style lang="less" scoped>
.header-row {
    display: flex;
    justify-content: space-between;
}

.dialog-footer {
    display: flex;
    justify-content: flex-end;
}
</style>

<style></style>
