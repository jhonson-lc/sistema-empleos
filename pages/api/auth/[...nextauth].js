import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "lib/prisma";

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      async authorize(credentials, req) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        const isValid = await prisma.user.findFirst({
          where: {
            email: credentials.email,
            password: credentials.password,
          },
        });
        if (!user) {
          await prisma.user.create({
            data: {
              email: credentials.email,
              password: credentials.password,
              role: credentials.role,
            },
          });
        }
        if (user && isValid) {
          return user;
        }
        return null;
      },
    }),
  ],
  secret: process.env.NEXT_AUTH_SECRET,
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async signIn({ user, account, email, credentials }) {
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.userId = token.sub;
      }
      if (session) {
        const c = await prisma.client.findUnique({
          where: {
            email: session.user.email,
          },
        });
        const e = await prisma.employee.findUnique({
          where: {
            email: session.user.email,
          },
        });
        const u = await prisma.user.findUnique({
          where: {
            email: session.user.email,
          },
        });
        if (c) {
          session.user.name = c.firstname + " " + c.lastname;
        }
        if (e) {
          session.user.name = e.firstname + " " + e.lastname;
        }
        if (u) {
          session.user.role = u.role;
          session.user.id = u.id;
        }
      }
      return session;
    },
  },
  jwt: {
    secret: process.env.NEXT_AUTH_SECRET,
    encryption: true,
  },
  session: { jwt: true },
});
