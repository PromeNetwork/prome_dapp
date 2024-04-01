import swr from 'swr'


export const useInfo=(address:string)=>{
    const swrRes=swr('/member/auth/info',
    async ()=>{
       return  await fetch('/member/auth/info')
       .then(res=>res.json())
       .then(res=>res.data)
       }
    )
    return swrRes
}