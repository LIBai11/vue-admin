<template>
    <div class="map-tag-charts">
        <el-row :gutter="15">
            <el-col :lg="14" :md="12" :xs="24">
                <kx-card :title="usersMapTitle">
                    <template #body>
                        <map-echart :mapData="usersAreaList"></map-echart>
                    </template>
                </kx-card>
            </el-col>
            <el-col :lg="10" :md="12" :xs="24">
                <kx-card :title="tagTitle">
                    <template #body>
                        <tag-cloud :tagData="tags"></tag-cloud>
                    </template>
                </kx-card>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import { KxCard } from '@/base-ui/index'
import { MapEchart, TagCloud } from '@/components/index'
import { useStore } from '@/store'
import { computed } from 'vue'

const store = useStore()
const usersMapTitle = '用户地域分布'
const tagTitle = '文章标签统计'

//请求到用户分布数据
store.dispatch('userModule/getUserAreaList', 1)
const usersAreaList = computed(() => {
    return store.state.userModule.userAreaList
})

const tags = computed(() => {
    return store.state.homeModule.tagDTOList.map((item: any) => {
        return { id: item.id, name: item.tagName }
    })
})
</script>

<style scoped lang="less">
.el-card {
    margin-bottom: 10px;
}
</style>
