
// import Next
import { NextPage } from 'next'
import { ReactNode } from 'react'

// ** view
import BlankLayout from 'src/layouts/BlankLayout'
import ResetPasswordPage from 'src/views/pages/reset-password'

type TProps = {}

const ResetPassword: NextPage<TProps> = () => {
    return (
        <ResetPasswordPage />
    )
}



ResetPassword.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
ResetPassword.guestGuard = true

export default ResetPassword