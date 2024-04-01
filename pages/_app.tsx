import "../styles/globals.css";

import type { AppProps } from "next/app";
import { ReactNode,useState, useMemo , useRef} from "react";
import { Toaster } from "react-hot-toast"
import '@rainbow-me/rainbowkit/styles.css'


import { Layout,Provider,ContextProvider } from '@components/index'
import { SessionProvider } from "next-auth/react"
export const metadata = {
  title: "Prome tips",
  description: "information  prompt",
};


export default function MyApp({ Component, pageProps: { session, ...pageProps }}: AppProps) {
  console.log("myapp")
  return (
      <ContextProvider >
        <SessionProvider session={session}>
      <Layout>
       <Toaster position="bottom-center" />
        <Component {...pageProps} />
      </Layout>
      </SessionProvider>
      </ContextProvider>
  );
}