<template>
    <div class="md-editor" style="min-width: 700px">
        <keep-alive>
            <md-editor
                v-model="textContent"
                :toolbarsExclude="toolbarsExclude"
                :prettier="isPrettier"
                showCodeRowNumber
                placeholder="请在此输入文章内容"
            />
        </keep-alive>
    </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, watch, watchEffect, computed } from 'vue'
import { useStore } from '@/store'
import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'

const store = useStore()
const emits = defineEmits(['handleTextContent'])

//主体内容
const textContent = computed(() => store.state.editArticleModule.articleContent)

//自定义md编辑器工具栏(不展示)
//是否启用prettier
const toolbarsExclude = ['github', 'save']
const isPrettier = ref(true)

//给父组件传值
const handleTextContent = () => {
    emits('handleTextContent', textContent.value)
}

watchEffect(() => {
    handleTextContent()
})
</script>

<style scoped lang="less"></style>
