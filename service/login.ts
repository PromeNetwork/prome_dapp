import useSWR from "swr"
import { useEffect } from "react"
import {AxiosInstance} from 'axios'
import { getToken } from "@components/index"
import { User,Question } from "./dto"

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


export const userInfo=(service:AxiosInstance)=>async (address:string):Promise<User|null>=>{


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

export const submitEmail=(service:AxiosInstance)=>async (user:Omit<User,'uid'>):Promise<void>=>{
    return  await service({
        url:'/account/email',
        method:'post',
        headers: {'Authorization': 'Bearer ' +  await getToken(user.address)},
        data:{...user}
    })
}


export const submitQuestionnaire=(service:AxiosInstance)=>async (question:Omit<User,'uid'|'code'>&{question:Question}):Promise<void>=>{
    return  await service({
        url:'/account/questionnaire',
        method:'post',
        headers: {'Authorization': 'Bearer ' +  await getToken(question.address)},
        data:{...question}
    })
}

export const  sendMailCode=(service:AxiosInstance)=>async (address:string,email:string):Promise<void>=>{
    return  await service({
        url:'/account/code/send',
        method:'post',
        headers: {'Authorization': 'Bearer ' +  await getToken(address)},
        data:{'email':email}
    })
}

export const verifyMailCode=(service:AxiosInstance)=>async ({address,email,code}:{address:string,email:string,code:string}):Promise<void>=>{
    return  await service({
        url:'/account/code/verify',
        method:'post',
        headers: {'Authorization': 'Bearer ' +  await getToken(address)},
        data:{'email':email,'code':code, 'address':address}
    })
}