export type TRoleEntity = {
  _id: string
  name: string
  permissions: string[]
  createdAt?: string
  updatedAt?: string
}

export type TCreateRoleParams = {
  name: string
  permissions: string[]
}

export type TUpdateRoleParams = {
  name?: string
  permissions?: string[]
}
