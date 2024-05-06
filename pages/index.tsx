
import {ProductDescribe ,Shape,Task ,Event, Footer}from '../components/index';
import Image from 'next/image';
import  Enenge from '@images/enenge.png';
export default function Home() {

  return (
    <>
        <div className="lg:bg-gradient-to-b md:bg-gradient-to-b  lg:pl-32 md:pl-8 sm:pl-8 lg:from-[#2A2F32] lg:to-[#1E1F20] md:from-[#2A2F32] md:to-[#1E1F20]">
        <div className="mx-auto  flex lg:flex-row md:flex-row  phone:flex-col-reverse lg:py-[2rem] md:py-[2rem] phone:pb-[2rem]  ">
          <ProductDescribe/>
          <div className="bg-transparent basis-3/5  w-50 lg:h-[33.75rem]  phone:left-[20%] text-right flex flex-row justify-end">
          {<Image src={Enenge}  alt="energy" className="bg-transparent pointer-events-none  lg:absolute md:absolute aspect-auto lg:max-w-[1240px]  lg:w-4/6  md:w-4/6  right-0 top-0 " />}
          </div>
        </div>
        </div>
        <div
          className="flex lg:px-32 md:px-10 justify-between lg:mt-5 lg:flex-row  md:flex-col-reverse  sm:flex-col-reverse phone:flex-col-reverse w-full min-h-[45.625rem] bg-[#191919] pb-40"
          aria-hidden="true"
        >
          <div className="flex-auto lg:mr-5 md::pr-5 sm:pr-5 bg:bg-[#191919] md:bg-[#191919] sm:bg-card md:mt-5 sm:mt-5 phone:mt-5 phone:px-4">
            <Task/>

          </div>
          <div className="min-w-fit flex-1 lg:mt-5 md:mt-5 ">
           <Event event={{startTime:"2024-04-22 21:00:00", endTime: "2024-05-30 21:00:00"}}  />
          </div>

          </div>
          <Footer/>
        </>
  )
}



