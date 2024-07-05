import NextAuth, {NextAuthOptions, User} from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
// import clientPromise from "@/lib/mongodb"
import type { Adapter } from "next-auth/adapters";
import { Adamina } from "next/font/google";
import { verify } from '@node-rs/bcrypt';
import CredentialsProvider from "next-auth/providers/credentials";
import connect from "@/lib/mongoose";
import users from "@/models/User"
import {JWT} from "next-auth/jwt";

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error("Missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET environment variable");
}

declare module 'next-auth' {
  interface User {
    password?: string;
  }
}


export const authOptions : NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log("Cred: ", credentials)

        if (!credentials) return null;
        const user = await users.findOne({username: credentials.username})
        console.log("User: ", user)
        if (!user) return null;

        if (
          typeof user.password === 'string' &&
          !(await verify(credentials.password, user.password))
        ) {
          return null;
        } else {
          delete user.password;
        }
        console.log("Auth user: ", user);
        return user;
      },
    })

    // ...add more providers here
  ],
  // session: {
  //   jwt: true,
  // },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account) {
        token.accessToken = account.access_token
        token.id = user.email
      }
      return token
    },
    async session({ session, token }) {
      console.log("Session:")
      console.log(session, token)
      return session
    },

  },
  pages: {
    signIn: '/auth/login',
    // signOut: '/auth/signout',
    error: '/auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: null // If set, new users will be directed here on first sign in
  },
  session: {
    // Set to jwt in order to CredentialsProvider works properly
    strategy: 'jwt'
  },

  // adapter: MongoDBAdapter(clientPromise) as Adapter,
}



export default NextAuth(authOptions)

