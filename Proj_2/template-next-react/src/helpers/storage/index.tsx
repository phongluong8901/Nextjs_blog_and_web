import { ACCESS_TOKEN, USER_DATA } from "src/configs/auth"

export const setLocalUserData = (userData: string, accessToken: string, remember: boolean = false) => {
    if (typeof window !== 'undefined') {
        // Dọn sạch cả 2 kho trước khi lưu mới để tránh bị rác dữ liệu chéo
        window.localStorage.clear()
        window.sessionStorage.clear()

        // Chọn kho lưu trữ dựa trên trạng thái "Remember me"
        const storage = remember ? window.localStorage : window.sessionStorage

        storage.setItem(ACCESS_TOKEN, accessToken)
        storage.setItem(USER_DATA, userData)
    }
}

export const getLocalUserData = () => {
    if (typeof window !== 'undefined') {
        // Ưu tiên tìm trong localStorage trước, nếu không có thì tìm trong sessionStorage
        return {
            accessToken: window.localStorage.getItem(ACCESS_TOKEN) || window.sessionStorage.getItem(ACCESS_TOKEN),
            userData: window.localStorage.getItem(USER_DATA) || window.sessionStorage.getItem(USER_DATA),
        }
    }
    return {
        accessToken: null,
        userData: null,
    }
}

export const clearLocalUserData = () => {
    if (typeof window !== 'undefined') {
        // Xóa sạch ở cả 2 kho để đảm bảo đăng xuất hoàn toàn
        window.localStorage.removeItem(ACCESS_TOKEN)
        window.localStorage.removeItem(USER_DATA)

        window.sessionStorage.removeItem(ACCESS_TOKEN)
        window.sessionStorage.removeItem(USER_DATA)
    }
}