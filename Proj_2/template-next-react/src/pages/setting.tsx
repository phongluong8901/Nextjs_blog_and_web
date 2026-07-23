// ** import Next
import { NextPage } from 'next'

// ** view
import SettingPage from 'src/views/pages/setting'

type TProps = {}

const Setting: NextPage<TProps> = () => {
    return (
        <SettingPage />
    )
}



// ** Gán Guard ngay dưới component
Setting.authGuard = true
Setting.acl = {
    action: 'read',
    subject: 'setting-page'
}

export default Setting