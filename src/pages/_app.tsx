import "@/styles/globals.css";
import type {AppProps} from "next/app";
import {SessionProvider} from "next-auth/react"
import {createContext} from "react";
import {Black_Han_Sans} from 'next/font/google'
import {Rubik} from "next/font/google";

const BLACK_HAN_SANS = Black_Han_Sans({
    subsets: ['latin'],
    variable: '--font-edgy',
    weight: '400'
});

const RUBIK = Rubik({
    subsets: ['latin'],
    variable: '--font-primary',
})


export const GlobalContext = createContext({
    baseURL: ""
})

export default function App({
                                Component,
                                pageProps: {session, ...pageProps}
                            }: AppProps) {
    var BASE_URL: string = "http://localhost:3000"
    if (process.env.NODE_ENV === "production") {
        BASE_URL = "https://inspect-me.vercel.app/"
    }
    return (
        <GlobalContext.Provider value={{baseURL: BASE_URL}}>
            <SessionProvider session={session}>
                <main className={`${RUBIK.variable} ${BLACK_HAN_SANS.variable} `}>
                    <Component {...pageProps} />
                </main>

            </SessionProvider>
        </GlobalContext.Provider>
    )
}
