<template>
    <div class="words-header">
        <kx-card :isShow="true">
            <template #body>
                <page-title title="留言管理"></page-title>
                <div class="articles-content">
                    <el-tabs class="tab-pane" tab-position="left">
                        <el-tab-pane label="网站信息" lazy><site-info /></el-tab-pane>
                        <el-tab-pane label="社交信息" lazy><social-info /></el-tab-pane>
                        <el-tab-pane label="其它信息" lazy><other-info /></el-tab-pane>
                    </el-tabs>
                </div>
            </template>
        </kx-card>
    </div>
</template>
<script lang="ts" setup>
import { KxCard, PageTitle } from '@/base-ui/index'
import { OtherInfo, SiteInfo, SocialInfo } from './content'
</script>

<style lang="less" scoped>
.tab-pane {
}
</style>
