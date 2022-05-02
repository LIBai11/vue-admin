<template>
    <div class="header">
        <el-row :gutter="15" justify="space-between">
            <el-col :lg="8" :md="8" :sm="8" :xl="8" :xs="18">
                <div>
                    <el-button
                        v-if="props.deleteBtn"
                        style="margin-right: 10px; margin-bottom: 5px"
                        type="danger"
                        @click="batchDelete"
                    >
                        批量删除
                    </el-button>
                    <el-button
                        v-if="props.passBtn"
                        style="margin-left: 0 !important ; margin-bottom: 5px"
                        type="success"
                        @click="batchPass"
                    >
                        批量通过
                    </el-button>
                </div>
            </el-col>

            <el-col :lg="11" :md="11" :sm="11" :xl="10" :xs="18">
                <div>
                    <el-select
                        v-if="props.options"
                        v-model="modelSelect"
                        :placeholder="props.placeholder"
                        class="source"
                        clearable
                        @change="sourceChange"
                    >
                        <el-option
                            v-for="source in sources"
                            :key="source.value"
                            :label="source.value"
                            :value="source.label"
                        />
                    </el-select>

                    <el-input
                        v-model="nameValue"
                        class="source"
                        placeholder="请输入用户昵称"
                        @change="nameChange"
                    />

                    <el-button style="margin-top: -3px" type="primary" @click="searchComments">
                        搜索
                    </el-button>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps, ref, watch, withDefaults } from 'vue'

interface IMessageHeader {
    placeholder?: string
    isReview?: number
    options?: boolean
    deleteBtn?: boolean
    passBtn?: boolean
}

const props = withDefaults(defineProps<IMessageHeader>(), {
    placeholder: '请输入来源',
    options: true,
    deleteBtn: true,
    passBtn: true,
})

const emits = defineEmits(['handleSearchBtn', 'handleBatchDelete', 'handleBatchPass'])
const sources = [
    {
        value: '文章',
        label: 1,
    },
    {
        value: '友链',
        label: 2,
    },
    {
        value: '说说',
        label: 3,
    },
]
//输入框中的值
const nameValue = ref()
//select选中的值
const modelSelect = ref()
//搜索数据
const searchPayload = ref({
    keywords: '',
    type: '',
})

//输入框值改变触发
const nameChange = () => {
    searchPayload.value.keywords = nameValue.value
}
//选择框选项改变
const sourceChange = (newSource: any) => {
    searchPayload.value.type = newSource
    // console.log(newSource)
}
watch(
    () => modelSelect.value,
    () => {
        emits('handleSearchBtn', searchPayload.value)
    }
)
//点击搜索按钮
const searchComments = () => {
    emits('handleSearchBtn', searchPayload.value)
}
//点击批量删除按钮
const batchDelete = () => {
    emits('handleBatchDelete')
}
//点击批量通过按钮
const batchPass = () => {
    emits('handleBatchPass')
}
</script>

<style lang="less" scoped>
.source {
    margin-right: 15px;
    width: 190px;
    margin-bottom: 10px;
}
</style>
