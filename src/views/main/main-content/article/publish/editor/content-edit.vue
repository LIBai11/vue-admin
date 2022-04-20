<template>
    <div class="md-editor">
        <md-editor
            v-model="textContent"
            :toolbarsExclude="toolbarsExclude"
            :prettier="isPrettier"
        />
    </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, watch } from 'vue'
import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'

const emits = defineEmits(['handleTextContent'])

//主体内容
const textContent = ref('')

//自定义md编辑器工具栏(不展示)
//是否启用prettier
const toolbarsExclude = ['github', 'save']
const isPrettier = ref(true)

//给父组件传值
const handleTextContent = () => {
    emits('handleTextContent', textContent.value)
}

watch(textContent, () => {
    handleTextContent()
})
</script>

<style scoped lang="less"></style>
