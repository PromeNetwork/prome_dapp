import {useEffect ,useMemo, useState} from "react";
const base_url=process.env.BASE_URL
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
  } from '@tanstack/react-query'
 import {Coupon } from '@api/index'
  
export type  TaskType ='FOLLOW_TWITTER' | 'INTERACT_TWITTER'| 'LIKE_TWEETER' | 'JOIN_TELEGRAM' | 'LOGIN_WALLET' | 'VERIFY_EMAIL' | 'QUESTION'|'SHARE'
export interface Task {
   //任务id
    id:  number,
    type: TaskType,
    address:string,
    status: 'complete' | 'incomplete',
     
  }
export function useTaskQuery(address?:string,progress?:number):{isPending:boolean,error:Error|null,data:Task[] | undefined}{
    const { isPending, error, data }= useQuery({
        queryKey: [address,progress],
        queryFn: async () => {
            if(!address){
                return []
            }
            const response = await fetch(`${base_url}/task/tasks/${address}`)
            if (!response.ok) {
            throw new Error('Network response was not ok')
            }
            return response.json()
        },
    })
    return {isPending, error, data: data?data.data:[]}
  }


export function useCouponQuery(address?:string):{isPending:boolean,error:Error|null,data:Coupon[] | undefined}{
    const { isPending, error, data }= useQuery({
        queryKey: [address],
        queryFn: async () => {
            if(!address){
                return []
            }
            const response = await fetch(`${base_url}/task/coupons/${address}`)
            if (!response.ok) {
            throw new Error('Network response was not ok')
            }
            return response.json()
        },
    })
    return {isPending, error, data: data?data.data:[]}
  }
