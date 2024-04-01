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
        <div className="basis-2/5 flex flex-col justify-center ">
            <div className="text-white text-[3rem] leading-[2.625rem]  ">
            <p className="py-2">
            <span className="pr-3">Get  </span> <span className="pr-3">FREE</span>  <span className="pr-3">green </span>    <span className="pr-3">energy. </span> 
             </p>
             <div className="text-xl text-white/[0.6] pt-[1.5625rem]">
            <p>
            Contribute to the energy
            </p>
            <p>
            revolution and get permanent rewards!
                </p>
                </div>
            </div>
            <div className="mt-6 text-white/[0.6] text-xs">
              <p>
              PROME Network is rewarding the effective use of green energy and the large-scale adoption of renewable energy infrastructure, motivating more people to participate in the energy revolution, and working together to accelerate decarbonization to achieve a sustainable future.
              </p>
                </div>
               <div className="text-[#CFFF8B]  pt-[2.125rem]">
               <Button className="block w-fit border-b border-font cursor-pointer" onClick={()=>setIsOpen(true)}>Show More</Button>
               </div>
               <Dialog open={isOpen} handler={() => setIsOpen(false)} className=" bg-card  w-[45.625rem] h-[70vh]  overflow-y-scroll">
                    <DialogBody>
                        <Detail/>
                    </DialogBody>
                </Dialog>
           </div>
        </>
    )
}