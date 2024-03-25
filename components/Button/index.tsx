import { Loader } from "@components/index";
import Image from "next/image";
import { useState } from "react";
import { Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter, Popover, PopoverHandler, PopoverContent
} from "@material-tailwind/react";
import {Button } from "@material-tailwind/react/components/Button";
import { toast } from 'react-hot-toast';
interface Props {
  children?: string | JSX.Element;
  width?: number;
  loading?: boolean;
  disconnected?: () => void;
  [x: string]: any;
}
/**
 * 
 * @param props <Popover placement="bottom-start">
      <PopoverTrigger>
      <MButton 
      className={`flex items-center justify-center  font-semibold border-solid border border-connect  hover:bg-black rounded-3xl ${
        width && `w-${width}`
      } ${loading && "cursor-not-allowed opacity-50"}`}
      disabled={loading}
    >
     {<Image src={chain?.iconUrl} alt={chain} width={20} height={20} />{account.displayName}</>}
      </MButton>
      </PopoverTrigger>
      <PopoverContent className="w-72">
      <List className="p-0">
          <a href="#" className="text-initial font-medium text-blue-gray-500">
            <ListItem>
              <ListItemPrefix>
                <svg
                  width="14"
                  height="16"
                  viewBox="0 0 14 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M1 2C1 1.46957 1.21071 0.960859 1.58579 0.585786C1.96086 0.210714 2.46957 0 3 0H11C11.5304 0 12.0391 0.210714 12.4142 0.585786C12.7893 0.960859 13 1.46957 13 2V14C13.2652 14 13.5196 14.1054 13.7071 14.2929C13.8946 14.4804 14 14.7348 14 15C14 15.2652 13.8946 15.5196 13.7071 15.7071C13.5196 15.8946 13.2652 16 13 16H10C9.73478 16 9.48043 15.8946 9.29289 15.7071C9.10536 15.5196 9 15.2652 9 15V13C9 12.7348 8.89464 12.4804 8.70711 12.2929C8.51957 12.1054 8.26522 12 8 12H6C5.73478 12 5.48043 12.1054 5.29289 12.2929C5.10536 12.4804 5 12.7348 5 13V15C5 15.2652 4.89464 15.5196 4.70711 15.7071C4.51957 15.8946 4.26522 16 4 16H1C0.734784 16 0.48043 15.8946 0.292893 15.7071C0.105357 15.5196 0 15.2652 0 15C0 14.7348 0.105357 14.4804 0.292893 14.2929C0.48043 14.1054 0.734784 14 1 14V2ZM4 3H6V5H4V3ZM6 7H4V9H6V7ZM8 3H10V5H8V3ZM10 7H8V9H10V7Z"
                    fill="#90A4AE"
                  />
                </svg>
              </ListItemPrefix>
              ABC Construction
            </ListItem>
          </a>
          <a href="#" className="text-initial font-medium text-blue-gray-500">
            <ListItem>
              <ListItemPrefix>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 1C0 0.734784 0.105357 0.48043 0.292893 0.292893C0.48043 0.105357 0.734784 0 1 0H3.153C3.38971 0.000108969 3.6187 0.0841807 3.79924 0.23726C3.97979 0.390339 4.10018 0.602499 4.139 0.836L4.879 5.271C4.91436 5.48222 4.88097 5.69921 4.78376 5.89003C4.68655 6.08085 4.53065 6.23543 4.339 6.331L2.791 7.104C3.34611 8.47965 4.17283 9.72928 5.22178 10.7782C6.27072 11.8272 7.52035 12.6539 8.896 13.209L9.67 11.661C9.76552 11.4695 9.91994 11.3138 10.1106 11.2166C10.3012 11.1194 10.5179 11.0859 10.729 11.121L15.164 11.861C15.3975 11.8998 15.6097 12.0202 15.7627 12.2008C15.9158 12.3813 15.9999 12.6103 16 12.847V15C16 15.2652 15.8946 15.5196 15.7071 15.7071C15.5196 15.8946 15.2652 16 15 16H13C5.82 16 0 10.18 0 3V1Z"
                    fill="#90A4AE"
                  />
                </svg>
              </ListItemPrefix>
              00 123 456 789
            </ListItem>
          </a>
          <a href="#" className="text-initial font-medium text-blue-gray-500">
            <ListItem>
              <ListItemPrefix>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.00299 5.884L9.99999 9.882L17.997 5.884C17.9674 5.37444 17.7441 4.89549 17.3728 4.54523C17.0015 4.19497 16.5104 3.99991 16 4H3.99999C3.48958 3.99991 2.99844 4.19497 2.62717 4.54523C2.2559 4.89549 2.03259 5.37444 2.00299 5.884Z"
                    fill="#90A4AE"
                  />
                  <path
                    d="M18 8.11798L10 12.118L2 8.11798V14C2 14.5304 2.21071 15.0391 2.58579 15.4142C2.96086 15.7893 3.46957 16 4 16H16C16.5304 16 17.0391 15.7893 17.4142 15.4142C17.7893 15.0391 18 14.5304 18 14V8.11798Z"
                    fill="#90A4AE"
                  />
                </svg>
              </ListItemPrefix>
              person@example.com
            </ListItem>
          </a>
        </List>
      </PopoverContent>
    </Popover>
 * @returns 
 */
export default function WalletBtn(props: Props) {
  const { chain, account, disconnected, width, loading, ...rest } = props;
  console.log("chain", chain);
  const copyAddress = () => {
    navigator.clipboard.writeText(account.address);
    toast.success('Copied to clipboard');
  }
  const renderBtn = () => {
    return (<div className="flex flex-row"><img src={chain.iconUrl} alt={chain.name} className="w-5 h-5" /><span className="ml-6">{account.displayName}</span></div>)
  }
  return (
    <>{!loading && chain && account ? <Popover placement="bottom-start">
      <PopoverHandler>
        <Button className={`flex items-center justify-center py-2  font-semibold border-solid border border-connect hover:bg-black rounded-3xl ${width && `w-${width}`} ${loading && "cursor-not-allowed opacity-50"}`}>{renderBtn()}</Button>
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
