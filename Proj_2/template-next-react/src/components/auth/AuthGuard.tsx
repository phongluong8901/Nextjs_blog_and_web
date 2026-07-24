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
  const isPublicRoute = publicRoutes.includes(router.pathname)

  useEffect(() => {
    // Always call hooks in same order; skip guard logic for public routes
    if (isPublicRoute) return

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
  }, [isPublicRoute, router.isReady, auth.loading, auth.user, router])

  if (isPublicRoute) {
    return <>{children}</>
  }

  if (auth.loading || auth.user === null) {
    return fallback
  }

  return <>{children}</>
}

export default AuthGuard