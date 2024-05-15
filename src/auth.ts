import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./lib/prisma";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import { Adapter } from "next-auth/adapters";

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true, //required because still beta version
  theme: {
    logo: "/logo.png",
  },
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [Google, Github],
  callbacks: {
    /**
     * additional user items not available at client side for security
     * we must put database user items into the session as follows,
     * for client side availability (role)
     *  user - db user
     */
    session({ session, user }) {
      session.user = user;
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
});
