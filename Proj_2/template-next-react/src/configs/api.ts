export const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export const CONFIG_API = {
  AUTH: {
    INDEX: `${BASE_URL}/auth/login`,
    REGISTER: `${BASE_URL}/auth/register`,
    ME: `${BASE_URL}/auth/me`,
    FORGOT_PASSWORD: `${BASE_URL}/auth/forgot-password`,
    RESET_PASSWORD: `${BASE_URL}/auth/reset-password`
  }
}
