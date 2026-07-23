import { AbilityBuilder, Ability } from '@casl/ability'

export type Subjects = string
export type Actions = 'manage' | 'create' | 'read' | 'update' | 'delete'

export type AppAbility = Ability<[Actions, Subjects]> | undefined

export const AppAbility = Ability as any
export type ACLObj = {
  action: Actions
  subject: string
}

// ==========================================
// 1. CẤU HÌNH DANH SÁCH SUBJECT THEO 3 TRẠNG THÁI
// ==========================================
const ONLY_ADMIN_SUBJECTS = ['admin-page', 'admin-dashboard', 'user-management']

const ONLY_USER_SUBJECTS = ['userHome-page']

const defineRulesFor = (role: string, subject: string) => {
  const { can, cannot, rules } = new AbilityBuilder(AppAbility)

  const normalizedRole = role ? role.toLowerCase() : 'basic'
  const isAdmin = normalizedRole === 'admin'
  const isUser = normalizedRole === 'client' || normalizedRole === 'basic'

  if (isAdmin) {
    // Admin có toàn quyền quản trị
    can('manage', 'all')

    // NHƯNG bị chặn tuyệt đối không được vào các trang Only User
    ONLY_USER_SUBJECTS.forEach(sub => {
      cannot('manage', sub)
      cannot('read', sub)
    })
  } else if (isUser) {
    // User (Client/Basic) có quyền thao tác cơ bản trên subject hiện tại hoặc chung
    can(['read', 'create', 'update', 'delete'], subject)
    can('manage', 'all')

    // NHƯNG bị chặn tuyệt đối không được vào các trang Only Admin
    ONLY_ADMIN_SUBJECTS.forEach(sub => {
      cannot('manage', sub)
      cannot('read', sub)
    })
  } else {
    // Role khác (guest, v.v.) chỉ được đọc
    can(['read'], subject)
  }

  return rules
}

export const buildAbilityFor = (role: string, subject: string): AppAbility => {
  return new AppAbility(defineRulesFor(role, subject), {
    // @ts-ignore
    detectSubjectType: object => object!.type
  })
}

export const defaultACLObj: ACLObj = {
  action: 'manage',
  subject: 'all'
}

export default defineRulesFor
