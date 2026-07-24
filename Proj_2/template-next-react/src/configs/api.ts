export const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://nextjs-blog-and-web.onrender.com/api'

// export const BASE_URL = 'https://nextjs-blog-and-web.onrender.com/api'

if (typeof window !== 'undefined') {
  console.log('GIÁ TRỊ THỰC TẾ TRÊN VERCEL:', process.env.NEXT_PUBLIC_API_URL)
}

export const CONFIG_API = {
  AUTH: {
    INDEX: `${BASE_URL}/auth/login`,
    REGISTER: `${BASE_URL}/auth/register`,
    ME: `${BASE_URL}/auth/me`,
    CHANGE_PASSWORD: `${BASE_URL}/auth/change-password`,
    FORGOT_PASSWORD: `${BASE_URL}/auth/forgot-password`,
    RESET_PASSWORD: `${BASE_URL}/auth/reset-password`
  },

  ROLE: {
    INDEX: `${BASE_URL}/roles`, // Dùng chung cho POST (tạo mới) và GET (lấy danh sách)
    DETAIL: (id: string | number) => `${BASE_URL}/roles/${id}`, // Dùng cho GET chi tiết, PUT (cập nhật), DELETE (xóa 1)
    DELETE_MANY: `${BASE_URL}/roles/delete-many` // Dùng cho xóa nhiều
  },

  USER: {
    INDEX: `${BASE_URL}/users`, // POST (tạo) & GET (lấy tất cả)
    DETAIL: (id: string | number) => `${BASE_URL}/users/${id}`, // GET chi tiết, PUT cập nhật, DELETE xóa 1
    DELETE_MANY: `${BASE_URL}/users/delete-many` // DELETE xóa nhiều
  },

  CITY: {
    INDEX: `${BASE_URL}/city`, // Dùng cho POST (tạo mới) và GET (lấy danh sách)
    DETAIL: (id: string | number) => `${BASE_URL}/city/${id}`, // Dùng cho GET chi tiết, PUT cập nhật, DELETE xóa 1
    DELETE_MANY: `${BASE_URL}/city/delete-many` // Dùng cho xóa nhiều thành phố
  },

  DELIVERY_TYPE: {
    INDEX: `${BASE_URL}/delivery-type`, // Dùng cho POST (tạo mới) và GET (lấy danh sách)
    DETAIL: (id: string | number) => `${BASE_URL}/delivery-type/${id}`, // Dùng cho GET chi tiết, PUT cập nhật, DELETE xóa 1
    DELETE_MANY: `${BASE_URL}/delivery-type/delete-many` // Dùng cho xóa nhiều loại giao hàng
  },

  PAYMENT_TYPE: {
    INDEX: `${BASE_URL}/payment-type`, // Dùng cho POST (tạo mới) và GET (lấy danh sách)
    DETAIL: (id: string | number) => `${BASE_URL}/payment-type/${id}`, // Dùng cho GET chi tiết, PUT cập nhật, DELETE xóa 1
    DELETE_MANY: `${BASE_URL}/payment-type/delete-many` // Dùng cho xóa nhiều phương thức thanh toán
  }
}
