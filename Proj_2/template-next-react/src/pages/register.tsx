
// import Next
import { NextPage } from 'next'
import { ReactNode } from 'react'
// ** view
import BlankLayout from 'src/layouts/BlankLayout'
import RegisterPage from 'src/views/pages/register'

type TProps = {}

const Register: NextPage<TProps> = () => {
  return (
    <RegisterPage />
  )
}



Register.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
Register.guestGuard = true

export default Register