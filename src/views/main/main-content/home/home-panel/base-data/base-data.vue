<template>
    <div class="base-data">
        <el-row :gutter="10">
            <el-col :lg="6" :md="12" :sm="12" :xs="24">
                <el-card
                    shadow="always"
                    :body-style="{ display: 'flex', justifyContent: 'space-between' }"
                >
                    <div>
                        <el-icon :size="60" color="#5FBC21">
                            <histogram />
                        </el-icon>
                    </div>
                    <div class="data-div">
                        <div>访问量</div>
                        <div style="color: #000">{{ viewCounts }}</div>
                    </div>
                </el-card>
            </el-col>
            <el-col :lg="6" :md="12" :sm="12" :xs="24">
                <el-card
                    shadow="always"
                    :body-style="{ display: 'flex', justifyContent: 'space-between' }"
                >
                    <el-icon :size="60" color="#FF0000">
                        <user-filled />
                    </el-icon>
                    <div class="data-div">
                        <div>用户量</div>
                        <div style="color: #000">{{ userCount }}</div>
                    </div>
                </el-card>
            </el-col>
            <el-col :lg="6" :md="12" :sm="12" :xs="24">
                <el-card
                    shadow="always"
                    :body-style="{ display: 'flex', justifyContent: 'space-between' }"
                >
                    <el-icon :size="60" color="#FFD663">
                        <document-checked />
                    </el-icon>
                    <div class="data-div">
                        <div>文章量</div>
                        <div style="color: #000">{{ articleCount }}</div>
                    </div>
                </el-card>
            </el-col>
            <el-col :lg="6" :md="12" :sm="12" :xs="24">
                <el-card
                    shadow="always"
                    :body-style="{ display: 'flex', justifyContent: 'space-between' }"
                >
                    <el-icon :size="60" color="blue">
                        <chat-dot-square />
                    </el-icon>
                    <div class="data-div">
                        <div>留言量</div>
                        <div style="color: #000">{{ messageCount }}</div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts" setup>
import { useStore } from '@/store'
import useState from '@/utils/useState'

const store = useStore()
store.dispatch('homeModule/getHomeBaseData')

const { viewCounts, userCount, articleCount, messageCount } = useState({
    viewCounts: (state: any) => state.homeModule.viewsCount,
    userCount: (state: any) => state.homeModule.userCount,
    articleCount: (state: any) => state.homeModule.articleCount,
    messageCount: (state: any) => state.homeModule.messageCount,
})
</script>

<style lang="less" scoped>
.base-data {
    width: 100%;
}

.data {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 23%;
    min-width: 200px;
    height: 100px;
    background-color: white;
}

.data-div {
    margin-left: 20px;
    font-size: 20px;
    color: #aaabaa;
}
.cards-header {
}
.el-card {
    margin-bottom: 10px;
}
</style>
