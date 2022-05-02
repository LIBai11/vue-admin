<template>
    <div class="categories">
        <kx-card :cardConfig="config">
            <template #header>
                <div class="categories-header">
                    <page-title title="分类管理" />
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
                                <el-button
                                    :icon="Plus"
                                    type="primary"
                                    @click="handleEditCategoriesDialog"
                                >
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
                                    placeholder="请输入分类名"
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
                <div class="categories-content">
                    <div class="category-table">
                        <categories-table
                            ref="categoriesTableRef"
                            :current-page="currentPage"
                            :current-size="pageSize"
                            :data="categories"
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
            title="确认删除所选分类名?"
            width="300px"
        >
            <span class="dialog-footer">
                <el-button @click="handleDeleteDialog">取消</el-button>
                <el-popconfirm
                    :icon="InfoFilled"
                    cancel-button-text="取消"
                    confirm-button-text="确认删除"
                    icon-color="red"
                    title="请再次确认是否删除选中的分类名!"
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
import { CategoriesTable, KxPagination } from '@/components'
import { Delete, InfoFilled, Plus, Search } from '@element-plus/icons-vue'
import { config } from './kx-card-config/config'
import { computed, ref, watch } from 'vue'
import { IRecordList } from '@/store/article/articles/categories/types'
import { useStore } from '@/store'
import { KxCard, PageTitle } from '@/base-ui/'
import { ElMessage } from 'element-plus'

const store = useStore()
const categoriesTableRef = ref<InstanceType<typeof CategoriesTable>>()

//当前页码
const currentPage = ref(1)
//一页展示的数据
const pageSize = ref(10)

//搜索数据
const searchKeywords = ref('')
//请取数据
const getCategories = () => {
    store.dispatch('articleCategoriesModule/getCategories', {
        currentPage: currentPage.value,
        currentSize: pageSize.value,
        keywords: searchKeywords.value ? searchKeywords.value : undefined,
    })
}
//批量删除对话框
const deleteDialogVisible = ref(false)

getCategories()
//获取列表信息
const count = computed(() => store.state.articleCategoriesModule.count)
const categories = computed<IRecordList>(() => {
    return store.state.articleCategoriesModule.recordList
})

const handleEditCategoriesDialog = () => {
    categoriesTableRef.value.handleEditCategoriesDialog()
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
        getCategories()
    }
)

watch(
    () => pageSize.value,
    () => {
        getCategories()
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
    categoriesTableRef.value.handleConfirmDeleteBtn(saveDeleteIdArr.value)
    deleteDialogVisible.value = false
}
//搜索
const handleSearchBtnClick = () => {
    getCategories()
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

<style>
.el-dialog__wrapper .dialog-fade-enter-active {
    -ms-animation: none;
}

.el-dialog__wrapper .dialog-fade-leave-active {
    -ms-animation: none;
}
</style>
