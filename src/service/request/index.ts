import axios, { AxiosInstance } from 'axios'
import 'nprogress/nprogress.css'
import { KXConfig, KXInterceptor } from '@/service/request/type'
import * as nprogress from 'nprogress'
import { ElMessage } from 'element-plus'
import router from '@/router'

class KXRequest {
    instance: AxiosInstance
    isShowLoading?: boolean
    interceptor?: KXInterceptor

    constructor(config: KXConfig) {
        //console.log(config.isShowLoading)
        this.instance = axios.create(config)
        this.isShowLoading = config.isShowLoading ? config.isShowLoading : true

        this.instance.interceptors.request.use(
            this.interceptor?.requestInterceptor,
            this.interceptor?.requestInterceptorCatch
        )
        this.instance.interceptors.response.use(
            this.interceptor?.responseInterceptor,
            this.interceptor?.responseInterceptorCatch
        )

        this.instance.interceptors.request.use(
            (config) => {
                if (this.isShowLoading) {
                    nprogress.start()
                }
                return config
            },
            (err) => {
                if (this.isShowLoading) {
                    nprogress.set(0.7)
                    ElMessage.error('网络错误!')
                }
                return err
            }
        )

        this.instance.interceptors.response.use(
            (res) => {
                if (this.isShowLoading) {
                    nprogress.done()
                }
                if (res.data.code !== 20000) {
                    ElMessage.warning('系统错误,请稍后再试')
                    router.push('/login')
                    return res.data
                } else {
                    return res.data
                }
            },
            (err) => {
                if (this.isShowLoading) {
                    nprogress.set(0.7)
                    ElMessage.error('网络错误!')
                }

                return err
            }
        )
    }

    request<T>(config: KXConfig): Promise<T> {
        return new Promise((resolve, reject) => {
            if (config.interceptors?.requestInterceptor) {
                config = config.interceptors.requestInterceptor(config)
            }
            // console.log(config.isShowLoading)
            this.instance
                .request<any, T>(config)
                .then((res) => {
                    this.isShowLoading = true
                    resolve(res)
                })
                .catch((err) => {
                    this.isShowLoading = true
                    reject(err)
                    return err
                })
        })
    }

    get<T>(config: KXConfig): Promise<T> {
        return this.request<T>({ ...config, method: 'GET' })
    }

    post<T>(config: KXConfig): Promise<T> {
        return this.request<T>({ ...config, method: 'POST' })
    }

    delete<T>(config: KXConfig): Promise<T> {
        return this.request<T>({ ...config, method: 'DELETE' })
    }

    put<T>(config: KXConfig): Promise<T> {
        return this.request<T>({ ...config, method: 'PUT' })
    }

    patch<T>(config: KXConfig): Promise<T> {
        return this.request<T>({ ...config, method: 'PATCH' })
    }
}

export default KXRequest
