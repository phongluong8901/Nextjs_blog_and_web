export type TLoginAuth = {
  email: string
  password: string
  rememberMe?: boolean
}

export type TRegisterAuth = {
  email: string
  password: string
  firstName?: string
  lastName?: string
  phoneNumber?: string
}
