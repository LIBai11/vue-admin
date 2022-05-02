<template>
    <div class="md-editor" style="min-width: 700px">
        <keep-alive>
            <md-editor
                v-model="textContent"
                :prettier="isPrettier"
                :toolbarsExclude="toolbarsExclude"
                placeholder="请在此输入文章内容"
                showCodeRowNumber
            />
        </keep-alive>
    </div>
</template>

<script lang="ts" setup>
import { defineEmits, ref, watchEffect } from 'vue'
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

watchEffect(() => {
    handleTextContent()
})
</script>

<style lang="less" scoped></style>
