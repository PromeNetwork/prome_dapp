import Image,{StaticImageData} from 'next/image'

export default function Icon(icon:  {src:StaticImageData,isSelect:boolean}) {
    return (
        <>
            <Image
               alt='icon'
              className={icon.isSelect ? "w-9 h-9 rounded-full   border-connect border-[1px] text-connect":"w-9 h-9 rounded-full p-2 border-[1px] border-white" }
              src={icon.src}
            />

        </>
    )
}