import { Input, Button} from "@material-tailwind/react";
import { useCouponQuery } from "@hooks/UseTask";
export default function CouponList({address}:{address:string|undefined}) {
  debugger
  const {isPending, error, data}= useCouponQuery(address!)
    return (
        <>{
        !error&&!isPending&&data&&data.length>0?
        <div className="flex  bg-card  flex-col gap-6">
        {data.map((coupon) => (
            <Button
            key={coupon.id!}
            autoCapitalize="true"
            className=" flex items-center gap-lg w-full rounded-full border-[1px] text-font "
          >
            <p className="text-lg text-center w-full">{coupon.code}</p>
          </Button>
        ))
        }
        </div>:<div className="text-center text-gray-500">No coupons available</div>
        }</>);
    }