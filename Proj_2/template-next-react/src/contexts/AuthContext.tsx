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
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      if (storedToken) {
        try {
          // Sử dụng instanceAxios và endpoint ME để tự động đính kèm token và base URL
          const response = await instanceAxios.get(CONFIG_API.AUTH.ME)

          if (isMounted) {
            const data = response.data.userData || response.data.user || response.data
            setUser({ ...data })
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

  const handleLogin = async (params: LoginParams, errorCallback?: ErrCallbackType) => {
    try {
      const res = await loginAuth({
        email: params.email,
        password: params.password,
      })

      const responseData = res.data
      const token = responseData.access_token || responseData.token
      const refreshToken = responseData.refresh_token
      const userData = responseData.userData || responseData.user || responseData

      setLocalUserData(JSON.stringify(userData), token, refreshToken)
      setUser({ ...userData })

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