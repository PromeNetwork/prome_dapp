import Head from "next/head";
import Link from "next/link";
import {ActiveLink,Connect,  useUserContext} from "@components/index";
import { ReactNode,useEffect,useMemo,useState } from "react";
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Dialog } from '@headlessui/react'
import { useConnectStore, type ConnectState,type UseConnectStore } from "@store/index";

// const navigation = [
//   // { name: 'Product', href: 'product' },
//   // { name: 'Features', href: 'features' },
//   // { name: 'Marketplace', href: 'marketplace' },
//   // { name: 'About', href: 'about' },
// ]

export const metadata = {
  title: "Prome Network",
  description: "Prome Network Contribute to the energy revolution and get permanent rewards!",
  icons: {
    icon: "/icon/favorite.png",
  },
};
interface LayoutProps {
  children: ReactNode;
} 


export default function Layout({children}: LayoutProps) {
  const {mobileMenuOpen,setMobileMenuOpen}= useConnectStore();
  
  console.log("layout", mobileMenuOpen)
  return (
    <div className="">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href={metadata.icons.icon} />
        {/* <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,viewport-fit=cover"/> */}
        <meta name="apple-mobile-web-app-title" content="Prome Network"/>
      </Head>
    <header className=" inset-x-0 top-0 z-50 bg-header">
        <nav className="flex items-center justify-between p-3 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="https://prome.network/" className="-m-1.5 p-1.5">
              <span className="sr-only">prome</span>
              <p className=" font-pix  text-bd text-font">prome</p>
            </a>
          </div>
          {/* <div className="flex lg:hidden">
          <Connect  mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={(arg0:boolean)=>setMobileMenuOpen(arg0)} />
          </div> */}
          <div className="hidden lg:flex lg:gap-x-12">
          <a href="https://prome.network/"><p className=" font-pix  text-bd text-font">P</p></a>
          </div>
          <div className=" lg:flex lg:flex-1 lg:justify-end">
           <div  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-90">
                   <Connect  mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={(arg0:boolean)=>setMobileMenuOpen(arg0)} />
                  </div>
          </div>
        </nav>
      </header>

          <div className="bg-[#2A2F32] lg:bg-discribe md:bg-discribe ">
      {/* <div className="relative isolate  pt-[4rem] "> */}
      {children }
      {/* </div> */}
      </div>
    </div>
  );
}

