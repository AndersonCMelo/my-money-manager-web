import { User } from './user'

declare module 'next-auth' {
  interface Session {
    user: User
    accessToken: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: User
    accessToken: string
  }
}
