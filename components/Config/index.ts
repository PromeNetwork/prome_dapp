import { mainnet,bsc,goerli } from 'wagmi/chains'
import { WagmiProvider, createConfig ,type CreateConfigParameters} from 'wagmi'
import { RainbowKitProvider,getDefaultConfig } from '@rainbow-me/rainbowkit'
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  rainbowWallet,
  walletConnectWallet,
  metaMaskWallet,
} from '@rainbow-me/rainbowkit/wallets';
const infuraApiKey = 'a79d66ef23ce4b4a9d44bf1e13768c73';
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
const cfg:CreateConfigParameters={
  chains: [mainnet,bsc,goerli],
  infuraApiKey,
  connectors
}
export default createConfig(cfg)