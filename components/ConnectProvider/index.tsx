import React, { FC, ReactNode ,createContext, useContext ,useState,useEffect,useMemo, useCallback } from 'react'

import { WalletBtn,useAutoConnect ,autoSignIn , getToken } from "@components/index";
import { setLoginResult, removeLoginResult } from "@utils/storageUtils";
import { WalletName } from "@solana/wallet-adapter-base";
import { useWallet, useConnection, useLocalStorage } from "@solana/wallet-adapter-react";
import  {User, login} from "@api/index";
import {PhantomWalletName} from "@solana/wallet-adapter-wallets";
import {useAutoSignIn} from "@hooks/index";
import { useCall } from 'wagmi';

type Web3Api= {
    walletName: WalletName | null;
    user: User | null;
    address: string | null;
    loginWallet:()=>void;
    logoutWallet:()=>void;
    userLogin: (address: string, signature: string, code:string)=>void;
}
export const userContext= createContext<Web3Api>({
    walletName: null,
    user: null,
    address: null,
    loginWallet:()=>{},
    logoutWallet:()=>{},
    userLogin:async (address: string, signature: string, code:string) =>{}
});

export const useUserContext = () => useContext(userContext);
export const  ConnectProvider: FC<{ children: ReactNode }> = ({ children }) => {

      const [user,setUser] =useState<User>()
    
    const [walletName, setWalletName] = useLocalStorage<WalletName>('solanaWalletKey', PhantomWalletName);

    const {autoConnect}=useAutoConnect();
 
   const {
     wallets,
     publicKey,
     wallet,
     connected,
     connecting,
     connect,
     disconnect,
     signIn,
     signMessage,
     select,
   } = useWallet();

   const userApi = useMemo(()=>{

    const address = publicKey?.toBase58();

    return {
        walletName,
        user: user?user:null,
        address: address?address:null,
        userLogin: async (address: string, signature: string, code:string) => {
            const user = await login.userLogin(address,signature, code );
            setLoginResult(JSON.stringify(user),address);
        },
        loginWallet: wallet?async () => {
          
            const address = await autoSignIn(wallet.adapter);
          }:()=>{},
          logoutWallet: () => {
            removeLoginResult(address!);
            disconnect();
          },
        
    } 
},[publicKey,wallet,walletName,user,disconnect]);

useEffect(()=>{
    const loadUser = async () => {
        if (publicKey) {
            const address = publicKey.toBase58();
            const user = await login.useInfo(address);
              setUser(user!)
   
        }  
    }
    loadUser();
},[publicKey,wallet?.adapter])

// useEffect(() => {


//     if(wallet && connected && !connecting && publicKey ){
//         console.log("auto sign in",wallet.adapter,connected,connecting,publicKey)
//          autoSignIn(wallet.adapter);
//     }
// }, [wallet,connected,connecting, publicKey])
useAutoSignIn(wallet?.adapter??null,connected,connecting,publicKey)



const initWallet=useCallback(async () => {
    debugger
    if (!connected && !connecting && walletName ) {
        await select(walletName)
    }
},[walletName, connected, connecting,select])

// initWallet()
   useEffect(() => {

    const loadUser = async () => {

    console.log("init wallet: ",walletName,connected,connecting,autoConnect,wallet,publicKey)
    // if (autoConnect && !connected && !connecting && walletName  && !wallet) {
    //   select(walletName)
    // }
    if(!walletName&&wallets.length>0){
      setWalletName(wallets[0].adapter.name)
    }
}
loadUser();

  }, [connected,connecting,wallet,walletName,autoConnect,publicKey,wallets,select,setWalletName]);

    return (
        <userContext.Provider value={userApi}>
            {children}
        </userContext.Provider>
    )
}

