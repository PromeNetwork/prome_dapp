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
import { login } from '@api/index';
import { createDefaultAuthorizationResultCache, SolanaMobileWalletAdapter , createDefaultAddressSelector, createDefaultWalletNotFoundHandler } from '@solana-mobile/wallet-adapter-mobile';
import { AutoConnectProvider, useAutoConnect } from '@components/AutoConnectProvider';
import { ConnectProvider } from '@components/index';
import {
    CoinbaseWalletAdapter,
    PhantomWalletAdapter,
    PhantomWalletName,
    SolflareWalletAdapter,
    TorusWalletAdapter,
    WalletConnectWalletAdapter,
    // getSolongWallet,
  } from '@solana/wallet-adapter-wallets'

const WalletContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const localStorageKey='solanaWalletKey'


    // Can be set to 'devnet', 'testnet', or 'mainnet-beta'
    const network = WalletAdapterNetwork.Devnet;

    // You can also provide a custom RPC endpoint
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    const wallets = useMemo(
        () => [
            /**
             * Wallets that implement either of these standards will be available automatically.
             *
             *   - Solana Mobile Stack Mobile Wallet Adapter Protocol
             *     (https://github.com/solana-mobile/mobile-wallet-adapter)
             *   - Solana Wallet Standard
             *     (https://github.com/solana-labs/wallet-standard)
             *
             * If you wish to support a wallet that supports neither of those standards,
             * instantiate its legacy wallet adapter here. Common legacy adapters can be found
             * in the npm package `@solana/wallet-adapter-wallets`.
             */
    
            new SolanaMobileWalletAdapter({
                addressSelector: createDefaultAddressSelector(),
                appIdentity: {
                    name: 'My app',
                    uri: 'https://myapp.io',
                    icon: 'relative/path/to/icon.png',
                },
                authorizationResultCache: createDefaultAuthorizationResultCache(),
                cluster: WalletAdapterNetwork.Devnet,
                onWalletNotFound: createDefaultWalletNotFoundHandler(),
            }),
            new CoinbaseWalletAdapter(),
            new PhantomWalletAdapter(),
            new SolflareWalletAdapter({ network }),
            new TorusWalletAdapter(),

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

    const queryClient = new QueryClient()


    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider  wallets={wallets} onError={onError} autoConnect={ true} localStorageKey={localStorageKey}>
                        <WalletModalProvider>
                        <ConnectProvider>
                        <QueryClientProvider client={queryClient}>
                            {children}
                         </QueryClientProvider>
                         </ConnectProvider>
                            </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

export const ContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    
  
    return (
            // <SnackbarProvider>
            
                    <AutoConnectProvider  >
                    {/* <Profiler id="YourComponent" onRender={(id, phase, actualDuration) => {
  console.log(`${id}渲染所花费的时间为 phase: ${phase} ：${actualDuration}毫秒`);
}}> */}

                        <WalletContextProvider>
                            {children}
                            </WalletContextProvider>
                            {/* </Profiler> */}
                    </AutoConnectProvider>
                // </SnackbarProvider>
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
export const autoSignIn = async (adapter: Adapter) => {
    if (!('signIn' in adapter)) return true;

    
   const address= adapter.publicKey ? adapter.publicKey.toBase58():null;
   if(address==null) return false;
   const token = await getToken(address)
   if(token) return false;
    const input: SolanaSignInInput = {
        domain: window.location.host,
        address:  address,
        statement: 'welcome to prome, we start a new journey',
    };
    const output = await adapter.signIn(input);
     
    const code= getQueryParamValue('code')!
    const res :{token:{accessToken:string}}= await login.userLogin(address!,bs58.encode(output.signature),code);

    if (!verifySignIn(input, output)) throw new Error('Sign In verification failed!');
    
    await saveToken(adapter.publicKey?.toBase58().toString()!,res.token.accessToken)
    await setCurrentAddress(address)
    return false;
};


