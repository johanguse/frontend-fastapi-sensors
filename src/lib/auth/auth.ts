import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import type {
  AuthOptions,
  User,
  UserObject,
  AuthValidity,
  BackendAccessJWT,
  DecodedJWT
} from "next-auth";
import type { JWT } from "next-auth/jwt";
import { jwtDecode } from "jwt-decode";

async function refreshAccessToken(nextAuthJWT: JWT): Promise<JWT> {
  try {
    if (!nextAuthJWT.data?.tokens?.refresh) {
      throw new Error("No refresh token available");
    }

    const res = await fetch("http://127.0.0.1:8000/api/v1/refresh_token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh: nextAuthJWT.data.tokens.refresh }),
    });
    const accessToken: BackendAccessJWT = await res.json();

    if (!res.ok) throw accessToken;
    
    if (typeof accessToken.access_token !== 'string') {
      throw new Error("Invalid access token received");
    }

    const { exp }: DecodedJWT = jwtDecode(accessToken.access_token);

    nextAuthJWT.data.validity.valid_until = exp;
    nextAuthJWT.data.tokens.access = accessToken.access_token;

    return nextAuthJWT;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return {
      ...nextAuthJWT,
      error: "RefreshAccessTokenError"
    };
  }
}

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Login",
      credentials: {
        username: {
          label: "Email",
          type: "email",
          placeholder: "john@mail.com"
        },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          const res = await fetch("http://127.0.0.1:8000/api/v1/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
              username: credentials?.username ?? "",
              password: credentials?.password ?? ""
            })
          });
          const tokens: { access_token: string; token_type: string } = await res.json();
      
          if (!res.ok) throw new Error("Failed to authenticate");
      
          if (typeof tokens.access_token !== 'string') {
            throw new Error("Invalid token format received");
          }
      
          const access: DecodedJWT = jwtDecode(tokens.access_token);
          
          const user: UserObject = {
            name: access.name ?? "Unknown",
            username: access.sub ?? "unknown",
            id: access.id ?? 0
          };
          
          const validity: AuthValidity = {
            valid_until: access.exp,
            refresh_until: access.exp
          };
          
          return {
            id: access.jti ?? "unknown",
            tokens: {
              access: tokens.access_token,
              refresh: tokens.access_token
            },
            user: user,
            validity: validity
          } as User;
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user && account) {
        console.log("Initial signin, token:", token, "user:", user);
        return { 
          ...token,
          data: user as User
        };
      }
  
      if (!token.data) {
        console.error("Token data is missing");
        return { 
          ...token, 
          error: "InvalidToken",
          data: { 
            tokens: { access: '', refresh: '' },
            user: { id: 0, name: '', username: '' },
            validity: { valid_until: 0, refresh_until: 0 }
          } as User
        };
      }
  
      if (Date.now() < token.data.validity.valid_until * 1000) {
        console.log("Access token is still valid");
        return token;
      }
  
      if (Date.now() < token.data.validity.refresh_until * 1000) {
        console.log("Access token is being refreshed");
        return await refreshAccessToken(token);
      }
  
      console.log("Both tokens have expired");
      return { 
        ...token, 
        error: "RefreshTokenExpired",
        data: token.data
      };
    },
    async session({ session, token }) {
      if (token.data) {
        session.user = token.data.user;
        session.validity = token.data.validity;
      }
      if (token.error) {
        session.error = token.error;
      }
      return session;
    }
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };