// ** import Next
import { NextPage } from 'next'
import ManageProductPage from 'src/views/pages/product/manage-product'

// ** view


type TProps = {}

const ManageProduct: NextPage<TProps> = () => {
    return (
        <ManageProductPage />
    )
}

// ** Gán Layout trống để không bị dính thanh Sidebar/Header của admin
// ManageProduct.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

// ** Gán Guard ngay dưới component
ManageProduct.authGuard = true
ManageProduct.acl = {
    action: 'read',
    subject: 'ManageProduct-page' // Hoặc đổi thành subject tương ứng với trang profile của bạn
}

export default ManageProduct