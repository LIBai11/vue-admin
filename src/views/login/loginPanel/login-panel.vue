<template>
    <div class="login-panel">
        <div class="title">
            <span>BLOG管理员登陆</span>
        </div>
        <div class="login-form">
            <n-form ref="loginFormRef" :model="loginData" :rules="loginRules">
                <n-form-item label="用户名" path="username">
                    <n-input
                        v-model:value="loginData.username"
                        class="login-username"
                        placeholder="用户名"
                        round
                    >
                        <template #prefix>
                            <n-icon :component="PersonOutline" />
                        </template>
                    </n-input>
                </n-form-item>
                <n-form-item label="密码" path="password">
                    <n-input
                        v-model:value="loginData.password"
                        placeholder="密码"
                        round
                        show-password-on="mousedown"
                        type="password"
                    >
                        <template #prefix>
                            <n-icon :component="LockClosedOutline" />
                        </template>
                    </n-input>
                </n-form-item>
            </n-form>
            <div class="remember-pass">
                <span>记住密码</span>
                <n-switch v-model:value="isRememberPassword" />
            </div>

            <n-button
                :disabled="!(loginData.username && loginData.password)"
                class="login-button"
                round
                type="primary"
                @click="handleLoginButton"
            >
                登录
            </n-button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useStore } from '@/store'
import { reactive, ref } from 'vue'
import { LockClosedOutline, PersonOutline } from '@vicons/ionicons5'
import { FormInst, FormItemRule, FormRules } from 'naive-ui'
import { ILoginData } from '@/views/login/types'
import { useLocalCache } from '@/utils/use-storage'

const store = useStore()
const loginFormRef = ref<FormInst | null>(null)

const cacheLoginData: ILoginData = useLocalCache.getCache('loginData')
const cacheRemPas = Boolean(useLocalCache.getCache('isRememberPassword'))

const loginData = reactive<ILoginData>({
    username: cacheLoginData?.username || '',
    password: cacheLoginData?.password || '',
})
//是否记住密码
const isRememberPassword = ref(false)
if (cacheRemPas) {
    isRememberPassword.value = cacheRemPas
} else {
    isRememberPassword.value = false
}

//登陆事件
const handleLoginButton = (e: MouseEvent) => {
    e.preventDefault()
    // console.log({ ...loginData.value })
    loginFormRef.value?.validate((errors) => {
        if (!errors) {
            if (isRememberPassword.value) {
                useLocalCache.setCache('loginData', loginData)
                useLocalCache.setCache('isRememberPassword', isRememberPassword.value)
            } else {
                useLocalCache.clearCache()
            }
            store.dispatch('loginModule/handleLoginAction', { ...loginData })
        } else {
            throw 'error'
        }
    })
}
//定义校验规则
const loginRules: FormRules = {
    username: [
        {
            required: true,
            validator(rule: FormItemRule, value: string) {
                if (!value) {
                    return new Error('')
                } else if (!/^\S{6,}$/.test(value)) {
                    return new Error('用户名不应小于6位!')
                }
                return true
            },
            trigger: ['input', 'blur'],
        },
    ],
    password: [
        {
            required: true,
            validator(rule: FormItemRule, value: string) {
                if (!value) {
                    return new Error('')
                } else if (!/^\S{6,}$/.test(value)) {
                    return new Error('密码不应小于6位!')
                }
                return true
            },
            trigger: ['input', 'blur'],
        },
    ],
}
</script>

<style lang="less" scoped>
.login-panel {
    width: 350px;
    height: 250px;
    display: flex;
    flex-flow: column;
    padding-top: 100px;
    backdrop-filter: blur(5px);
}

.title {
    font-weight: bold;
    font-size: 20px;
    margin-bottom: 10px;
    color: white;
}

.login-button {
    width: 350px;
}

.remember-pass {
    color: white;
    margin-bottom: 10px;
    display: flex;
    justify-content: flex-end;
}
</style>

<style>
.n-form-item-label {
    color: #ffffff !important;
}
</style>
