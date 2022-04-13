<template>
    <div>
        <n-loading-bar-provider>
            <n-button type="info" @click="handleShowLoadingBar"> useLoadingBar</n-button>
        </n-loading-bar-provider>
    </div>
</template>

<script lang="ts" setup>
import { LoadingBarProviderInst, useLoadingBar } from 'naive-ui'

const loadingBar = useLoadingBar() as LoadingBarProviderInst
const handleShowLoadingBar = () => {
    loadingBar.start()
}
</script>
