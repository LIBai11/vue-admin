import { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface KXInterceptor {
    requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
    requestInterceptorCatch?: (err: any) => any
    responseInterceptor?: (res: AxiosResponse) => AxiosResponse
    responseInterceptorCatch?: (err: any) => any
}

export interface KXConfig extends AxiosRequestConfig {
    interceptors?: KXInterceptor
    isShowLoading?: boolean
}
