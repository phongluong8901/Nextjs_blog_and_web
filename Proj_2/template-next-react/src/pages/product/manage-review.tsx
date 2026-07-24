// ** import Next
import { NextPage } from 'next'
import ManageReviewPage from 'src/views/pages/product/manage-review'

// ** view


type TProps = {}

const ManageReview: NextPage<TProps> = () => {
    return (
        <ManageReviewPage />
    )
}

// ** Gán Layout trống để không bị dính thanh Sidebar/Header của admin
// ManageReview.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

// ** Gán Guard ngay dưới component
ManageReview.authGuard = true
ManageReview.acl = {
    action: 'read',
    subject: 'ManageReview-page' // Hoặc đổi thành subject tương ứng với trang profile của bạn
}

export default ManageReview