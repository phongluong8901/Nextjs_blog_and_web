// ** import Next
import { NextPage } from 'next'

// ** view
import AdminDashboardPage from 'src/views/pages/admin-dashboard'

type TProps = {}

const AdminDashboard: NextPage<TProps> = () => {
    return (
        <AdminDashboardPage />
    )
}

// ** Gán Layout trống để không bị dính thanh Sidebar/Header của admin
// AdminDashboard.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

// ** Gán Guard ngay dưới component
AdminDashboard.authGuard = true
AdminDashboard.acl = {
    action: 'manage',
    subject: 'admin-dashboard' // Hoặc subject đặc thù chỉ admin mới có quyền manage
}

export default AdminDashboard