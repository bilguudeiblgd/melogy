import {Head, Html, Main, NextScript} from "next/document";
import {GoogleTagManager} from "@next/third-parties/google"


export default function Document() {
  return (
    <Html lang="en" data-theme="dark">
      <Head />
      <body >
        <Main />
        <NextScript />
      </body>
        <GoogleTagManager gtmId={`${process.env.NEXT_PUBLIC_GOOGLE_ID}`}/>
    </Html>
  );
}
