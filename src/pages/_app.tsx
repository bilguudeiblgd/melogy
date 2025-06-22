import "@/styles/globals.css";
import type {AppProps} from "next/app";
import {SessionProvider} from "next-auth/react"
import React, {createContext} from "react";
import {Black_Han_Sans, Rubik} from 'next/font/google'
import {GoogleTagManager} from "@next/third-parties/google";
import Script from "next/script";

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
    baseURL: "",
})

export default function App({
    Component,
    pageProps: {session, ...pageProps}
}: AppProps) {
    var BASE_URL: string = "http://localhost:3000"
    if (process.env.NODE_ENV === "production" && process.env.NEXT_PUBLIC_BASE_URL) {
        BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
    }

    return (
        <GlobalContext.Provider value={{baseURL: BASE_URL}}>
            <SessionProvider session={session}>
                <main className={`${RUBIK.variable} ${BLACK_HAN_SANS.variable} `}>
                    <Script
                        async
                        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1431674278951978"
                        crossOrigin="anonymous"
                        strategy="afterInteractive"
                    />
                    <Component {...pageProps} />
                    <GoogleTagManager gtmId={`${process.env.NEXT_PUBLIC_GOOGLE_ID}`}/>
                    <GoogleTagManager gtmId={`${process.env.NEXT_PUBLIC_GOOGLE_ADS_ID}`}/>
                </main>
            </SessionProvider>
        </GlobalContext.Provider>
    )
}
