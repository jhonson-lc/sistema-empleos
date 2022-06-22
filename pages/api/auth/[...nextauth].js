import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import EmailProvider from "next-auth/providers/email";
import CredentialsProvider from "next-auth/providers/credentials";

const prisma = new PrismaClient();

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      id: "email",
      name: "email",
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      async authorize(credentials, req) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        const isValid = await prisma.client.findFirst({
          where: {
            email: credentials.email,
            password: credentials.password,
          },
        });
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
    verifyRequest: "/loading",
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
        const u = await prisma.client.findUnique({
          where: {
            email: session.user.email,
          },
        });
        if (u) {
          session.user.name = u.firstname + " " + u.lastname;
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
