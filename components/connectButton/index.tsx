import React, { useEffect, useState} from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { recoverMessageAddress } from "viem";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { WalletName } from "@solana/wallet-adapter-base";
import { useLocalStorage } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import dynamic from "next/dynamic";
import { login as loginApi } from "@api/index";
import { WalletBtn,useAutoConnect ,autoSignIn} from "@components/index";
import { Button, Input, Select, Option, Dialog } from "@material-tailwind/react";
import Image from "next/image";
import { setLoginResult } from "@utils/storageUtils";

// import {Wallet} from "@nutui/icons-react";

const WalletDisconnectButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletDisconnectButton,
  { ssr: false }
);
const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);


const AppWalletConnectButton = () => {
   const [address, setAddress] = useState('');
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
  const [visible, setVisible ] = useState(false);
  const { connection } = useConnection();

  const openAccountModal = () => {
    setVisible(true);
  };


  
 
  return (
    <div style={{ display: "flex", justifyContent: "flex-end", padding: 0 }}>
      <Dialog  open={visible && !connected} handler ={()=>setVisible(false)} className="bg-card py-6 px-4 z-60" size="sm">
      <p className="text-white text-left ml-4 mb-6">Connect_Wallet</p>
        <div className="flex flex-col  items-center p-6">
         
      {wallets.filter((wallet) => wallet.readyState === "Installed")
                  .length > 0 ? (
                  wallets
                    .filter((wallet) => wallet.readyState === "Installed")
                    .map((wallet) => (
                      <div key={wallet.adapter.name} className="flex flex-row mt-4 items-end w-4/5 border border-white py-2 px-4 rounded-full">
                        <span>
                            <Image
                            className="align-middle "
                          src={wallet.adapter.icon}
                          alt={wallet.adapter.name}
                          width={30}
                          height={30}
                        /></span>
                          <span className="inline-block  text-white w-full text-center mr-5"
                        onClick={() => select(wallet.adapter.name)}
                      >
                       
                        {wallet.adapter.name}
                      </span>
                      </div>
                    
                    ))
                ) : (
                  <p>
                    No wallet found. Please download a supported Solana wallet
                  </p>
                )}
                </div>
      </Dialog>
      <div
      // {...(!wallet && {
      //   'aria-hidden': true, 'style': {
      //     opacity: 0, pointerEvents: 'none', userSelect: 'none',
      //   },
      // })}
      >
        {(() => {
          if (!wallets || !publicKey) {
            return (
              <>
               <Button
                  variant="outlined"
                  onClick={openAccountModal}
                  className={'bg-connect rounded-full px-8 text-btn/[0.8]  py-1 text-base'}
                  
                //   icon={<Wallet width="20"/>}
                >
                  connect
                  </Button>
              
              </>
            );
          }

      
          return (
            <div style={{ display: "flex" }}>
              {/* <div className={'network_btn'}>
                <Button onClick={openChainModal} icon={chain.hasIcon && (
                  <div>
                    {chain.iconUrl && (
                      <img
                        alt={chain.name ?? 'Chain icon'}
                        src={chain.iconUrl}
                        width={15}
                        height={15}
                      />
                    )}
                  </div>
                )}>
                  {chain.id === 97 ? 'BscTest' : chain.name}
                </Button>
              </div> */}

              <div style={{ marginLeft: "5px" }}>
                <WalletBtn
                  loading={connected!= true}
                  onClick={openAccountModal}
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
