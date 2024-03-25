
import { useState, useCallback, useMemo } from 'react'
import { clearInterval } from 'timers'
import {useCountdown, TimeInfo} from '@hooks/index'
export default function Event(props:{event:{startTime:string,endTime:string}}) {
  const {startTime,endTime }=props.event

  const countDay=useCountdown({deadlineTime:new Date(endTime).getTime(),showMillisecond:false})

  const covertStringToUtc1Time=(time:string)=>{
    const date=new Date(time)
    return date.toUTCString()
  }
    return (
        <div>
            <div className="flex-col p-8 bg-card">
            <div className="text-white/[0.8] text-[1.313rem] mb-8">Event_Time</div>
             {
              startTime&&endTime&&startTime.length>0&&endTime.length>0?
              <div>
<div className="text-group_15 flex-col justify-between pb-8 pt-1 pr-4 border-t border-font">
              <p className="text-connect text-sm">Start</p>
              <p className="text-md text-white/[0.8]">{covertStringToUtc1Time(startTime)}(UTC+1)</p>
            </div>

            <div className="text-group_15 flex-col justify-between pr-4 pb-8 pt-1 border-t border-font">
              <p className="text-connect text-sm">End</p>
              <p className="text-md text-white/[0.8]">{covertStringToUtc1Time(endTime)}(UTC+1)</p>
            </div>
            <div className="text-white/[0.8] text-[1.313rem] mb-8">Event_Count_Down</div>
            <div className="flex flex-row justify-between">
                <div  className="flex-1 flex flex-col gas-2 content-between items-center"><span suppressHydrationWarning className="w-[40px] border border-solid text-connect border-connect rounded-3xl p-2 text-center">{countDay.day}</span> <span className="text-font text-sm">D</span></div>
                <div className="flex-1  flex flex-col gas-2 items-center"><span suppressHydrationWarning className="w-[40px] border border-solid text-connect border-connect rounded-3xl p-2 text-center">{countDay.hours}</span> <span className="text-font text-sm">H</span></div>
                <div className="flex-1  flex flex-col gas-2 items-center"><span suppressHydrationWarning className="w-[40px] border border-solid text-connect border-connect rounded-3xl p-2 text-center">{countDay.minutes}</span> <span className="text-font text-sm">M</span></div>
                <div className="flex-1  flex flex-col gas-2 items-center"><span suppressHydrationWarning className="w-[40px] border border-solid text-connect border-connect rounded-3xl p-2 text-center">{countDay.seconds}</span> <span className="text-font text-sm">S</span></div>
            </div>
              </div>:<div className="text-center text-gray-500">No event available</div>
             }
            </div>
        </div>
    )
    }