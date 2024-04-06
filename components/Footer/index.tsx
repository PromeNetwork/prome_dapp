import UnTwitter from "@images/untwitter.png";
import Image from "next/image";
export default function Footer(){
    return(
        <>
        <div className="bg-footer text-white py-16 lg:px-32 phone:px-6 mt-5 flex lg:flex-row phone:flex-col text-left">
            <div className="grid grid-cols-2 gap-4 basis-1/4 border-t border-white/[0.4]">
            <p className=" font-pix  text-bd text-white ">prome</p>
            </div>
            <div className="basis-1/4 lg:border-t  border-white/[0.4] pt-2 lg:hidden">
             <Image src={UnTwitter} alt="twitter" className="bg-transparent  aspect-auto w-10" />
            </div>
            <div className=" basis-2/4 lg:mx-4 pt-2 phone:mt-2 border-t border-white/[0.4]">
                <p className="text-[0.875rem] ">©2024 PROME Network. All rights reserved.</p>
            </div>
            <div className="basis-1/4 lg:border-t  border-white/[0.4] pt-2 phone:hidden">
             <Image src={UnTwitter} alt="twitter" className="bg-transparent  aspect-auto w-10" />
            </div>
        </div>
        </>
    )
}   