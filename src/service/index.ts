import KXRequest from './request'
import { BASE_URL, TIMEOUT, DEFAULT_SHOW_LOADING } from './request/config'
const kxRequest = new KXRequest({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
    isShowLoading: DEFAULT_SHOW_LOADING,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    //自动存储cookie并在每次请求中携带在请求头
    withCredentials: true,
})

export default kxRequest
