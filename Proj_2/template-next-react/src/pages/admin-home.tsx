// ** import Next
import { NextPage } from 'next'
import { ReactNode } from 'react'

// ** view
import BlankLayout from 'src/layouts/BlankLayout'
import AdminHomePage from 'src/views/pages/admin-home'

type TProps = {}

const AdminHome: NextPage<TProps> = () => {
    return (
        <AdminHomePage />
    )
}

// ** Gán Layout trống để không bị dính thanh Sidebar/Header của adminHome
// AdminHome.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

// ** Gán Guard ngay dưới component
AdminHome.authGuard = true
AdminHome.acl = {
    action: 'manage',
    subject: 'admin-page'
}

export default AdminHome