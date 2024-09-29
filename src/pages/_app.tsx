import "@/styles/globals.css";
import type {AppProps} from "next/app";
import {SessionProvider} from "next-auth/react"
import React, {createContext, useEffect, useState} from "react";
import {Black_Han_Sans, Rubik} from 'next/font/google'
import InAppSpy from 'inapp-spy'
import InAppBrowserWarning from "@/components/InAppBrowserWarning";

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
    const [inapp, setInapp] = useState<boolean>(false)
    useEffect(() => {
        const {isInApp} = InAppSpy()
        setInapp(isInApp)
    }, []);
    var BASE_URL: string = "http://localhost:3000"
    if (process.env.NODE_ENV === "production" && process.env.NEXT_PUBLIC_BASE_URL) {
        BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
    }


    if (inapp) return (
        <InAppBrowserWarning/>
    )
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
