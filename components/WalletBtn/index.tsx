import { Loader } from "@components/index";
import Image from "next/image";
import { useState } from "react";
import { Dialog,
  DialogHeader,
  DialogBody,
  Button,
  DialogFooter, Popover, PopoverHandler, PopoverContent
} from "@material-tailwind/react";
import { toast } from 'react-hot-toast';
import {processStringLength} from "@utils/process";
interface Props {
  children?: string | JSX.Element;
  width?: number;
  loading?: boolean;
  disconnected?: () => void;
  [x: string]: any;
}

export default function WalletBtn(props: Props) {
  const {  account, disconnected, loading, ...rest } = props;
  const copyAddress = () => {
    navigator.clipboard.writeText(account.address);
    toast.success('Copied to clipboard');
  }

  const renderBtn = () => {
    return (<div className="flex flex-row"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAjVBMVEVHcExneuFzaugj5rKJT/UyzMBBtMpYlNaRSfse8KhQnNNKpdB1Z+ldiNyJT/VIucU0ycJVktcZ+Z6XRf8m4bdanNdFrswp27tigd5Yj9hGq82LTvaVR/1Qm9Mg7KxKpdBtcuQl5LVkfeBFrsxdiNyDVPI/uMh7X+0b9qEp3LtVktc5wcV0aOkzysEu0r6VnneeAAAAG3RSTlMAt3e9vG+6DHNwvL67vU8Xvbrc2kcrnb3YyNWr1DRIAAAA1klEQVQokZ3R2RKCMAxAUUFBARFccEVANtnk/z/PNKkUkaEz3tczgaadzaRpmKEZ36Fdk7x+vdryAQVQQe2YWWECWoOWXIPOtvf7UIuAm5JWoGGS5x+lTzNT43RUHRxUFNvemqZl6bruuu7pNGc58hWnW45GlmXPponiOK2q/kp0O16n34fWUDegzyaKhNLsgfQ21HxK2Tu0bemhrj6Kx+IKw/J1/s9ZUGuo/w74R9+/seg6xKGPDME67a2EtvcxYrGSOTSYzbheeiZm6R3OdDs/qSz5im/DuDfiWB5adgAAAABJRU5ErkJggg==" alt="solalan" className="w-5 h-5" /><span className="ml-6">{processStringLength(account.address)}</span></div>)
  }
  return (
    <>{!loading && account ? <Popover placement="bottom-start">
      <PopoverHandler>
        <Button className={`flex items-center justify-center py-2  font-semibold border-solid border border-connect hover:bg-black rounded-3xl  ${loading && "cursor-not-allowed opacity-50"}`}>{renderBtn()}</Button>
      </PopoverHandler>
      <PopoverContent className="w-50 bg-transparent border-0 px-0">
        <div className="flex flex-col  items-center gap-3">

          <Button className="flex   items-center gap-3 w-full rounded-3xl   border border-solid border-connect hover:bg-black " onClick={copyAddress}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M7.5 3.375c0-1.036.84-1.875 1.875-1.875h.375a3.75 3.75 0 0 1 3.75 3.75v1.875C13.5 8.161 14.34 9 15.375 9h1.875A3.75 3.75 0 0 1 21 12.75v3.375C21 17.16 20.16 18 19.125 18h-9.75A1.875 1.875 0 0 1 7.5 16.125V3.375Z" />
              <path d="M15 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 17.25 7.5h-1.875A.375.375 0 0 1 15 7.125V5.25ZM4.875 6H6v10.125A3.375 3.375 0 0 0 9.375 19.5H16.5v1.125c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V7.875C3 6.839 3.84 6 4.875 6Z" />
            </svg>

            Copy Address
          </Button>
          <Button className="flex   items-center gap-3 w-full rounded-3xl border border-solid border-connect hover:bg-black " onClick={disconnected}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M16.5 3.75a1.5 1.5 0 0 1 1.5 1.5v13.5a1.5 1.5 0 0 1-1.5 1.5h-6a1.5 1.5 0 0 1-1.5-1.5V15a.75.75 0 0 0-1.5 0v3.75a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5.25a3 3 0 0 0-3-3h-6a3 3 0 0 0-3 3V9A.75.75 0 1 0 9 9V5.25a1.5 1.5 0 0 1 1.5-1.5h6ZM5.78 8.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 0 0 0 1.06l3 3a.75.75 0 0 0 1.06-1.06l-1.72-1.72H15a.75.75 0 0 0 0-1.5H4.06l1.72-1.72a.75.75 0 0 0 0-1.06Z" clipRule="evenodd" />
            </svg>

            Disconnect
          </Button>
        </div>
      </PopoverContent>
    </Popover> : <Loader size={5} />}
    </>
  );
}
