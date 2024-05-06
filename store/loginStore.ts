import { WalletName } from "@solana/wallet-adapter-base";
import create from 'zustand';
import  {User} from "@api/index";
export interface LoginState{
    user: User|null,
    sign:boolean;
    walletName: WalletName<string> | null;
    connectWallet:boolean;
    setSign:(arg0:boolean)=>void;
    setWalletName:(arg0:WalletName<string>)=>void;
    setConnectWallet:(arg0:boolean)=>void;
    setUser:(arg0:User|null)=>void;
}

export const useLoginStore= create<LoginState>((set) => ({
    user: null,
    sign: false,
    walletName: null,
    connectWallet:false,
    setSign:(arg0:boolean)=>{
    console.log("set login",arg0)
    set((state:LoginState)=>{
      return (
      {sign:state.sign=arg0}
      )})
    }
    ,
    setWalletName:(arg0:WalletName<string>)=>{
      console.log("set walletName",arg0)
      set((state:LoginState)=>{
        return (
        {walletName:state.walletName=arg0}
        )})
      }
    ,
    setConnectWallet:(arg0:boolean)=>{
      console.log("set connectWallet",arg0)
      set((state:LoginState)=>{
        return (
        {connectWallet:state.connectWallet=arg0}
        )})
      },
    setUser:(arg0:User|null)=>{ 
        console.log("set user",arg0)
        set((state:LoginState)=>{
            return (
            {user:state.user=arg0}
            )})
        }

}));