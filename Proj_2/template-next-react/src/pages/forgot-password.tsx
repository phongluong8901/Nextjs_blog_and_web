
// import Next
import { NextPage } from 'next'
import { ReactNode } from 'react'
// ** view
import BlankLayout from 'src/layouts/BlankLayout'
import ForgotPasswordPage from 'src/views/pages/forgot-password'

type TProps = {}

const ForgotPassword: NextPage<TProps> = () => {
    return (
        <ForgotPasswordPage />
    )
}



ForgotPassword.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
ForgotPassword.guestGuard = true

export default ForgotPassword