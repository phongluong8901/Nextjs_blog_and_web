import { TUserAddressItem } from '../auth'
import { TCityEntity } from '../city'
import { TRoleEntity } from '../role'

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
  createdAt?: string
  updatedAt?: string
}

export type TCreateUserParams = {
  email: string
  password?: string
  firstName?: string
  lastName?: string
  middleName?: string
  phoneNumber?: string
  role?: string
  status?: number
}

export type TAdminUpdateUserParams = {
  firstName?: string
  middleName?: string
  lastName?: string
  email?: string
  phoneNumber?: string
  address?: string
  city?: string
  avatar?: string
  status?: number
  role?: string
  addresses?: TUserAddressItem[]
}
