<template>
    <div class="md-editor">
        <keep-alive>
            <md-editor
                v-model="textContent"
                :toolbarsExclude="toolbarsExclude"
                :prettier="isPrettier"
            />
        </keep-alive>
    </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, watch, watchEffect } from 'vue'
import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'

const emits = defineEmits(['handleTextContent'])

//主体内容
const textContent = ref('test')

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
