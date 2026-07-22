// ** import Next
import { NextPage } from 'next'
import { ReactNode } from 'react'

// ** view
import BlankLayout from 'src/layouts/BlankLayout'
import UserHomePage from 'src/views/pages/user-home'

type TProps = {}

const UserHome: NextPage<TProps> = () => {
    return (
        <UserHomePage />
    )
}

// ** Gán Layout trống để không bị dính thanh Sidebar/Header của UserHome
// UserHome.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

// ** Gán Guard ngay dưới component
UserHome.authGuard = true
UserHome.acl = {
    action: 'read',
    subject: 'userHome-page' // Khớp tuyệt đối với file acl.ts để chặn Admin
}

export default UserHome