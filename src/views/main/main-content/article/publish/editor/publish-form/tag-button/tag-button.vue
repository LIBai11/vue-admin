<template>
    <div class="tab-btn">
        <el-popover
            :disabled="isPopActive"
            :width="400"
            placement="right"
            title="请选择标签"
            transition="el-zoom-in-top"
            trigger="click"
        >
            <template #reference>
                <div v-if="tagsIn.length !== 0">
                    <el-tag
                        v-for="tag in tagsIn"
                        :key="tag"
                        class="tag"
                        closable
                        disable-transitions
                        effect="light"
                        hit
                        round
                        size="large"
                        type="warning"
                        @close="handleCloseTag(tag)"
                    >
                        {{ tag.tagName }}
                    </el-tag>
                    <el-tag
                        v-if="tagsIn.length < 3"
                        checked
                        class="add-tag"
                        effect="light"
                        size="default"
                        type="success"
                    >
                        <n-icon>
                            <add-circle />
                        </n-icon>
                    </el-tag>
                </div>
                <div v-if="tagsIn.length < 2">
                    <n-button round secondary strong type="primary">
                        <template #icon>
                            <n-icon>
                                <pricetags />
                            </n-icon>
                        </template>
                        添加标签
                    </n-button>
                </div>
            </template>
            <el-row>
                <el-col :lg="24" :md="24" :sm="24" :xl="24" :xs="12">
                    <tag-form :tagData="props.tagData" @handleClickSelect="handleCateChange" />
                </el-col>
            </el-row>
        </el-popover>
    </div>
</template>

<script lang="ts" setup>
import TagForm from './tag-form.vue'
import { AddCircle, Pricetags } from '@vicons/ionicons5'
import { defineEmits, defineProps, ref } from 'vue'
import { ITagState } from '@/store/article/publish/search/types'

//接收父组件的数据
const props = defineProps<{
    tagData: ITagState[]
}>()
//向父组件传值
const emits = defineEmits(['pushTagsData'])
//popover是否可用
const isPopActive = ref(false)

//已添加的category的name和id
const tagsIn = ref<ITagState[]>([])

//通过emit改变btn
const handleCateChange = (hasTags: ITagState[]) => {
    tagsIn.value = hasTags
    // console.log(tagsIn.value.length)
    emits('pushTagsData', tagsIn.value)
    if (tagsIn.value.length === 3) {
        isPopActive.value = true
    }
}

//按钮点击事件
// const handleTagsBtn = () => {
//     console.log(123)
// }
//移除标签
const handleCloseTag = (tag: ITagState) => {
    const removeTagIndex = tagsIn.value.indexOf(tag)
    tagsIn.value.splice(removeTagIndex, 1)
    emits('pushTagsData', tagsIn.value)
    isPopActive.value = false
}
</script>

<style lang="less" scoped>
.tag {
    margin-right: 15px;
}

.add-tag {
    position: absolute;
    top: 5px;
    border-radius: 50%;
    font-size: 20px;
    cursor: pointer;
}
</style>
