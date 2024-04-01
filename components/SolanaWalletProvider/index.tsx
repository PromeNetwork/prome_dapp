
import  React, { ReactElement, ReactNode, createContext } from 'react'

import { useWallet ,useConnection, } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
interface SolanaWallet {
    account: {address: string}
    chain:{unsupported:boolean,hasIcon:boolean,iconUrl:string,name:string}
    openAccountModal: ()=>void
    openChainModal: ()=>void
    openConnectModal:()=>void
    mounted:boolean
    }

        const ctx = createContext<SolanaWallet>({
            account: {address: ''},
            chain:{unsupported:false,hasIcon:false,iconUrl:'',name:''},
            openAccountModal: ()=>{},
            openChainModal: ()=>{},
            openConnectModal:()=>{},
            mounted:false
        })
export const SolanaWalletProvider = ({ children }: { children: React.ReactNode }) => {

    const { wallet } = useWallet();
    const { setVisible } = useWalletModal();
    const   openAccountModal = () => {
        setVisible(true);
    }
    let walletContext:SolanaWallet;
    if(!wallet){
        walletContext={
            account: {address: ''},
            chain:{unsupported:false,hasIcon:false,iconUrl:'',name:'solana'},
            openAccountModal: openAccountModal,
            openChainModal: ()=>{},
            openConnectModal:()=>{},
            mounted:false
        }

    }else{
        walletContext={
            account: {address: ''},
            chain:{unsupported:false,hasIcon:false,iconUrl:'',name:''},
            openAccountModal: ()=>{},
            openChainModal: ()=>{},
            openConnectModal:()=>{},
            mounted:false
        }
    }
    


   


  return <div>{children}</div>;
};