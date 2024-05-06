import React, { FC, ReactNode ,createContext, useContext ,useState,useEffect,useMemo, useCallback } from 'react'

import { WalletBtn,useAutoConnect ,autoSignIn , getToken } from "@components/index";
import { setLoginResult, removeLoginResult } from "@utils/storageUtils";
import { WalletName } from "@solana/wallet-adapter-base";
import { useWallet, useConnection, useLocalStorage } from "@solana/wallet-adapter-react";
import  {User, login} from "@api/index";
import {PhantomWalletName} from "@solana/wallet-adapter-wallets";
import {useAutoSignIn} from "@hooks/index";
import {useLoginStore} from "@store/index"

type Web3Api= {
    address: string | null;
    loginWallet:()=>void;
    logoutWallet:()=>void;
    progress:number;
    setProgress: (data:number)=>void,
    userLogin: (address: string, signature: string, code:string)=>void;
}
export const userContext= createContext<Web3Api>({
    address: null,
    loginWallet:()=>{},
    logoutWallet:()=>{},
    progress:0,
    setProgress: (data:number)=>{},
    userLogin:async (address: string, signature: string, code:string) =>{}
});
let defaultWalletName: WalletName<string>=PhantomWalletName
export const useUserContext = () => useContext(userContext);
export const  ConnectProvider: FC<{ children: ReactNode }> = ({ children }) => {

      // const [user,setUser] =useState<User>()
    
  
 
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
   const { connectWallet,setConnectWallet  }=useLoginStore()
   if(!wallet&&wallets&&wallets.length>0){
    const installWallets=wallets.filter((wallet)=>{
        return wallet.readyState=="Installed"
       })
       if(installWallets.length>0){
       const Phantom=installWallets.filter((wallet)=>wallet.adapter.name=="Phantom")
       if(!Phantom){
        defaultWalletName=installWallets[0]?.adapter?.name
       }
       }
   }else if(wallet){
    defaultWalletName=wallet?.adapter.name
   }


   useEffect(() => {
    if(!connectWallet&&!connected && !connecting){
      setConnectWallet(true);
      select(defaultWalletName);
      console.log("sign login wallet")
    }
  }, [connected,connecting,connectWallet,select,defaultWalletName,setConnectWallet]);
   
 
  //  const [walletName, setWalletName] = useLocalStorage<WalletName>('solanaWalletKey', PhantomWalletName);
   const [progress, setProgress] = useState(0)


   const userApi = useMemo(()=>{

    const address = publicKey?.toBase58();

    return {
        progress:progress,
        setProgress: setProgress,
        // user: user?user:null,
        address: address?address:null,
        userLogin: async (address: string, signature: string, code:string) => {
            const user = await login.userLogin(address,signature, code );
            setLoginResult(JSON.stringify(user),address);
        },
        loginWallet: ()=>{},
          logoutWallet: () => {
            removeLoginResult(address!);
            disconnect();
          },
        
    } 
},[publicKey,wallet,disconnect, progress]);


    return (
        <userContext.Provider value={userApi}>
            {children}
        </userContext.Provider>
    )
}

