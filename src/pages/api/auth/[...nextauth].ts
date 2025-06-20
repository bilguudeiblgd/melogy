import NextAuth, {NextAuthOptions, User} from "next-auth"
import GoogleProvider, {GoogleProfile} from "next-auth/providers/google"
import clientPromise from "@/lib/mongodb"
import {MongoDBAdapter} from "@auth/mongodb-adapter"
import type {Adapter} from 'next-auth/adapters';
import {TYPES} from "@/components/Test/Properties";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import UserModel from "@/models/User";
import dbConnect from "@/lib/dbConnect";

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    throw new Error("Missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET environment variable");
}

declare module 'next-auth' {
    interface User {
        id: string
        name: string;
        email: string;
        image: string | null;
        userHandle?: string;
        groups?: string[];
    }

    interface Session {
        accessToken?: string;
        user: User
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        accessToken?: string;
        userHandle?: string;
    }
}

export const authOptions: NextAuthOptions = {
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
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                userHandle: { label: "User Handle", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                try {
                    if (!credentials?.userHandle || !credentials?.password) {
                        throw new Error("Please enter an user handle and password");
                    }

                    await dbConnect();
                    const user = await UserModel.findOne({ userHandle: credentials.userHandle });

                    if (!user) {
                        throw new Error("No user found with this handle");
                    }

                    const isPasswordValid = await bcrypt.compare(
                        credentials.password,
                        user.password
                    );

                    if (!isPasswordValid) {
                        throw new Error("Invalid password");
                    }

                    return {
                        id: user._id.toString(),
                        userHandle: user.userHandle,
                        name: user.name,
                        email: user.email || `${user.userHandle}@temp.com`,
                        image: user.image
                    };
                } catch (error: any) {
                    console.error("[Auth] Error:", error?.message);
                    throw error;
                }
            }
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    adapter: MongoDBAdapter(clientPromise, {databaseName: process.env.MONGODB_DBNAME || 'dev'}) as Adapter,
    callbacks: {
        async jwt({token, user, trigger, account, session}) {
            if (trigger === "update") {
                token.userHandle = session?.userHandle;
            }
            if (account) {
                token.accessToken = account.access_token;
                token.userHandle = user.userHandle;
                token.id = user.email;
            }
            return token;
        },
        async session({session, token}) {
            session.accessToken = token.accessToken;
            session.user.userHandle = token.userHandle;
            return session;
        },
        // async redirect({ url, baseUrl }) {
        //     console.log("redirect", url, baseUrl);
        //     console.log("origin", new URL(url).origin)
        //     if (url.startsWith("/")) return `${baseUrl}${url}`
        //     if (new URL(url).origin === baseUrl) return url
        //     return baseUrl
        //   }
    },
    pages: {
        signIn: "/auth/signin",
    },
    session: {
        strategy: 'jwt'
    },
}

export default NextAuth(authOptions)

