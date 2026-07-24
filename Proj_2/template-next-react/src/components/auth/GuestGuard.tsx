// ** React Imports
import { useRouter } from 'next/router'
import { ReactNode, ReactElement, useEffect } from 'react'
import { useAuth } from 'src/hooks/useAuth'

interface GuestGuardProps {
  children: ReactNode
  fallback: ReactElement | null
}

const GuestGuard = (props: GuestGuardProps) => {
  const { children, fallback } = props
  const auth = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!router.isReady || auth.loading) {
      return
    }

    // Nếu đã đăng nhập rồi mà cố vào trang guest (như /login) -> đẩy về trang chủ hoặc returnUrl
    if (auth.user !== null) {
      router.replace('/')
    }
  }, [router.isReady, auth.loading, auth.user, router])

  // Đang load hoặc đã đăng nhập mà vẫn đứng ở trang login thì hiện fallback, chặn không cho render form login
  if (auth.loading || auth.user !== null) {
    return fallback
  }

  return <>{children}</>
}

export default GuestGuard