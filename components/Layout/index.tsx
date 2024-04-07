import Head from "next/head";
import {ActiveLink,Connect} from "@components/index";
import Image from "next/image";
import { ReactNode,useEffect,useState } from "react";
import { useAccount,useSignMessage,useAccountEffect } from "wagmi";
import * as api from "@api/index";
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Dialog } from '@headlessui/react'


// const navigation = [
//   // { name: 'Product', href: 'product' },
//   // { name: 'Features', href: 'features' },
//   // { name: 'Marketplace', href: 'marketplace' },
//   // { name: 'About', href: 'about' },
// ]

interface Props {
  children?: ReactNode;
}

export default function Layout(props: Props) {
  const { children} = props;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)



  




  return (
    <div className="">
    <header className=" inset-x-0 top-0 z-50 bg-header">
        <nav className="flex items-center justify-between p-3 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">prome</span>
              <p className=" font-pix  text-bd text-font">prome</p>
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            <p className=" font-pix  text-bd text-font">P</p>
            {/* {navigation.map((item) => (
              <ActiveLink key={item.name} href={item.href} activeLinkClass={'text-indigo-600'} >
                <div
                  className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                 {item.name}
                </div>
              </ActiveLink>
            ))} */}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
           <div  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-90">
                   <Connect/>
                  </div>
          </div>
        </nav>
        <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full bg-card overflow-y-auto px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">prome</span>
                <p className=" font-pix  text-bd text-font">prome</p>
              </a>
              {
                      <Connect/>
                  }
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {/* {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))} */}
                </div>
                <div className="py-6">
{/*                  
                  <a href="#" className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                    log ins
                    </a> */}
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>

      {/* <WalletOptionsModal
        open={showWalletOptions}
        setOpen={setShowWalletOptions}
      /> */}

      {/* <div className="absolute w-screen bg-gradient-to-r from-black to-white">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <h4 className="text-2xl font-bold text-white cursor-default">
              NextJS wagmi
            </h4>
          </div>
          {renderButton()}
        </div>
      </div> */}
          <div className="bg-[#2A2F32] lg:bg-discribe md:bg-discribe ">
      {/* <div className="relative isolate  pt-[4rem] "> */}
      {children}
      {/* </div> */}
      </div>
    </div>
  );
}

