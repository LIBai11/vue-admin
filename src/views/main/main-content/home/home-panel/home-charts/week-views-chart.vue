<template>
    <div v-once class="week-views">
        <el-row :gutter="10">
            <el-col :span="24">
                <kx-card :title="weekViewTitle">
                    <template #body>
                        <line-echart :lineData="lineData"></line-echart>
                    </template>
                </kx-card>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts" setup>
import { KxCard } from '@/base-ui'
import { LineEchart } from '@/components/index.ts'
import { computed } from 'vue'
import { useStore } from '@/store'
import { IUniqueViewDTOList } from '@/components/page-echarts/types'

const store = useStore()
const weekViewTitle = '一周访问量'

const lineData = computed(() => {
    const data: any[] = [[], []]
    store.state.homeModule.uniqueViewDTOList.forEach((key: IUniqueViewDTOList) => {
        data[0].push(key.day)
        data[1].push(key.viewsCount)
    })
    return data
})
</script>

<style lang="less" scoped>
.week-views {
    background-color: white;
    width: 100%;
    height: auto;
    margin-top: 10px;
    margin-bottom: 20px;
}
</style>
