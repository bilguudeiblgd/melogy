import NextAuth, {NextAuthOptions, User} from "next-auth"
import GoogleProvider, {GoogleProfile} from "next-auth/providers/google"
import clientPromise from "@/lib/mongodb"
import {MongoDBAdapter} from "@auth/mongodb-adapter"
import type {Adapter} from 'next-auth/adapters';
import {TYPES} from "@/components/Test/Properties";

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    throw new Error("Missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET environment variable");
}

declare module 'next-auth' {
    interface User {
        id: string
        name: string;
        email: string;
        image: string;
        userHandle?: string;
    }

    interface Session {
        accessToken?: string;
        user: User
    }


    // interface Session {
    //   accessToken?: string;
    // }
}
declare module 'next-auth/jwt' {
    interface JWT {
        accessToken?: string;
        userHandle?: string;
    }
}


export const authOptions: NextAuthOptions = {
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
                    userHandle: null,
                    tests_for_me: [],
                    tests_given: [],
                    results: Object.values(TYPES).map((value) => {
                        return {personality_type: value, score: 0}
                    }),
                }
            },
        }),
        // ...add more providers here
    ],
    secret: process.env.NEXTAUTH_SECRET,

    adapter: MongoDBAdapter(clientPromise, {databaseName: process.env.MONGODB_DBNAME || 'dev'}) as Adapter,
    callbacks: {
        async jwt({token, user, trigger, account, session}) {
            if (trigger == "update") {
                console.log("update is called")
                token.userHandle = session?.userHandle;
            }
            if (account) {
                token.accessToken = account.access_token
                // token.
                token.userHandle = user.userHandle
                token.id = user.email
            }
            return token
        },
        async session({session, token, user}) {
            // session.accessToken = token.accessToken
            // session.user.id = token.id
            // #TODO: this is so bad, im not sure how to "typescripty" fix this
            // @ts-ignore
            session.accessToken = token.accessToken
            session.user.userHandle = token.userHandle
            console.log(user)
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

}


export default NextAuth(authOptions)

