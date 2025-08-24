
import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  // هنا بنعمل extend للـ User اللي جاي من next-auth
  interface User {
    email: string
    name: string
    role: string
    token: string
  }

  interface Session {
    user: {
      email: string
      name: string
      role: string
    }
    token: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    email: string
    name: string
    role: string
    token: string
  }
}
