// ** import Next
import { NextPage } from 'next'
import PaymentTypeSettingPage from 'src/views/pages/settings/payment-type'

// ** view


type TProps = {}

const PaymentType: NextPage<TProps> = () => {
    return (
        <PaymentTypeSettingPage />
    )
}

// ** Gán Layout trống để không bị dính thanh Sidebar/Header của admin
// PaymentType.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

// ** Gán Guard ngay dưới component
PaymentType.authGuard = true
PaymentType.acl = {
    action: 'read',
    subject: 'PaymentType-page' // Hoặc đổi thành subject tương ứng với trang profile của bạn
}

export default PaymentType