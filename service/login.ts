import useSWR from "swr"
import { useEffect } from "react"
import {AxiosInstance} from 'axios'
import { getToken } from "@components/index"
import { User } from "./dto"

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

export const userLogin=(service:AxiosInstance)=>async (address:string, signResult:string,code?:string):Promise<{token:{accessToken:string}}>=>{
       return  await service({
            url:'/account/register/metamask',
            method:'post',
            data:{'address':address,'signature':signResult,'code':code}
        })
}


export const useInfo=(service:AxiosInstance)=>async (address:string):Promise<User|null>=>{



    try{
       return  await service({
            url:'/account',
            method:'get',
            headers: {'Authorization': 'Bearer ' +  await getToken(address)}
        })
     }catch(err:any){
     console.log(err)
    }
    return null;
}