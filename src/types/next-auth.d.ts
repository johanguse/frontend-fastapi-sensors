import type { User as DefaultUser } from 'next-auth'

declare module 'next-auth' {
  export interface UserObject {
    id: number
    username: string
    name: string
  }

  export interface BackendAccessJWT {
    access_token: string
    token_type: string
  }

  export interface BackendJWT {
    access: string
    refresh: string
  }

  export interface DecodedJWT {
    sub: string
    exp: number
    iat: number
    jti?: string
    id?: number
    name?: string
  }

  export interface AuthValidity {
    valid_until: number
    refresh_until: number
  }

  export interface User extends DefaultUser {
    tokens: BackendJWT
    user: UserObject
    validity: AuthValidity
  }

  export interface Session {
    user: UserObject
    validity: AuthValidity
    error?: 'RefreshTokenExpired' | 'RefreshAccessTokenError' | 'InvalidToken'
  }
}

declare module 'next-auth/jwt' {
  export interface JWT {
    data: User
    error?: 'RefreshTokenExpired' | 'RefreshAccessTokenError' | 'InvalidToken'
  }
}
