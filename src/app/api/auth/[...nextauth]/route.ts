/* eslint-disable @typescript-eslint/ban-ts-comment */
import { User } from '@/types/user'
import { AuthOptions } from 'next-auth'
import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: AuthOptions = {
  pages: {
    signIn: '/',
  },

  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        id: { label: 'Id', type: 'text' },
        name: { label: 'Name', type: 'text' },
        email: { label: 'E-mail', type: 'text' },
        permission: { label: 'Permission', type: 'text' },
        token: { label: 'Token', type: 'token' },
      },
      // @ts-ignore
      async authorize(credentials) {
        const user = {
          id: credentials?.id,
          name: credentials?.name,
          email: credentials?.email,
          permission: credentials?.permission,
        }

        if (!user) {
          return null
        }

        return {
          user,
          accessToken: credentials?.token,
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user as User
        return token
      } else {
        return token
      }
    },

    async session({ token, session }) {
      // @ts-ignore
      session.user = token.user.user
      // @ts-ignore
      session.accessToken = token.user.accessToken
      return session
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
