// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios Instance & API Config
import instanceAxios from 'src/helpers/axios'
import { CONFIG_API } from 'src/configs/api'

// ** Config
import authConfig from 'src/configs/auth'

// ** Helpers
import { setLocalUserData, clearLocalUserData } from 'src/helpers/storage'

// ** Types
import { AuthValuesType, LoginParams, ErrCallbackType, UserDataType } from './types'
import { loginAuth } from 'src/services/auth'

// ** Third Party Components
import toast from 'react-hot-toast'

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve()
}

const AuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)

  // ** Hooks
  const router = useRouter()

  useEffect(() => {
    let isMounted = true
    const initAuth = async (): Promise<void> => {
      // Check ở cả localStorage lẫn sessionStorage để không bị văng khi F5
      const storedToken =
        window.localStorage.getItem(authConfig.storageTokenKeyName) ||
        window.sessionStorage.getItem(authConfig.storageTokenKeyName)

      if (storedToken) {
        try {
          const response = await instanceAxios.get(CONFIG_API.AUTH.ME)

          if (isMounted) {
            // ✅ Bóc tách đúng tầng response.data.data theo cấu trúc JSON của server
            const resData = response.data
            const userData = resData.data || resData.userData || resData.user || resData

            setUser({ ...userData })
            setLoading(false)
          }
        } catch {
          if (isMounted) {
            clearLocalUserData()
            setUser(null)
            setLoading(false)
          }
        }
      } else {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    initAuth()

    return () => {
      isMounted = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = async (params: LoginParams & { rememberMe?: boolean }, errorCallback?: ErrCallbackType) => {
    try {
      const res = await loginAuth({
        email: params.email,
        password: params.password,
      })

      const resData = res.data
      const loginPayload = resData.data || resData

      const token = loginPayload.access_token || loginPayload.token || resData.access_token
      const userData = loginPayload.user || loginPayload.userData || loginPayload

      // Truyền cờ rememberMe để phân loại lưu trữ AccessToken vào LocalStorage hoặc SessionStorage
      setLocalUserData(JSON.stringify(userData), token, Boolean(params.rememberMe))
      setUser({ ...userData })

      toast.success('Đăng nhập thành công!')

      const returnUrl = router.query.returnUrl
      const redirectURL = returnUrl && returnUrl !== '/' ? (returnUrl as string) : '/'
      router.replace(redirectURL)

    } catch (err: any) {
      if (errorCallback) errorCallback(err)
    }
  }

  const handleLogout = () => {
    setUser(null)
    clearLocalUserData()
    toast.success('Đăng xuất thành công!')
    router.push('/login')
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }