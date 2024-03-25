import "../styles/globals.css";

import type { AppProps } from "next/app";
import { ReactNode,useState } from "react";
import { SessionProvider } from "next-auth/react"
import { Toaster } from "react-hot-toast"
import '@rainbow-me/rainbowkit/styles.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider, createConfig ,type CreateConfigParameters} from 'wagmi'

import { RainbowKitProvider,getDefaultConfig } from '@rainbow-me/rainbowkit'

import { Layout,Provider } from '@components/index'
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import { SpeedInsights } from "@vercel/speed-insights/next"
import {
  rainbowWallet,
  walletConnectWallet,
  metaMaskWallet,
} from '@rainbow-me/rainbowkit/wallets';

export const metadata = {
  title: "Prome tips",
  description: "information  prompt",
};
const queryClient = new QueryClient()


export default function MyApp({ Component, pageProps: { session, ...pageProps }}: AppProps) {

  const [showWalletOptions, setShowWalletOptions] = useState(false);
  return (
    // <WagmiProvider config={Config}>
    // <QueryClientProvider client={queryClient}>
   
    <Provider>
       <RainbowKitProvider>
    <SessionProvider session={session}>
      <Layout showWalletOptions={showWalletOptions} setShowWalletOptions={setShowWalletOptions}>
      <Toaster position="bottom-center" />
        <Component {...pageProps} />
      </Layout>
      </SessionProvider>
      </RainbowKitProvider>
      </Provider>
  );
}
