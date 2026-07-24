// export const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://nextjs-blog-and-web.onrender.com/api'
export const BASE_URL = 'https://nextjs-blog-and-web.onrender.com/api'

if (typeof window !== 'undefined') {
  console.log('GIÁ TRỊ THỰC TẾ TRÊN VERCEL:', process.env.NEXT_PUBLIC_API_URL)
}

export const CONFIG_API = {
  AUTH: {
    INDEX: `${BASE_URL}/auth/login`,
    REGISTER: `${BASE_URL}/auth/register`,
    ME: `${BASE_URL}/auth/me`,
    FORGOT_PASSWORD: `${BASE_URL}/auth/forgot-password`,
    RESET_PASSWORD: `${BASE_URL}/auth/reset-password`
  },
  ROLE: {
    INDEX: `${BASE_URL}/roles`, // Dùng chung cho POST (tạo mới) và GET (lấy danh sách)
    DETAIL: (id: string | number) => `${BASE_URL}/roles/${id}`, // Dùng cho GET chi tiết, PUT (cập nhật), DELETE (xóa 1)
    DELETE_MANY: `${BASE_URL}/roles/delete-many` // Dùng cho xóa nhiều
  }
}
