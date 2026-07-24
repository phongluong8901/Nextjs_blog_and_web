// ** Định nghĩa kiểu dữ liệu (Typescript Types) cho toàn bộ hệ thống Permissions

export const CONFIG_PERMISSIONS = {
  ADMIN: 'ADMIN.GRANTED',
  BASIC: 'BASIC.PUBLIC',
  DASHBOARD: 'DASHBOARD',
  MANAGE_PRODUCT: {
    PRODUCT: {
      CREATE: 'MANAGE_PRODUCT.PRODUCT.CREATE',
      VIEW: 'MANAGE_PRODUCT.PRODUCT.VIEW',
      UPDATE: 'MANAGE_PRODUCT.PRODUCT.UPDATE',
      DELETE: 'MANAGE_PRODUCT.PRODUCT.DELETE'
    },
    PRODUCT_TYPE: {
      CREATE: 'MANAGE_PRODUCT.PRODUCT_TYPE.CREATE',
      UPDATE: 'MANAGE_PRODUCT.PRODUCT_TYPE.UPDATE',
      DELETE: 'MANAGE_PRODUCT.PRODUCT_TYPE.DELETE'
    },
    COMMENT: {
      UPDATE: 'MANAGE_PRODUCT.COMMENT.UPDATE',
      DELETE: 'MANAGE_PRODUCT.COMMENT.DELETE'
    }
  },
  SYSTEM: {
    USER: {
      VIEW: 'SYSTEM.USER.VIEW',
      CREATE: 'SYSTEM.USER.CREATE',
      UPDATE: 'SYSTEM.USER.UPDATE',
      DELETE: 'SYSTEM.USER.DELETE'
    },
    ROLE: {
      VIEW: 'SYSTEM.ROLE.VIEW',
      CREATE: 'SYSTEM.ROLE.CREATE',
      UPDATE: 'SYSTEM.ROLE.UPDATE',
      DELETE: 'SYSTEM.ROLE.DELETE'
    }
  },
  MANAGE_ORDER: {
    REVIEW: {
      UPDATE: 'MANAGE_ORDER.REVIEW.UPDATE',
      DELETE: 'MANAGE_ORDER.REVIEW.DELETE'
    },
    ORDER: {
      VIEW: 'MANAGE_ORDER.ORDER.VIEW',
      UPDATE: 'MANAGE_ORDER.ORDER.UPDATE',
      DELETE: 'MANAGE_ORDER.ORDER.DELETE'
    }
  },
  SETTING: {
    PAYMENT_TYPE: {
      CREATE: 'SETTING.PAYMENT_TYPE.CREATE',
      UPDATE: 'SETTING.PAYMENT_TYPE.UPDATE',
      DELETE: 'SETTING.PAYMENT_TYPE.DELETE'
    },
    DELIVERY_TYPE: {
      CREATE: 'SETTING.DELIVERY_TYPE.CREATE',
      UPDATE: 'SETTING.DELIVERY_TYPE.UPDATE',
      DELETE: 'SETTING.DELIVERY_TYPE.DELETE'
    },
    CITY: {
      CREATE: 'CITY.CREATE',
      UPDATE: 'CITY.UPDATE',
      DELETE: 'CITY.DELETE'
    }
  }
} as const

// Trích xuất tự động kiểu Union Type cho tất cả các giá trị permission có trong object
export type PermissionType =
  | typeof CONFIG_PERMISSIONS.ADMIN
  | typeof CONFIG_PERMISSIONS.BASIC
  | typeof CONFIG_PERMISSIONS.DASHBOARD
  | (typeof CONFIG_PERMISSIONS.MANAGE_PRODUCT.PRODUCT)[keyof typeof CONFIG_PERMISSIONS.MANAGE_PRODUCT.PRODUCT]
  | (typeof CONFIG_PERMISSIONS.MANAGE_PRODUCT.PRODUCT_TYPE)[keyof typeof CONFIG_PERMISSIONS.MANAGE_PRODUCT.PRODUCT_TYPE]
  | (typeof CONFIG_PERMISSIONS.MANAGE_PRODUCT.COMMENT)[keyof typeof CONFIG_PERMISSIONS.MANAGE_PRODUCT.COMMENT]
  | (typeof CONFIG_PERMISSIONS.SYSTEM.USER)[keyof typeof CONFIG_PERMISSIONS.SYSTEM.USER]
  | (typeof CONFIG_PERMISSIONS.SYSTEM.ROLE)[keyof typeof CONFIG_PERMISSIONS.SYSTEM.ROLE]
  | (typeof CONFIG_PERMISSIONS.MANAGE_ORDER.REVIEW)[keyof typeof CONFIG_PERMISSIONS.MANAGE_ORDER.REVIEW]
  | (typeof CONFIG_PERMISSIONS.MANAGE_ORDER.ORDER)[keyof typeof CONFIG_PERMISSIONS.MANAGE_ORDER.ORDER]
  | (typeof CONFIG_PERMISSIONS.SETTING.PAYMENT_TYPE)[keyof typeof CONFIG_PERMISSIONS.SETTING.PAYMENT_TYPE]
  | (typeof CONFIG_PERMISSIONS.SETTING.DELIVERY_TYPE)[keyof typeof CONFIG_PERMISSIONS.SETTING.DELIVERY_TYPE]
  | (typeof CONFIG_PERMISSIONS.SETTING.CITY)[keyof typeof CONFIG_PERMISSIONS.SETTING.CITY]

/**
 * 🛠️ Helper kiểm tra xem danh sách quyền của User có chứa quyền yêu cầu hay không.
 * @param userPermissions Mảng các chuỗi quyền mà user đang sở hữu (lấy từ Redux / User Context)
 * @param requiredPermission Quyền cần kiểm tra (Ví dụ: CONFIG_PERMISSIONS.SYSTEM.ROLE.VIEW)
 */
export const hasPermission = (userPermissions: string[], requiredPermission: PermissionType): boolean => {
  if (!userPermissions || !Array.isArray(userPermissions)) return false

  // Nếu user có quyền ADMIN tối cao thì pass mọi điều kiện
  if (userPermissions.includes(CONFIG_PERMISSIONS.ADMIN)) return true

  return userPermissions.includes(requiredPermission)
}
