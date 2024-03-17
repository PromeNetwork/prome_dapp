import useSWR from "swr"
import { useEffect } from "react"
import {AxiosInstance} from 'axios'

export const refreshToken=(service:AxiosInstance)=>(token:string)=>{
    const swrRes=useSWR('/member/auth/refresh-token',
    async ()=>{
       return  await service({
            url:'/member/auth/refresh-token',
            method:'post',
            params:{'refreshToken':token}
        })
        }
    )
    return swrRes
}

export const userLogin=(service:AxiosInstance)=>async (address:string, signResult:string)=>{
       return  await service({
            url:'/account/register/metamask',
            method:'post',
            data:{'address':address,'signature':signResult}
        })
}