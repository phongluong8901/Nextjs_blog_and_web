// ** import Next
import { NextPage } from 'next'
import RoleManagementPage from 'src/views/pages/manage-system/role'

// ** view


type TProps = {}

const Role: NextPage<TProps> = () => {
    return (
        <RoleManagementPage />
    )
}

// ** Gán Layout trống để không bị dính thanh Sidebar/Header của admin
// Role.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

// ** Gán Guard ngay dưới component
Role.authGuard = true
Role.acl = {
    action: 'read',
    subject: 'Role-page' // Hoặc đổi thành subject tương ứng với trang profile của bạn
}

export default Role