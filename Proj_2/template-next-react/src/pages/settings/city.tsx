// ** import Next
import { NextPage } from 'next'
import CitySettingPage from 'src/views/pages/settings/city'

// ** view


type TProps = {}

const City: NextPage<TProps> = () => {
    return (
        <CitySettingPage />
    )
}

// ** Gán Layout trống để không bị dính thanh Sidebar/Header của admin
// City.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

// ** Gán Guard ngay dưới component
City.authGuard = true
City.acl = {
    action: 'read',
    subject: 'City-page' // Hoặc đổi thành subject tương ứng với trang profile của bạn
}

export default City