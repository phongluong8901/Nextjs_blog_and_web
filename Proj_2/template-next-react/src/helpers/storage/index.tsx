import { ACCESS_TOKEN, REFRESH_TOKEN, USER_DATA } from "src/configs/auth"

export const setLocalUserData = (userData: string, accessToken: string, refreshToken: string) => {
    if (typeof window !== 'undefined') {
        window.localStorage.setItem(ACCESS_TOKEN, accessToken)
        window.localStorage.setItem(REFRESH_TOKEN, refreshToken)
        window.localStorage.setItem(USER_DATA, userData)
    }
}

export const getLocalUserData = () => {
    if (typeof window !== 'undefined') {
        return {
            accessToken: window.localStorage.getItem(ACCESS_TOKEN),
            refreshToken: window.localStorage.getItem(REFRESH_TOKEN),
            userData: window.localStorage.getItem(USER_DATA),
        }
    }
    return {
        accessToken: null,
        refreshToken: null,
        userData: null,
    }
}

export const clearLocalUserData = () => {
    if (typeof window !== 'undefined') {
        window.localStorage.removeItem(ACCESS_TOKEN)
        window.localStorage.removeItem(REFRESH_TOKEN)
        window.localStorage.removeItem(USER_DATA)
    }
}