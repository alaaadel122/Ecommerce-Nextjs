import { NextAuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth/login",
  },
  session: { strategy: "jwt", },
  cookies: {
    sessionToken: {
      name: process.env.NODE_ENV === "production"
        ? "__Secure-next-auth.session-token"
        : "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",   // جرّبي "none" كمان لو بتشتغلي مع cross-domain
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
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
            token: payload.token,  // هنا بتحفظ التوكن
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
        token.token = (user as any).token;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as any;
      (session as any).token = token.token;
      return session;
    },
  },
};
