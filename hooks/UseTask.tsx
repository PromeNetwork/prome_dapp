import {useEffect ,useMemo, useState} from "react";
const API_URL = process.env.API_URL
console.log("use task API_URL",API_URL)
import {
    useQuery,
  } from '@tanstack/react-query'
 import {Coupon } from '@api/index'
 import {getToken} from '@components/index'
  
export type  TaskType ='FOLLOW_TWITTER' | 'INTERACT_TWITTER'| 'LIKE_TWEETER' | 'JOIN_TELEGRAM' | 'LOGIN_WALLET' | 'VERIFY_EMAIL' | 'QUESTION'|'SHARE'
export interface Task {
   //任务id
    id:  number,
    type: TaskType,
    address:string,
    status: 'complete' | 'incomplete',
     
  }
export function useTaskQuery(address?:string,progress?:number):{isPending:boolean,error:Error|null,data:Task[] | undefined}{
  console.log("createQueryTask",address,progress)
    const { isPending, error, data }= useQuery({
        queryKey: [address,progress],
        queryFn: async () => {
            if(!address){
                return []
            }
            console.log("useTaskQuery",address,progress)
            const token =await getToken(address)
            const response = await fetch(`${API_URL}/task/tasks/${address}`,{
                method: 'GET',
                headers: {
                  'Authorization': 'Bearer ' +  token
                }
              })
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
            const response = await fetch(`${API_URL}/task/coupons/${address}`)
            if (!response.ok) {
            throw new Error('Network response was not ok')
            }
            return response.json()
        },
    })
    return {isPending, error, data: data?data.data:[]}
  }
