// ** import Next
import { NextPage } from 'next'
import DeliveryTypeSettingPage from 'src/views/pages/settings/delivery-type'

// ** view


type TProps = {}

const DeliveryType: NextPage<TProps> = () => {
    return (
        <DeliveryTypeSettingPage />
    )
}

// ** Gán Layout trống để không bị dính thanh Sidebar/Header của admin
// DeliveryType.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

// ** Gán Guard ngay dưới component
DeliveryType.authGuard = true
DeliveryType.acl = {
    action: 'read',
    subject: 'DeliveryType-page' // Hoặc đổi thành subject tương ứng với trang profile của bạn
}

export default DeliveryType