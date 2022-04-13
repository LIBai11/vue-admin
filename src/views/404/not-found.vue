<template>
    <div class="not-found">
        <h1 class="title">你要找的页面没有找到</h1>
    </div>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped>
.not-found {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-image: url('~@/assets/img/404.jpg');
}

.title {
    color: white;
}
</style>
