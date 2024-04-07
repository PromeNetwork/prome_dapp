
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
          {<Image src={Enenge}  alt="energy" className="bg-transparent pointer-events-none  lg:absolute md:absolute aspect-auto  lg:w-4/6  md:w-4/6  right-0 top-0 " />}
          </div>
          {/* <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              Announcing our next round of funding.{' '}
              <a href="#" className="font-semibold text-indigo-600">
                <span className="absolute inset-0" aria-hidden="true" />
                Read more <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Data to enrich your online business
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
              fugiat veniam occaecat fugiat aliqua.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </a>
              <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div> */}
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
           <Event event={{startTime:"2024-03-23 00:00:00", endTime: "2024-04-10 23:59:59"}}  />
          </div>

          </div>
          <Footer/>
        </>
  )
}
