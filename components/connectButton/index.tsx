import React, {useEffect, useState,useCallback} from "react";
import {ConnectButton} from '@rainbow-me/rainbowkit';
import { recoverMessageAddress } from 'viem'
import { useAccount,useSignMessage,useConnectors,UseConnectorsReturnType, useDisconnect } from "wagmi";
import { type SignMessageReturnType,GetAccountReturnType } from '@wagmi/core'
import {
  getCurrentAddress, getLoginResult, setCurrentAddress,
  setLoginResult
} from "@utils/storageUtils";
import {login as loginApi} from "@api/index";
import { WalletBtn } from "@components/index";
import { Button, Input, Select, Option } from "@material-tailwind/react";
// import {Wallet} from "@nutui/icons-react";
import {useAtom} from "helux";
import {loginAtom} from "@hooks/index";


const AppWalletConnectButton = () => {
//   const [address, setAddress] = useState('');
const recoveredAddress = React.useRef<string>()
  const [login, setLogin] = useAtom(loginAtom);
  const {address}:GetAccountReturnType=useAccount();
  const { disconnect } = useDisconnect()

  return (<div style={{display: 'flex', justifyContent: 'flex-end', padding: 0,}}>
    <ConnectButton.Custom>
      {({account, chain, openAccountModal, openChainModal, openConnectModal, mounted}) => {
        return (<div
          {...(!mounted && {
            'aria-hidden': true, 'style': {
              opacity: 0, pointerEvents: 'none', userSelect: 'none',
            },
          })}
        >
          {(() => {
            if (!mounted || !account || !chain) {
              return (
                <Button
                  variant="outlined"
                  onClick={openConnectModal}
                  className={'bg-connect rounded-full px-8 text-btn/[0.8]  py-1 text-base'}
                  
                //   icon={<Wallet width="20"/>}
                >
                  connect
                  </Button>
              );
            }

            if (chain.unsupported) {
              return (
                <div style={{display: 'flex'}}>
                  <Button style={{textTransform: 'none', minWidth: '120px'}}
                          onClick={openChainModal}>
                    {"链接错误"}
                  </Button>
                </div>
              );
            }
            // setAddress(account.address);
            return (<div style={{display: 'flex'}}>
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

              <div style={{marginLeft: '5px'}}>
                <WalletBtn onClick={openAccountModal} chain={chain} account={account} disconnected={()=>disconnect()}/>
              </div>
            </div>);
          })()}
        </div>);
      }}
    </ConnectButton.Custom>
  </div>);
}
export default AppWalletConnectButton;