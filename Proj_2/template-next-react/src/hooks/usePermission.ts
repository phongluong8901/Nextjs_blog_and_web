import { useState, useEffect } from 'react'
import { useAuth } from 'src/hooks/useAuth'

type TActions = string | string[]

export const usePermission = (key: string, actions: TActions) => {
  const { user } = useAuth() as any // Ép kiểu 'as any' để tránh lỗi TypeScript khi truy cập thuộc tính lồng nhau
  const [permission, setPermission] = useState<boolean>(false)

  useEffect(() => {
    const getObjectValue = (obj: any, targetKey: string) => {
      const keys = targetKey.split('.')
      let result = obj
      if (keys && !!keys.length) {
        for (const k of keys) {
          if (result && k in result) {
            result = result[k]
          } else {
            return undefined
          }
        }
      }

      return result
    }

    // Lấy danh sách permissions an toàn, tránh lỗi kiểu dữ liệu
    const userPermissions = user?.role?.permissions ?? user?.permissions ?? []

    if (Array.isArray(userPermissions)) {
      if (typeof actions === 'string') {
        const fullKey = `${key}.${actions}`
        setPermission(userPermissions.includes(fullKey) || userPermissions.includes(key))
      } else {
        const hasPermission = actions.some(
          action => userPermissions.includes(`${key}.${action}`) || userPermissions.includes(key)
        )
        setPermission(hasPermission)
      }
    } else {
      const moduleData = getObjectValue(userPermissions, key)
      if (moduleData) {
        if (typeof actions === 'string') {
          setPermission(!!moduleData[actions] || moduleData === true)
        } else {
          const hasAny = actions.some(action => !!moduleData[action])
          setPermission(hasAny)
        }
      } else {
        setPermission(false)
      }
    }
  }, [user, key, actions])

  return { permission }
}
