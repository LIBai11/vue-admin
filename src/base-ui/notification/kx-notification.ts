import { ElNotification } from 'element-plus'

class KxNotification {
    success(message?: string, duration?: number) {
        ElNotification({
            message: message,
            duration: duration || 2000,
            type: 'success',
        })
    }
    warning(message?: string, duration?: number) {
        ElNotification({
            message: message,
            duration: duration || 2000,
            type: 'warning',
        })
    }
    error(message?: string, duration?: number) {
        ElNotification({
            message: message,
            duration: duration || 2000,
            type: 'error',
        })
    }
    info(message?: string, duration?: number) {
        ElNotification({
            message: message,
            duration: duration || 2000,
            type: 'info',
        })
    }
}

export const kxNotification = new KxNotification()
