import type { Adapter, WalletError,  WalletName } from '@solana/wallet-adapter-base';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider  } from '@solana/wallet-adapter-react';
import bs58 from 'bs58'
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import {setCurrentAddress} from '@utils/storageUtils'
import { type SolanaSignInInput } from '@solana/wallet-standard-features';
import { verifySignIn } from '@solana/wallet-standard-util';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { clusterApiUrl } from '@solana/web3.js';
import { SnackbarProvider, useSnackbar } from 'notistack';
import type { FC, ReactNode } from 'react';
import React, { useCallback, useEffect, useMemo  ,Profiler} from 'react';
import {User,  login } from '@api/index';
import { createDefaultAuthorizationResultCache, SolanaMobileWalletAdapter , createDefaultAddressSelector, createDefaultWalletNotFoundHandler } from '@solana-mobile/wallet-adapter-mobile';
import { AutoConnectProvider, useAutoConnect } from '@components/AutoConnectProvider';
import { ConnectProvider } from '@components/index';
import {useLoginStore} from '@store/index'
import {
    CoinbaseWalletAdapter,
    PhantomWalletAdapter,
    PhantomWalletName,
    SolflareWalletAdapter,
    TorusWalletAdapter,
    WalletConnectWalletAdapter,
    // getSolongWallet,
  } from '@solana/wallet-adapter-wallets'
import toast from 'react-hot-toast';

const WalletContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const localStorageKey='solanaWalletKey'


    // Can be set to 'devnet', 'testnet', or 'mainnet-beta'
    const network = WalletAdapterNetwork.Mainnet;

    // You can also provide a custom RPC endpoint
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            // new SolflareWalletAdapter({ network }),
            // new TorusWalletAdapter(),
            new WalletConnectWalletAdapter({network: WalletAdapterNetwork.Mainnet, options: {
                relayUrl: 'wss://relay.walletconnect.com',
                // example WC app project ID
                projectId: 'e899c82be21d4acca2c8aec45e893598',
                metadata: {
                    name: 'Prome App',
                    description: 'Prome App',
                    url: 'https://airdrop.prome.network',
                    icons: ['https://pbs.twimg.com/profile_images/1772233543097430016/yMLkG9mV_x96.jp'],
                },
            },}),

        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [network]
    );




    const { enqueueSnackbar } = useSnackbar();
    const onError = useCallback(
        (error: WalletError, adapter?: Adapter) => {
            enqueueSnackbar(error.message ? `${error.name}: ${error.message}` : error.name, { variant: 'error' });
            console.error(error, adapter);
        },
        [enqueueSnackbar]
    );

    

   return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider  wallets={wallets} onError={onError} autoConnect={ true} localStorageKey={localStorageKey}>
            <ConnectProvider>
            <QueryClientProvider client={new QueryClient()}>
                        <WalletModalProvider>
                        { children}
                        </WalletModalProvider>
                        </QueryClientProvider>
                        </ConnectProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

export const ContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  
    return (
                    <AutoConnectProvider  >
                        <WalletContextProvider>
                            {children}
                            </WalletContextProvider>
                            {/* </Profiler> */}
                    </AutoConnectProvider>
    );
};

export const saveToken = async (publicKey:string,token:string) => {
    await localStorage.setItem(`${publicKey}token`, token);
  }

  function getQueryParamValue(paramName:string) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(paramName);
}

export const getToken =  async (publicKey:string) => {
    return  await localStorage.getItem(`${publicKey}token`);
  }

  export const removeToken = async (publicKey:string) => {
    await localStorage.removeItem(`${publicKey}token`);
  }
export const autoSignIn = async (adapter: Adapter,setUser:(user:User|null)=>void) => {
    if (!('signIn' in adapter)) return true;

   const address= adapter.publicKey ? adapter.publicKey.toBase58():null;
   if(address==null) return false;
   const token = await getToken(address)
   if(token) {
    try{
    const user =await login.useInfo(address)
    setUser&&setUser(user)
    }catch(e){
        removeToken(address)
        toast.error("token expired, please sign in again")
        return false
    }
    return false;
   };
   console.log("host", window.location.host)
    const input: SolanaSignInInput = {
        domain: window.location.host,
        address:  address,
        statement: 'welcome to prome, we start a new journey'
     
    };
    console.log("sign info",JSON.stringify(input))
    const output = await adapter.signIn(input);
    console.log("signature",bs58.encode(output.signature))
    // if (!verifySignIn(input, output)) throw new Error('Sign In verification failed!');
    const code= getQueryParamValue('code')!

    const res :{token:{accessToken:string}}= await login.userLogin(address!,bs58.encode(output.signature),code);

    await saveToken(adapter.publicKey?.toBase58().toString()!,res.token.accessToken)
    await setCurrentAddress(address)
     const user =await login.useInfo(address)
     setUser&&setUser(user)
    return false;
};


