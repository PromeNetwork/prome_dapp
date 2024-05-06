import React, { useEffect, useState} from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { WalletBtn,useAutoConnect ,autoSignIn} from "@components/index";
import { Button, Input, Select, Option, Dialog } from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";
import { useUserContext } from "@components/index";
import {useLoginStore} from "@store/index"
// import {Wallet} from "@nutui/icons-react";


interface WalletConnectButtonProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (arg0: boolean) => void;
}

const AppWalletConnectButton = ({mobileMenuOpen,setMobileMenuOpen}:WalletConnectButtonProps) => {
 const LoginState= useLoginStore((state)=>({sign:state.sign, setSign:state.setSign, setUser:state.setUser}));
 const {progress, setProgress} =useUserContext()
  const {
    wallet,
    wallets,
    publicKey,
    connected,
    disconnect,
    select,
  } = useWallet();

  const selectWalletAndLogin = async (wallet: any) => {
    await select(wallet.adapter.name);
    LoginState.setSign(false);
    setMobileMenuOpen(false)
  }

  console.log("wallet",wallet,LoginState.sign)
  useEffect(() => {
    const loadTask = async () => {
    if (connected &&!LoginState.sign && wallet) {
      LoginState.setSign(true);
      console.log("sign  once login wallet")
      await autoSignIn(wallet?.adapter,LoginState.setUser);
       setProgress(progress + 1)
    }
  }
  loadTask();
  }, [connected,wallet,progress,LoginState,setProgress]);
  
  const hasWallet=()=>{
    if (wallets && wallets.length > 0 &&   wallets.filter(wallet=> wallet.readyState==="Installed").length > 0) {
      return true;
    }
    return false;
  }

  console.log("testmenu",mobileMenuOpen)
console.log("wallets connected publicKey",wallets, connected, publicKey)
 
  return (
    <div style={{ display: "flex", justifyContent: "flex-end", padding: 0 }}>
      <Dialog  open={mobileMenuOpen } handler ={()=>setMobileMenuOpen(false)} className="bg-card py-6 px-4 z-60" size="sm">
      <p className="text-white text-left ml-4 mb-6">Connect_Wallet</p>
        <div className="flex flex-col  items-center p-6">
        { hasWallet()? (
                  wallets
                    .map((wallet) => (
                      <div key={wallet.adapter.name} className="flex flex-row mt-4 items-end w-4/5 border border-white py-2 px-4 rounded-full hover:bg-[#4F5942] hover:border-connect">
                        <span>
                            <Image
                            className="align-middle "
                          src={wallet.adapter.icon}
                          alt={wallet.adapter.name}
                          width={30}
                          height={30}
                        /></span>
                          <span className="inline-block  text-white w-full text-center mr-5"
                        onClick={() => selectWalletAndLogin(wallet)}
                      >
                        {wallet.adapter.name}
                      </span>
                      </div>
                    
                    ))
                ) : (
                  <p>
                    No wallet found. Please download a supported <Link  href="https://phantom.app/download" target="_bank" className="underline-offset-1 underline decoration-white/60"> Solana wallet</Link>
                  </p>
                )}
                </div>
      </Dialog>
      <div>
        {(() => {
          if (!wallets || !publicKey) {
            return (
              <>
               <Button
                  variant="outlined"
                  onClick={()=>setMobileMenuOpen(true)}
                  className={'bg-connect rounded-full px-8 text-btn/[0.8]  py-1 text-base'}
                >
                  connect
                  </Button>
              
              </>
            );
          }

      
          return (
            <div style={{ display: "flex" }}>

              <div style={{ marginLeft: "5px" }}>
                <WalletBtn
                  loading={connected!= true}
                  onClick={()=>setMobileMenuOpen(true)}
                  account={{address: publicKey.toBase58()}}
                  disconnected={() => disconnect()}
                />
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
};
export default AppWalletConnectButton;
