<template>
    <div class="login">
        <div class="bac">
            <login-panel></login-panel>
        </div>
    </div>
</template>

<script setup lang="ts">
import LoginPanel from './loginPanel/login-panel.vue'
</script>

<style scoped lang="less">
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
