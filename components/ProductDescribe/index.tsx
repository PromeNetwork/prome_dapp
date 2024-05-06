import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
  } from "@material-tailwind/react";
import {Detail} from '@components/index'
import {useState} from 'react'

export default function ProductDescribe(){
    let [isOpen, setIsOpen] = useState(false)

    return(
        <>
        <div className="basis-2/5 flex flex-col justify-center  phone:text-center">
            <div className="text-white text-[3rem] leading-[2.625rem]  ">
            <p className="py-2">
            <span className="pr-3">Get  </span> <span className="pr-3 text-[#CFFF8B]">FREE</span>  <span className="pr-3">green </span>    <span className="pr-3">energy. </span> 
             </p>
             <div className="text-xl text-white/[0.6] pt-[1.5625rem] text-[#CFFF8B] ">
            <p>
            Contribute to the energy revolution and get permanent rewards!
            </p>
                </div>
            </div>
            <div className="mt-6 text-white/[0.6] text-xs">
              <p>
              Join our energy revolution! Free Green Energy and permanent            </p>
              <p> rewards from PROME Network. $300K in rewards waiting!  </p>
                </div>
               <div className="text-[#CFFF8B]  pt-[2.125rem]">
               <p className="block w-fit border-b border-[#CFFF8B]  phone:mx-auto cursor-pointer" onClick={()=>setIsOpen(true)}>Show More</p>
               </div>
               <Dialog open={isOpen} handler={() => setIsOpen(false)} className=" bg-card   h-[70vh]  overflow-y-scroll">
                    <DialogBody>
                        <Detail/>
                    </DialogBody>
                </Dialog>
           </div>
        </>
    )
}