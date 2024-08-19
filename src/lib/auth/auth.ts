import { apiUrl } from '../utils'
import { jwtDecode } from 'jwt-decode'
import type {
  AuthOptions,
  AuthValidity,
  DecodedJWT,
  User,
  UserObject,
} from 'next-auth'
import NextAuth from 'next-auth'
import type { JWT } from 'next-auth/jwt'
import CredentialsProvider from 'next-auth/providers/credentials'

async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    const response = await fetch(apiUrl('/refresh_token'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.data.tokens.access}`,
      },
      body: JSON.stringify({ refresh_token: token.data.tokens.refresh }),
      credentials: 'include',
    })

    const refreshedTokens = await response.json()

    if (!response.ok) {
      throw refreshedTokens
    }

    const decodedToken: DecodedJWT = jwtDecode(refreshedTokens.access_token)

    return {
      ...token,
      data: {
        ...token.data,
        tokens: {
          access: refreshedTokens.access_token,
          refresh: refreshedTokens.refresh_token,
        },
        validity: {
          valid_until: decodedToken.exp,
          refresh_until: decodedToken.exp + 7 * 24 * 60 * 60,
        },
      },
    }
  } catch (error) {
    console.error('Error refreshing access token:', error)
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    }
  }
}

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/login',
    signOut: '/register',
    error: '/auth-error',
  },
  providers: [
    CredentialsProvider({
      name: 'Login',
      credentials: {
        username: {
          label: 'Email',
          type: 'email',
          placeholder: 'john@mail.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const res = await fetch(apiUrl('/token'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
              username: credentials?.username ?? '',
              password: credentials?.password ?? '',
            }),
          })
          const tokens: {
            access_token: string
            refresh_token: string
            token_type: string
          } = await res.json()

          if (!res.ok) throw new Error('Failed to authenticate')

          if (
            typeof tokens.access_token !== 'string' ||
            typeof tokens.refresh_token !== 'string'
          ) {
            throw new Error('Invalid token format received')
          }

          const access: DecodedJWT = jwtDecode(tokens.access_token)

          const user: UserObject = {
            name: access.name ?? 'Unknown',
            username: access.sub ?? 'unknown',
            id: access.id ?? 0,
          }

          const validity: AuthValidity = {
            valid_until: access.exp,
            refresh_until: access.exp + 7 * 24 * 60 * 60,
          }

          return {
            id: access.jti ?? 'unknown',
            tokens: {
              access: tokens.access_token,
              refresh: tokens.refresh_token,
            },
            user: user,
            validity: validity,
          } as User
        } catch (error) {
          console.error('Authorization error:', error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          data: user,
        }
      }

      if (!token.data) {
        console.error('Token data is missing')
        return {
          ...token,
          error: 'InvalidToken',
          data: {
            tokens: { access: '', refresh: '' },
            user: { id: 0, name: '', username: '' },
            validity: { valid_until: 0, refresh_until: 0 },
          } as User,
        }
      }

      if (Date.now() / 1000 < token.data.validity.valid_until) {
        return token
      }

      if (Date.now() / 1000 < token.data.validity.refresh_until) {
        return await refreshAccessToken(token)
      }

      return {
        ...token,
        error: 'RefreshTokenExpired',
        data: token.data,
      }
    },
    async session({ session, token }) {
      if (token.data) {
        session.user = {
          ...session.user,
          ...token.data.user,
          tokens: token.data.tokens,
        }
        session.validity = token.data.validity
      }
      if (token.error) {
        session.error = token.error
      }

      return session
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith('/')) {
        url = `${baseUrl}${url}`
      } else if (url.startsWith('http')) {
        url = url
      } else {
        url = `${baseUrl}/${url}`
      }

      const parsedUrl = new URL(url)
      const callbackUrl = parsedUrl.searchParams.get('callbackUrl')

      if (callbackUrl) {
        const decodedCallbackUrl = decodeURIComponent(callbackUrl)
        try {
          new URL(decodedCallbackUrl)
          return decodedCallbackUrl
        } catch {
          return `${baseUrl}${decodedCallbackUrl.startsWith('/') ? '' : '/'}${decodedCallbackUrl}`
        }
      }

      return url
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
