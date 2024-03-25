import { RadioGroup } from '@headlessui/react'
import { CheckIcon, ClockIcon,ChevronUpIcon,ChevronDownIcon  } from '@heroicons/react/20/solid'

import React, { Children, ReactElement, ReactNode, type ReactDOM } from 'react'
import {StaticImageData} from 'next/image'
import {Icon }from "../index";
import {
    Collapse,
    Button,
    Card,
    Typography,
    CardBody,
  } from "@material-tailwind/react";
export type Task = { 
    status: 'complete' | 'incomplete'
    title: string
    icon: {src: StaticImageData ,isSelect:boolean}

}
export default function TaskCard(props:{task: Task,children?:React.ReactNode}) {
    const [open, setOpen] = React.useState(false);
 
  const toggleOpen = () => setOpen((cur) => !cur);
    const { task ,children } = props
      const completed = (task:Task): ReactElement => {
        return (
            <div className="w-full px-4 py-3 bg-connect/[0.2] border-[1px] border-line">
            <div className="mx-auto w-full flex justify-between leading-none">
                <div className='flex justify-start  items-center'>
               <Icon src={task.icon.src}  isSelect={task.icon.isSelect} />
               <div className="ml-2  text-connect text-[1.125rem] ">{task.title}</div>
               </div>
               <div className="flex  w-[5.25rem] justify-end content-center  items-center">
               <CheckIcon className="h-4 w-4 bg-connect  rounded-full justify-items-center" />
               <div className='ml-2 text-connect'>Done</div>
               </div>

            </div>
            </div>
        );
      }
        const uncompleted = (task:Task,children: React.ReactNode):ReactNode => {
            return (
                <>
                <div className="w-full px-4 py-3 border-[1px] border-line" onClick={toggleOpen}>
                <div className="mx-auto w-full flex justify-between leading-none">
                    <div className='flex justify-start  items-center'>
                   <Icon src={task.icon.src}  isSelect={task.icon.isSelect} />
                   <div className="ml-2  text-[1.125rem] text-font ">{task.title}</div>
                   </div>
                   <div className="flex  w-[5.25rem] justify-end content-center  items-center">
                    {
                       open?<ChevronUpIcon className="h-8 w-10 text-font  rounded-full justify-items-center" />:<ChevronDownIcon className="h-8 w-10 text-font  rounded-full justify-items-center" />
                    }
                   
                   
                   </div>
                </div>
                </div>
                <Collapse open={open} className="overflow-hidden">
                  <Card className="my-4 mx-auto w-10/12 bg-card">
                   <CardBody>
                      
                      {children}
                    {/* </Typography> */}
                </CardBody>
        </Card>
      </Collapse>
                </>
            );
        }
    return (
       <>
       {task.status==='complete'?completed(task):uncompleted(task,children)}  
       </>
    );
    }

