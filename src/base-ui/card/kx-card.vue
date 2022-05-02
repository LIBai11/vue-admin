<template>
    <el-card
        ref="bar"
        :body-style="props.cardConfig?.bodyStyle"
        :shadow="props.cardConfig?.shadow"
        class="box-card"
    >
        <template #header>
            <div class="card-header">
                <span>{{ title }}</span>
                <slot name="header"></slot>
            </div>
        </template>
        <div>
            <slot name="body"></slot>
        </div>
    </el-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { IkxCard } from '@/views/main/main-content/home/home-panel/base-data/types'

// eslint-disable-next-line no-undef
const props = defineProps<{
    title?: string
    cardConfig?: IkxCard
}>()
const bar = ref()
// console.log(bar)
const title = ref(props.title)
// console.log(cardConfig.value)
</script>

<style lang="less" scoped></style>
