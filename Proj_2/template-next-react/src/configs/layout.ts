import { ROUTE_CONFIG } from './routes'

export const VerticalItems = [
  {
    title: 'Quản lý hệ thống',
    icon: 'icon-system',
    role: 'Admin', // <--- Chỉ Admin mới thấy cả cụm menu này (hoặc phân quyền chi tiết từng item bên dưới)
    children: [
      {
        title: 'Quản lý vai trò',
        icon: 'carbon:user-role',
        path: ROUTE_CONFIG.MANAGE_SYSTEM.SYSTEM.ROLE
      },
      {
        title: 'Quản lý người dùng',
        icon: 'carbon:user',
        path: ROUTE_CONFIG.MANAGE_SYSTEM.SYSTEM.USER
      }
    ]
  },
  {
    title: 'Quản lý sản phẩm',
    icon: 'icon-product',

    // Nếu không để role ở cha, bạn có thể áp dụng cho từng children bên dưới nếu cần
    children: [
      {
        title: 'Quản lý sản phẩm',
        icon: 'carbon:product',
        path: ROUTE_CONFIG.MANAGE_SYSTEM.PRODUCT.MANAGE_PRODUCT
      },
      {
        title: 'Quản lý đơn hàng',
        icon: 'lets-icons:order-light',
        path: ROUTE_CONFIG.MANAGE_SYSTEM.PRODUCT.MANAGE_ORDER
      },
      {
        title: 'Danh sách đánh giá',
        icon: 'carbon:review',
        path: ROUTE_CONFIG.MANAGE_SYSTEM.PRODUCT.MANAGE_REVIEW
      }
    ]
  },
  {
    title: 'Cài đặt',
    icon: 'ant-design:setting-outlined',
    role: 'Admin', // <--- Cài đặt hệ thống thường chỉ Admin mới được vào
    children: [
      {
        title: 'Cài đặt thành phố',
        icon: 'solar:city-outline',
        path: ROUTE_CONFIG.MANAGE_SYSTEM.SETTINGS.CITY
      },
      {
        title: 'Cài đặt phương thức giao hàng',
        icon: 'carbon:delivery',
        path: ROUTE_CONFIG.MANAGE_SYSTEM.SETTINGS.DELIVERY_TYPE
      },
      {
        title: 'Cài đặt phương thức thanh toán',
        icon: 'streamline:payment-10',
        path: ROUTE_CONFIG.MANAGE_SYSTEM.SETTINGS.PAYMENT_TYPE
      }
    ]
  }
]
