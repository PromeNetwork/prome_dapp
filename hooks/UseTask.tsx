import {useEffect ,useMemo, useState} from "react";
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
  } from '@tanstack/react-query'
  
export type  TaskType ='FOLLOW_TWITTER' | 'INTERACT_TWITTER' | 'JOIN_TELEGRAM' | 'LOGIN_WALLET' | 'VERIFY_EMAIL' | 'QUESTION'|'SHARE'
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
            const response = await fetch(`http://127.0.0.1:3000/task/tasks/${address}`)
            if (!response.ok) {
            throw new Error('Network response was not ok')
            }
            return response.json()
        },
    })
    return {isPending, error, data}
  }
    
