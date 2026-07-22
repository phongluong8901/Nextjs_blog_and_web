// ** import Next
import { NextPage } from 'next'
import { ReactNode } from 'react'

// ** view
import BlankLayout from 'src/layouts/BlankLayout'
import MyProfilePage from 'src/views/pages/my-profile'

type TProps = {}

const MyProfile: NextPage<TProps> = () => {
    return (
        <MyProfilePage />
    )
}

// ** Gán Layout trống để không bị dính thanh Sidebar/Header của admin
// MyProfile.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

// ** Gán Guard ngay dưới component
MyProfile.authGuard = true
MyProfile.acl = {
    action: 'read',
    subject: 'myProfile-page' // Hoặc đổi thành subject tương ứng với trang profile của bạn
}

export default MyProfile