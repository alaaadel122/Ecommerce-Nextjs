import { NextAuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"
export const authOptions: NextAuthOptions = {
     pages: {
          signIn: '/auth/login'
     },
     providers: [
          Credentials({
               name: 'credential',
               credentials: {
                    email: { label: "Email", type: "email" },
                    password: { label: "Password", type: "password" }

               },
               authorize: async (credentials) => {
                    const res = await fetch(`${process.env.API}/auth/signin`, {
                         method: 'POST',
                         body: JSON.stringify({
                              email: credentials?.email,
                              password: credentials?.password,
                         }),
                         headers: {
                              'Content-Type': 'application/json'
                         }
                    })
                    const payload = await res.json()
                    console.log(payload)
                    if (payload.message == 'success') {
                         const decode = JSON.parse(Buffer.from(payload.token.split('.')[1], 'base64').toString())

                         return {
                              id: decode.id,
                              user: payload.user,
                              token: payload.token
                         }
                    }
                    else {
                         throw new Error(payload.message || 'Something went error ')
                    }
               }
          })
     ],
     callbacks: {
          async jwt({ token, user }) {
               if (user) {
                    token.user = user.user,
                    token.token = user.token
               }
               return token
          },
          async session({ session, token }) {
               session.user = token.user
               return session
          }
     }
}