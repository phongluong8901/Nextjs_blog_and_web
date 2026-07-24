// ** React Imports
import { ReactNode } from 'react'

// ** Types
import type { ACLObj } from 'src/configs/acl'

// ** Contexts & Hooks
import { useAuth } from 'src/hooks/useAuth'
import { buildAbilityFor } from 'src/configs/acl'

// ** Component Import
import NotAuthorized from 'src/pages/401'

interface AclGuardProps {
  children: ReactNode
  authGuard?: boolean
  guestGuard?: boolean
  aclAbilities: ACLObj
}

const AclGuard = (props: AclGuardProps) => {
  // ** Props
  const { aclAbilities, children, guestGuard = false } = props

  // ** Hooks
  const auth = useAuth()

  // Nếu đang load dữ liệu user thì tạm thời chưa xét quyền vội
  if (auth.loading) {
    return null
  }

  // Lấy an toàn role name từ user object (mặc định là 'Basic')
  const userRole = (auth.user?.role as any)?.name ? (auth.user?.role as any).name : 'Basic'

  // Xây dựng CASL ability dựa theo role và subject của trang hiện tại
  const ability = buildAbilityFor(userRole, aclAbilities?.subject)

  // // --- DEBUG ĐỂ TÌM NGUYÊN NHÂN BỊ ĐẨY SANG TRANG 401 ---
  // console.log('--- DEBUG ACL GUARD ---')
  // console.log('1. auth.user:', auth.user)
  // console.log('2. userRole:', userRole)
  // console.log('3. aclAbilities của trang:', aclAbilities)
  // console.log('4. ability object:', ability)
  // console.log('5. Kết quả check can():', auth.user && ability && aclAbilities ? ability.can(aclAbilities.action, aclAbilities.subject) : false)
  // // ------------------------------------------------------

  // Nếu là trang guest (login, register...) thì cho qua luôn
  if (guestGuard) {
    return <>{children}</>
  }

  // Kiểm tra quyền hạn bằng CASL ability.can(action, subject)
  if (auth.user && ability && aclAbilities && ability.can(aclAbilities.action, aclAbilities.subject)) {
    return <>{children}</>
  }

  // Nếu không có quyền -> Chặn và trả về trang 401 Not Authorized
  return <NotAuthorized />
}

export default AclGuard