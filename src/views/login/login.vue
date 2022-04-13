<template>
    <div class="login">
        <div class="bac">
            <login-panel></login-panel>
        </div>
    </div>
</template>

<script lang="ts" setup>
import LoginPanel from './loginPanel/login-panel.vue'
</script>

<style lang="less" scoped>
.bac {
    display: flex;
    justify-content: end;
    align-items: center;
    margin-top: 50px;
    margin-right: 50px;
}

.login {
    height: 100vh;
    background: url('~@/assets/img/bac.jpg') no-repeat;
    overflow: hidden;
    min-height: 500px;
}
</style>
