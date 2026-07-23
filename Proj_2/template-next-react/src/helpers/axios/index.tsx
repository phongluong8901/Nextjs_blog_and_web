// ** React Imports
import { FC, ReactNode } from 'react'

// ** Next Imports
import { NextRouter, useRouter } from 'next/router'

// ** Third Party Imports
import jwtDecode from 'jwt-decode'

// ** Configs & Helpers
import { BASE_URL, CONFIG_API } from 'src/configs/api'
import { clearLocalUserData, getLocalUserData } from 'src/helpers/storage'
import { UserDataType } from 'src/contexts/types'
import { useAuth } from 'src/hooks/useAuth'
import axios from 'axios'

type TAxiosInterceptor = {
    children: ReactNode
}

// Khởi tạo instance axios (Bật withCredentials để trình duyệt tự động gửi/nhận Cookie)
const instanceAxios = axios.create({
    baseURL: BASE_URL,
    withCredentials: true // 👈 Bắt buộc phải có để truyền HttpOnly Cookie qua lại giữa FE và BE
})

const handleRedirectLogin = (router: NextRouter, setUser: (data: UserDataType | null) => void) => {
    if (router.asPath !== '/') {
        router.replace({
            pathname: '/login',
            query: { returnUrl: router.asPath }
        })
    } else {
        router.replace('/login')
    }
    setUser(null)
    clearLocalUserData()
}

const AxiosInterceptor: FC<TAxiosInterceptor> = ({ children }) => {
    const router = useRouter()

    // Chỉ lấy accessToken (vì refreshToken giờ đã nằm trong HttpOnly Cookie bảo mật)
    const { accessToken } = getLocalUserData()
    const { setUser } = useAuth()

    // 1. Request Interceptor: Gắn Token vào Header trước khi gửi request
    instanceAxios.interceptors.request.use(
        async config => {
            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`
            }

            // --- XỬ LÝ FORM-DATA (UPLOAD ẢNH) ---
            if (config.data instanceof FormData) {
                // Xóa Content-Type để Axios tự động tạo boundary chuẩn cho form-data kèm file
                delete config.headers['Content-Type']
            } else {
                // Các request thông thường (JSON)
                config.headers['Content-Type'] = 'application/json'
            }

            return config
        },
        error => Promise.reject(error)
    )

    // 2. Response Interceptor: Bắt lỗi token hết hạn (401)
    instanceAxios.interceptors.response.use(
        response => response,
        async error => {
            const originalRequest = error.config

            if (error.response && error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true
                handleRedirectLogin(router, setUser)
            }

            return Promise.reject(error)
        }
    )

    return <>{children}</>
}

export default instanceAxios
export { AxiosInterceptor }