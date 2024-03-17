import { mainnet, sepolia ,bsc, polygon,arbitrum } from '@wagmi/core/chains'
import { WagmiProvider,type CreateConfigParameters } from 'wagmi'
  import { http, createConfig , type Config } from '@wagmi/core'
import { RainbowKitProvider,getDefaultConfig } from '@rainbow-me/rainbowkit'
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  rainbowWallet,
  walletConnectWallet,
  metaMaskWallet,
} from '@rainbow-me/rainbowkit/wallets';
const connectors = connectorsForWallets(
    [
      {
        groupName: 'Recommended',
        wallets: [rainbowWallet, walletConnectWallet,metaMaskWallet],
      },
    ],
    {
      appName: 'weyland',
      projectId: '05621279f2b032319befec485ce5b7cb',
    }
  );



// const cfg:Config={
//   chains: [mainnet, sepolia ,bsc, polygon,arbitrum ],
//   connectors,
// }
// export default createConfig(cfg)