// ** React Imports
import { useRouter } from 'next/router'
import { ReactNode, ReactElement, useEffect } from 'react'
import { useAuth } from 'src/hooks/useAuth'

interface AuthGuardProps {
  children: ReactNode
  fallback: ReactElement | null
}

const AuthGuard = (props: AuthGuardProps) => {
  const { children, fallback } = props
  const auth = useAuth()
  const router = useRouter()

  // 👉 THÊM ĐOẠN NÀY ĐỂ BỎ QUA NẾU LÀ TRANG CÔNG KHAI CẦN TRÁNH BẢO VỆ
  const publicRoutes = ['/forgot-password', '/login', '/register']
  if (publicRoutes.includes(router.pathname)) {
    return <>{children}</>
  }

  useEffect(() => {
    if (!router.isReady || auth.loading) {
      return
    }

    // Nếu chưa đăng nhập -> đá về login kèm returnUrl
    if (auth.user === null) {
      router.replace({
        pathname: '/login',
        query: { returnUrl: router.asPath },
      })
    }
  }, [router.isReady, auth.loading, auth.user, router])

  if (auth.loading || auth.user === null) {
    return fallback
  }

  return <>{children}</>
}

export default AuthGuard