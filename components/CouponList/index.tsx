import { Input, Button} from "@material-tailwind/react";
import { useCouponQuery } from "@hooks/UseTask";
export default function CouponList({address}:{address:string|undefined}) {
  const {isPending, error, data}= useCouponQuery(address!)
    return (
        <>{
        !error&&!isPending&&data&&data.length>0?
        <div className="flex  bg-card  flex-col gap-6">
        {data.map((coupon) => (
          <div className="flex flex-row   px-8  bg-white/[0.05]  rounded-md  " key={coupon.id!}>
            <div className={`basis-10/12    py-6 ${coupon.status==0?"text-white/[0.9]":"text-font"}`}>
              <p>coupons</p>
            <div
            className=" flex items-center  w-full   text-font " >
            <p className={`text-lg text-left w-full ${coupon.status==0?"text-connect":"text-font"}`}>{coupon.code}</p>
            </div>
          </div>
          <div className="basis-2/12 py-6 text-white/[0.9] text-center flex flex-col justify-center border-l-2 border-dashed border-black">
            { coupon.status==1?"Valid":"Used"}
          </div>
          </div>
        ))
        }
        </div>:<div className="text-center text-gray-500">No coupons available</div>
        }</>);
    }