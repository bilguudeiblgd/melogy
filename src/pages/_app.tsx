import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react"
import {createContext} from "react";


export const GlobalContext = createContext({
  baseURL: ""
})

export default function App({ Component,
                              pageProps: {session, ...pageProps} }: AppProps) {
  var BASE_URL: string = "http://localhost:3000"
  if(process.env.NODE_ENV === "production") {
    BASE_URL = "https://inspect-me.vercel.app/"
  }
  return (
      <GlobalContext.Provider value={{ baseURL: BASE_URL }}>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </GlobalContext.Provider>
  )
}
