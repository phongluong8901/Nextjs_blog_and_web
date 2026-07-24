// ** React Imports
import { FC, ReactNode, useEffect } from 'react'

// ** Next Imports
import { NextRouter, useRouter } from 'next/router'

// ** Configs & Helpers
import { BASE_URL } from 'src/configs/api'
import { clearLocalUserData, getLocalUserData } from 'src/helpers/storage'
import { UserDataType } from 'src/contexts/types'
import { useAuth } from 'src/hooks/useAuth'
import axios from 'axios'

type TAxiosInterceptor = {
    children: ReactNode
}

// Khởi tạo instance axios
const instanceAxios = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
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

// 1. Request Interceptor: Luôn lấy token mới nhất trước mỗi request
instanceAxios.interceptors.request.use(
    async config => {
        // 👈 Lấy token trực tiếp ở đây để đảm bảo luôn đọc giá trị mới nhất từ storage
        const { accessToken } = getLocalUserData()

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`
        }

        // --- XỬ LÝ FORM-DATA (UPLOAD ẢNH) ---
        if (config.data instanceof FormData) {
            delete config.headers['Content-Type']
        } else {
            config.headers['Content-Type'] = 'application/json'
        }

        return config
    },
    error => Promise.reject(error)
)

const AxiosInterceptor: FC<TAxiosInterceptor> = ({ children }) => {
    const router = useRouter()
    const { setUser } = useAuth()

    useEffect(() => {
        // 2. Response Interceptor: Bắt lỗi token hết hạn (401)
        const interceptor = instanceAxios.interceptors.response.use(
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

        return () => {
            instanceAxios.interceptors.response.eject(interceptor)
        }
    }, [router, setUser])

    return <>{children}</>
}

export default instanceAxios
export { AxiosInterceptor }