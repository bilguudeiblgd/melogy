import "@/styles/globals.css";
import type {AppProps} from "next/app";
import {SessionProvider} from "next-auth/react"
import React, {createContext, useEffect, useState} from "react";
import {Black_Han_Sans, Rubik} from 'next/font/google'
import InApp from 'detect-inapp'

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
    const [inapp, setInapp] = useState<InApp | null>(null)
    useEffect(() => {
        setInapp(new InApp(navigator.userAgent || navigator.vendor))
    }, []);
    var BASE_URL: string = "http://localhost:3000"
    if (process.env.NODE_ENV === "production" && process.env.NEXT_PUBLIC_BASE_URL) {
        BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
    }

    const openInBrowser = () => {
        const url = window.location.href;
        window.open(url, '_system'); // Opens the link in the device's default browser
    };

    if (inapp && inapp.isInApp) return (
        <div style={{padding: '10px', backgroundColor: '#f0f0f0', textAlign: 'center'}}>
            <p>You{"'"}re viewing this in the in-app browser.</p>
            <button onClick={openInBrowser} style={{
                padding: '10px',
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
            }}>
                Open in Default Browser
            </button>
        </div>
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
