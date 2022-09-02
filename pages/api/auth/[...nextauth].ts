import { MongoDBAdapter } from "@next-auth/mongodb-adapter";

import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import clientPromise from "../../../lib/mongodb";
import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";
import { JWTAuthenticate } from "../../../lib/jwtTools";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      name: "GoogleProvider",
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    // Email & Password
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        await dbConnect();
        //connect to db
        // Find user with the email

        // Check hased password with DB hashed password
        //@ts-ignore
        const user = await User.checkCredentials(
          credentials!.email,
          credentials!.password
        );
        // User Not found
        if (!user) {
          throw new Error("User is not found registered");
          // user found
        } else {
          const { accessToken, refreshToken } = await JWTAuthenticate(user);
          return user;
        }
      },
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  session: { strategy: "jwt" },
  jwt: { secret: process.env.JWT_SECRET! },
  secret: process.env.JWT_SECRET!,
  pages: {
    signIn: "/session/new",
  },
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token, user }) {
      if (session?.user) {
        // @ts-ignore
        session.user.id = token.id;
      }

      return session;
    },
  },
};

export default NextAuth(authOptions);
