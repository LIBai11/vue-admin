class UseLocalStorage {
    setCache(key: string, value: any) {
        localStorage.setItem(key, JSON.stringify(value))
    }

    getCache(key: string) {
        const value = window.localStorage.getItem(key)
        if (value) {
            return JSON.parse(value)
        }
    }

    deleteCache(key: string) {
        if (this.getCache(key)) {
            localStorage.removeItem('key')
        } else {
            return false
        }
    }

    clearCache() {
        localStorage.clear()
    }
}

class UseSessionStorage {
    setCache(key: string, value: any) {
        sessionStorage.setItem(key, JSON.stringify(value))
    }

    getCache(key: string) {
        const value = window.sessionStorage.getItem(key)
        if (value) {
            return JSON.parse(value)
        }
    }

    deleteCache(key: string) {
        if (this.getCache(key)) {
            sessionStorage.removeItem('key')
        } else {
            return false
        }
    }

    clearCache() {
        sessionStorage.clear()
    }
}

export const useLocalCache = new UseLocalStorage()
export const useSessionCache = new UseSessionStorage()
