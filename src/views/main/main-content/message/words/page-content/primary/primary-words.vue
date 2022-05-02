<template>
    <div class="primary-comment">
        <div class="primary-comment">
            <message-header
                :placeholder="placeholder"
                @handleBatchDelete="handleBatchDelete"
                @handleBatchPass="handleBatchPass"
                @handleSearchBtn="handleCommentSearchBtn"
            />
        </div>
        <div class="primary-content">
            <words-content
                :table-value="wordsPrimaryInfo"
                @handleDeleteComment="handleDeleteComment"
                @handleSelectionChange="handleSelectionChange"
            />
        </div>
        <div class="all-pagination">
            <kx-pagination
                :counts="primaryCounts"
                @handleWatchCurrent="handleWatchCurrent"
                @handleWatchSize="handleWatchSize"
            />
        </div>
    </div>
    <!--删除对话框-->
    <el-dialog
        v-model="deleteDialogVisible"
        close-on-press-escape
        title="确认删除所选文章?"
        width="30%"
    >
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="cancelDelete">取消</el-button>
                <el-popconfirm
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
            </span>
        </template>
    </el-dialog>
    <!--通过对话框-->
    <el-dialog
        v-model="passDialogVisible"
        close-on-press-escape
        title="确认将所选评论通过审核?"
        width="30%"
    >
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="cancelPass">取消</el-button>
                <el-button type="primary" @click="handlePassConfirmBtn">确认通过</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { KxPagination, MessageHeader, WordsContent } from '@/components'
import { useStore } from '@/store'
import { IMessageParams } from '@/views/main/main-content/message/comment/page-comment'
import { computed, onMounted, ref } from 'vue'

import { InfoFilled } from '@element-plus/icons-vue'
import { IWordsRecordList } from '@/store/message/words/types'

const store = useStore()
const placeholder = '请输入评论来源'

//搜索参数
const params = ref<IMessageParams>({})

//发送搜索请求
const getWords = (payload: IMessageParams) => {
    params.value = payload
    params.value.isReview = 1
    store.dispatch('wordsModule/getWords', params.value)
}
const wordsPrimaryInfo = computed<IWordsRecordList>(() => store.state.wordsModule.recordList)
const primaryCounts = computed<number>(() => store.state.wordsModule.count)

onMounted(() => {
    getWords({})
})

//评论搜索按钮emit
const handleCommentSearchBtn = (newValue: any) => {
    getWords(newValue)
}
//监听每页长度变化
const handleWatchSize = (newSize: number) => {
    params.value.currentSize = newSize
    getWords(params.value)
}
//监听当前页数
const handleWatchCurrent = (newCurrent: number) => {
    params.value.currentPage = newCurrent
    getWords(params.value)
}
//监听删除按钮点击
const handleDeleteComment = (selectId: number) => {
    store.dispatch('wordsModule/deleteWords', [selectId]).then(() => {
        getWords(params.value)
    })
}
//监听多选
const selections = ref<number[]>([])
const handleSelectionChange = (selectComments: IWordsRecordList[]) => {
    selections.value = []
    selectComments.forEach((selectComment) => {
        selections.value.push(selectComment.id)
    })
    console.log(selections.value)
}
//监听批量删除
const deleteDialogVisible = ref(false)
const handleBatchDelete = () => {
    deleteDialogVisible.value = true
}
//取消删除
const cancelDelete = () => {
    deleteDialogVisible.value = false
}
//确认批量删除
const handleDeleteTwiceConfirmBtn = () => {
    store.dispatch('wordsModule/deleteWords', selections.value).then(() => {
        deleteDialogVisible.value = false
        getWords(params.value)
    })
}

//点击批量通过按钮-对话框弹出
const passDialogVisible = ref(false)
const handleBatchPass = () => {
    passDialogVisible.value = true
}
//取消通过
const cancelPass = () => {
    passDialogVisible.value = false
}
const handlePassConfirmBtn = () => {
    store
        .dispatch('wordsModule/passWords', selections.value)
        .then(() => {
            passDialogVisible.value = false
            getWords(params.value)
        })
        .catch(() => {
            passDialogVisible.value = false
        })
}
</script>

<style lang="less" scoped></style>
