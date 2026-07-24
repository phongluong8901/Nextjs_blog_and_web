// ** import Next
import { NextPage } from 'next'
import ManageOrderPage from 'src/views/pages/product/manage-order'

// ** view


type TProps = {}

const ManageOrder: NextPage<TProps> = () => {
    return (
        <ManageOrderPage />
    )
}

// ** Gán Layout trống để không bị dính thanh Sidebar/Header của admin
// ManageOrder.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

// ** Gán Guard ngay dưới component
ManageOrder.authGuard = true
ManageOrder.acl = {
    action: 'read',
    subject: 'ManageOrder-page' // Hoặc đổi thành subject tương ứng với trang profile của bạn
}

export default ManageOrder