import NextAuth, {NextAuthOptions, User} from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
// import clientPromise from "@/lib/mongodb"
import type { Adapter } from "next-auth/adapters";
import { Adamina } from "next/font/google";
import { verify } from '@node-rs/bcrypt';
import CredentialsProvider from "next-auth/providers/credentials";


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
    // CredentialsProvider({
    //   // The name to display on the sign in form (e.g. 'Sign in with...')
    //   name: 'Credentials',
    //   // The credentials is used to generate a suitable form on the sign in page.
    //   // You can specify whatever fields you are expecting to be submitted.
    //   // e.g. domain, username, password, 2FA token, etc.
    //   // You can pass any HTML attribute to the <input> tag through the object.
    //   credentials: {
    //     email: { label: "Username", type: "text", placeholder: "jsmith" },
    //     password: { label: "Password", type: "password" }
    //   },
    //   async authorize(credentials) {
    //     if (!credentials) return null;
    //
    //     const client = await clientPromise;
    //     const users = client.db().collection<User>('users');
    //     const user = await users.findOne({ email: credentials.email });
    //
    //     if (!user) return null;
    //
    //     if (
    //       typeof user.password === 'string' &&
    //       !(await verify(credentials.password, user.password))
    //     ) {
    //       return null;
    //     } else {
    //       delete user.password;
    //     }
    //
    //     return user;
    //   },
    // })
  
    // ...add more providers here
  ],
  // session: {
  //   jwt: true,
  // },
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

