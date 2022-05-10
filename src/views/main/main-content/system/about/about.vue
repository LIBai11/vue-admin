<template>
    <div class="about">
        <kx-card :is-show="true">
            <template #body>
                <page-title title="关于我" />
                <md-editor
                    v-model="textContent"
                    :prettier="isPrettier"
                    :toolbarsExclude="toolbarsExclude"
                    placeholder="请在此输入内容"
                    showCodeRowNumber
                />
                <div class="post-btn">
                    <el-button color="#2FAB20" @click="postMineIntro">提交修改</el-button>
                </div>
            </template>
        </kx-card>
    </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue'
import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { KxCard, PageTitle } from '@/base-ui'
import { useStore } from '@/store'
import { ElMessage } from 'element-plus'

const store = useStore()
//主体内容
const textContent = ref('')

//自定义md编辑器工具栏(不展示)
//是否启用prettier
const toolbarsExclude = ['github', 'save']
const isPrettier = ref(true)

/**
 * 获取数据
 */
const getMineIntro = () => {
    store.dispatch('aboutModule/getMineIntro')
}
getMineIntro()
const mineIntro = computed<string>(() => store.state.aboutModule.data)
watch(
    () => mineIntro.value,
    () => {
        textContent.value = mineIntro.value
    },
    { immediate: true }
)

/**
 * 提交修改
 */
const postMineIntro = () => {
    if (!textContent.value) ElMessage.warning('请输入后再提交')
    else
        store.dispatch('aboutModule/updateMine', { aboutContent: textContent.value }).then(() => {
            getMineIntro()
        })
}
</script>

<style lang="less" scoped>
.post-btn {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
}
</style>
