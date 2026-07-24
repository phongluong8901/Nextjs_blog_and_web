import { TCityEntity } from '../city'
import { TRoleEntity } from '../role'

// --- 1. Sub-structures ---
export type TUserAddressItem = {
  _id?: string
  address?: string
  city?: string
  phoneNumber?: string
  firstName?: string
  lastName?: string
  middleName?: string
  isDefault?: boolean
}

// --- 2. Main User Entity (Khớp 100% với userSchema ở Backend) ---
export type TUserEntity = {
  _id: string
  firstName?: string
  lastName?: string
  middleName?: string
  email: string
  role?: TRoleEntity | string
  phoneNumber?: string
  address?: string
  avatar?: string
  city?: TCityEntity | string
  status: number // 0: Khóa, 1: Hoạt động
  likedProducts?: string[]
  viewedProducts?: string[]
  userType: number // 1, 2, 3...
  addresses?: TUserAddressItem[]
  resetToken?: string
  resetTokenExpiration?: string | Date
  deviceTokens?: string[]
  createdAt?: string
  updatedAt?: string
}

// --- 3. Auth Payload / Request Params ---
export type TLoginAuth = {
  email: string
  password: string
  rememberMe?: boolean
  deviceToken?: string
}

export type TRegisterAuth = {
  email: string
  password: string
  firstName?: string
  lastName?: string
  phoneNumber?: string
}

export type TChangePasswordParams = {
  currentPassword: string
  newPassword: string
}

export type TForgotPasswordParams = {
  email: string
}

export type TResetPasswordParams = {
  secretKey: string
  newPassword: string
}

export type TUpdateAuthMeParams = {
  firstName?: string
  middleName?: string
  lastName?: string
  phoneNumber?: string
  address?: string
  city?: string | TCityEntity
  avatar?: string
  status?: number | boolean | string
  email?: string
  role?: string
  addresses?: TUserAddressItem[]
}

export type TSocialLoginParams = {
  idToken: string
  deviceToken?: string
}

export type TUpdateDeviceTokenParams = {
  deviceToken: string
}
