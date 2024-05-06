import create from 'zustand';

export  interface ConnectState{
    mobileMenuOpen:boolean;
    setMobileMenuOpen:(arg0:boolean)=>void;
}

export const useConnectStore= create<ConnectState>((set) => ({
  mobileMenuOpen: false,
  setMobileMenuOpen:(arg0:boolean)=>{
    console.log("set MobileMenuOpen",arg0)
    set((state:ConnectState)=>{
      console.log("zustand state",state)
      return (
      {mobileMenuOpen:state.mobileMenuOpen=arg0}
      )})
    },
}));
export type  UseConnectStore=ReturnType<typeof useConnectStore>;

