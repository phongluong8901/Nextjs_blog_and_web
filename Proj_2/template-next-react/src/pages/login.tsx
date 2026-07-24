// ** import Next
import { NextPage } from 'next'
import { ReactNode } from 'react'

// ** view
import BlankLayout from 'src/layouts/BlankLayout'
import LoginPage from 'src/views/pages/login'

type TProps = {}

const Login: NextPage<TProps> = () => {
  return (
    <LoginPage />
  )
}

// ** Gán Layout trống để không bị dính thanh Sidebar/Header của admin
Login.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

// ** Gán Guard ngay dưới component
Login.guestGuard = true
Login.authGuard = false

export default Login