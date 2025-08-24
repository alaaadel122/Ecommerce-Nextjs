import { NextAuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth/login",
  },
  providers: [
    Credentials({
      name: "credential",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const res = await fetch(`${process.env.API}/auth/signin`, {
          method: "POST",
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
          headers: { "Content-Type": "application/json" },
        });

        const payload = await res.json();
        console.log(payload);

        if (payload.message === "success") {
          const decode = JSON.parse(
            Buffer.from(payload.token.split(".")[1], "base64").toString()
          );

          // لازم ترجع object مطابق لـ User
          return {
            id: decode.id,
            email: payload.user.email,   // مهم
            name: payload.user.name,     // مهم
            role: payload.user.role,     // لو عندك role
            accessToken: payload.token,  // هنا بتحفظ التوكن
          } as any;
        }

        return null; // لازم ترجع null لو الـ login فشل
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
        token.accessToken = (user as any).accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as any;
      (session as any).accessToken = token.accessToken;
      return session;
    },
  },
};
