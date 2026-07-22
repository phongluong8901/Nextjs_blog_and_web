// export default {
//   meEndpoint: '/auth/me',
//   loginEndpoint: '/jwt/login',
//   registerEndpoint: '/jwt/register',
//   storageTokenKeyName: 'accessToken',
//   onTokenExpiration: 'refreshToken' // logout | refreshToken
// }

// //test cicd vercel
// //test cicd vercel2

export default {
  meEndpoint: `${process.env.NEXT_PUBLIC_API_URL || 'https://api-shop-lks2.onrender.com/api'}/auth/me`,
  loginEndpoint: `${process.env.NEXT_PUBLIC_API_URL || 'https://api-shop-lks2.onrender.com/api'}/auth/login`,
  registerEndpoint: `${process.env.NEXT_PUBLIC_API_URL || 'https://api-shop-lks2.onrender.com/api'}/auth/register`,
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}

export const ACCESS_TOKEN = 'accessToken'
export const REFRESH_TOKEN = 'refreshToken'
export const USER_DATA = 'userData'
