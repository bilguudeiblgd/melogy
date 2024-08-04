import NextAuth, {NextAuthOptions, User, JWT, Session} from "next-auth"
import GoogleProvider, {GoogleProfile} from "next-auth/providers/google"
import clientPromise from "@/lib/mongodb"
import { verify } from '@node-rs/bcrypt';
import CredentialsProvider from "next-auth/providers/credentials";
import connect from "@/lib/mongoose";
// import {JWT} from "next-auth/jwt";
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import type { Adapter } from 'next-auth/adapters';
import mongoose, {Schema} from "mongoose";

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error("Missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET environment variable");
}

declare module 'next-auth' {
  interface User {
    userhandle?: string;
  }
  interface Session {
    accessToken?: string;
  }

  interface JWT {
    accessToken: string;
  }
  // interface Session {
  //   accessToken?: string;
  // }
}


export const authOptions : NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // @ts-ignore
      async profile(profile: GoogleProfile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          userhandle :null,
        }
      },
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: {label: "Username", type: "text", placeholder: "jsmith"},
        password: {label: "Password", type: "password"}
      },
      async authorize(credentials) {
        console.log("Cred: ", credentials)

        if (!credentials) return null;
        const users = mongoose.model("users")
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
  adapter: MongoDBAdapter(clientPromise, ) as Adapter ,
  callbacks: {
    async jwt({ token, user, account }) {
      if (account) {
        token.accessToken = account.access_token
        token.id = user.email
      }
      return token
    },
    async session({ session, token, user })  {
      // session.accessToken = token.accessToken
      // session.user.id = token.id
      // #TODO: this is so bad, im not sure how to "typescripty" fix this
      // @ts-ignore
      session.accessToken = token.accessToken
      return session
    },

  },
  pages: {
    // signIn: '/auth/login',
    // signOut: '/auth/signout',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: null // If set, new users will be directed here on first sign in
  },
  session: {
    // Set to jwt in order to CredentialsProvider works properly
    strategy: 'jwt'
  },

  // adapter: MongoDBAdapter(clientPromise) as Adapter,
}





export default NextAuth(authOptions)

