import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ReactNode,useState } from "react";
import { SessionProvider } from "next-auth/react"

import '@rainbow-me/rainbowkit/styles.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider, createConfig ,type CreateConfigParameters} from 'wagmi'
import { mainnet,bsc,goerli } from 'wagmi/chains'

import { RainbowKitProvider,getDefaultConfig } from '@rainbow-me/rainbowkit'

import { Layout,Config } from '@components/index'
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  rainbowWallet,
  walletConnectWallet,
  metaMaskWallet,
} from '@rainbow-me/rainbowkit/wallets';

const infuraApiKey = 'a79d66ef23ce4b4a9d44bf1e13768c73';
const queryClient = new QueryClient()


export default function MyApp({ Component, pageProps,session }: AppProps) {

  const [showWalletOptions, setShowWalletOptions] = useState(false);
  return (
    <WagmiProvider config={Config}>
    <QueryClientProvider client={queryClient}>
    <RainbowKitProvider>
    <SessionProvider session={session}>
      <Layout showWalletOptions={showWalletOptions} setShowWalletOptions={setShowWalletOptions}>
        <Component {...pageProps} />
      </Layout>
      </SessionProvider>
      </RainbowKitProvider>
      </QueryClientProvider>
      </WagmiProvider>
  );
}
