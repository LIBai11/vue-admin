<template>
    <div class="base-echarts">
        <div ref="echartDivRef" :style="{ width: width, height: height }"></div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, withDefaults, defineProps, watchEffect } from 'vue'
import { EChartsOption } from 'echarts'
import useEchart from '@/utils/use-echart'

const echartDivRef = ref<HTMLElement>()

const props = withDefaults(
    // eslint-disable-next-line no-undef
    defineProps<{
        width?: string
        height?: string
        options: EChartsOption
    }>(),
    {
        width: '100%',
        height: '360px',
    }
)
onMounted(() => {
    //非空断言,排除null和undefined
    const { setOptions } = useEchart(echartDivRef.value!)
    watchEffect(() => {
        setOptions(props.options)
    })
})
</script>

<style scoped lang="less"></style>
