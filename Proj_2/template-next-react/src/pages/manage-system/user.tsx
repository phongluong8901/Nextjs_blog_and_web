// ** import Next
import { NextPage } from 'next'
import UserManagementPage from 'src/views/pages/manage-system/user'

// ** view


type TProps = {}

const User: NextPage<TProps> = () => {
    return (
        <UserManagementPage />
    )
}

// ** Gán Layout trống để không bị dính thanh Sidebar/Header của admin
// User.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

// ** Gán Guard ngay dưới component
User.authGuard = true
User.acl = {
    action: 'read',
    subject: 'User-page' // Hoặc đổi thành subject tương ứng với trang profile của bạn
}

export default User