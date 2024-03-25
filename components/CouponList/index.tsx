import { Input, Button} from "@material-tailwind/react";
export default function CouponList({ coupons }: { coupons: string[] }) {
    return (
        <>{
        coupons&&coupons.length>0?
        <div className="flex  bg-card  flex-col gap-6">
        {coupons.map((coupon) => (
            <Button
            key={coupon}
            autoCapitalize="true"
            className=" flex items-center gap-lg w-full rounded-full border-[1px] text-font "
          >
            <p className="text-lg text-center w-full">{coupon}</p>
          </Button>
        ))
        }
        </div>:<div className="text-center text-gray-500">No coupons available</div>
        }</>);
    }