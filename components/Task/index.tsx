import { TaskCard, Icon, CouponList } from "../index";
import UnTwitter from "@images/UnTwitter.png";
import UnTelegram from "@images/telegram.png";
import UnEmail from "@images/email.png";
import UnConnect from "@images/prome.png";
import UnQuestion from "@images/question.png";
import UnShare from "@images/share.png";
import Image from "next/image";
import UnQr from "@images/qrcode.png";
import * as api from "@api/index";
import { Button, Input, Select, Option } from "@material-tailwind/react";
import { useCountries } from "use-react-countries";
import { signMessage } from '@wagmi/core'
import { useState, cloneElement, useEffect, useCallback, FormEventHandler, FormEvent } from "react";
import { DocumentDuplicateIcon } from "@heroicons/react/20/solid";
import {useAccount} from "wagmi";
import { toast } from 'react-hot-toast';
import { useTaskQuery ,type Task,type  TaskType } from "@hooks/index";
import { recoverMessageAddress } from 'viem'
import { useWallet } from "@solana/wallet-adapter-react";
import { User, Question} from '@api/index'
import {autoSignIn,CountdownButton } from '@components/index'
import { useUserContext } from "../index";
import {useCouponQuery} from '@hooks/index'
type LoadingType = {
    [k in TaskType]:boolean
}
function TaskInner(props: { task?: Task[] ,step:number, account?:{address:string},setProgress:(process:number)=>void}) {
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const { countries } = useCountries();
    const [questionnaire, setQuestionnaire] = useState<Question>({
        country: "",
        equipment: "",
        brand: "",
        consumption: "",
    });
    const { account,step } = props;
    const { user , loginWallet }=useUserContext();

 
    const taskStatus:{
      [k in TaskType]?:'complete'|'incomplete'
    }={
        FOLLOW_TWITTER:'incomplete',
        INTERACT_TWITTER:'incomplete',
        JOIN_TELEGRAM:'incomplete',
        LOGIN_WALLET:'incomplete',
        VERIFY_EMAIL:'incomplete',
        QUESTION:'incomplete',
        SHARE:'incomplete',
        LIKE_TWEETER:'incomplete'

    }
    //*****************************questionnaire */

    const selectEquip = useCallback((value?: string) => {
      console.log(value);
        setQuestionnaire({ ...questionnaire, equipment: value });
      },[questionnaire])

    const onCountryChange = useCallback((value?: string) => {
      console.log(value);
        setQuestionnaire({ ...questionnaire, country: value });
      },[questionnaire])
      const onBrandChange = useCallback((event :FormEvent<HTMLInputElement>) => {
      
        console.log(event.currentTarget.value);
        setQuestionnaire({ ...questionnaire, brand: event.currentTarget.value});
      },[questionnaire])
      const onConsumptionChange = useCallback((event :FormEvent<HTMLInputElement>) => {
        console.log(event.currentTarget.value);
        setQuestionnaire({ ...questionnaire, consumption: event.currentTarget.value });
      },[questionnaire])




    /*************end questionnaire */
    props.task?.forEach((task)=>{
        taskStatus[task.type]=task.status
    })

   const summitQuestionnaire=async ()=>{
    if (!onVerifyBefore()) {
        return;
      }
      if(!questionnaire.country||!questionnaire.equipment||!questionnaire.brand||!questionnaire.consumption){
        toast.error('Please fill out the questionnaire');
        return;
      }
      setLoadings({...loadings,QUESTION:true})
      const questionAnswer :Omit<User,'uid'|'code'>&{question:Question} ={
           question:questionnaire,
           address:account?.address!
      }
      await api.login.submitQuestionnaire(questionAnswer)
      setLoadings({...loadings,QUESTION:false})
      toast.success('Successfully verified Email');
      props.setProgress(1)
       
   }
   const submitEmail=async ()=>{
    if (!onVerifyBefore()) {
        return;
      }
      setLoadings({...loadings,VERIFY_EMAIL:true})
      const user:Omit<User,'uid'> ={
          email:email,
          code:'',
          address:account?.address!
      }
      await api.login.submitEmail(user)
      setLoadings({...loadings,VERIFY_EMAIL:false})
      toast.success('Successfully verified Email');
      props.setProgress(1)
    }
    /**
     * 
     */
    const  [loadings,setLoadings]=useState<LoadingType>({
        FOLLOW_TWITTER:false,
        INTERACT_TWITTER:false,
        JOIN_TELEGRAM:false,
        LOGIN_WALLET:false,
        VERIFY_EMAIL:false,
        QUESTION:false,
        LIKE_TWEETER:false,
        SHARE:false
    })
   
    const onEmailChange = ({ target }:{target:{value:any}}) => setEmail(target.value);
    const onCodeChange = ({ target }:{target:{value:any}}) => setCode(target.value);

    const onVerifyBefore = () => {
        console.log("account", account);
        if (!account||!account.address) {
             toast.error('You must connect your wallet first');
             return false;
        }
        return true
      }
      const connectWallet=async ()=>{ 
           await loginWallet()
        }

      const verifyTwitter = () => {
        if (!onVerifyBefore()) {
          return;
        }
        setLoadings({...loadings,FOLLOW_TWITTER:true})
        setTimeout(() => {
            setLoadings({...loadings,FOLLOW_TWITTER:false})
            toast.success('Successfully verified Twitter');
            props.setProgress(1)
            }, 2000);
       
      }
    
      
      return (<>
        <div className="bg-card px-8 py-10">
          <div className="text-white/[0.8] text-[1.313rem] mb-8">Tasks</div>
          <div className="h-3 w-full rounded-2xl  bg-[#595959]">
            <div
              className="h-3 h-full rounded-2xl bg-connect"
              style={{ width: (step / 6) * 100 + "%" }}
            ></div>
          </div>
          <div className="mt-4 ">
            <p className="text-xs text-white/[0.8]">
              {step}/6 task(s) complete
            </p>
          </div>
        </div>
        <div className="bg-card px-8 py-10 mt-5">
          <TaskCard
            task={{
              status: taskStatus['FOLLOW_TWITTER']!,
              title: <p>Follow <a href='' target='_bank' className="border-b ">PROME Network</a>  on Twitter</p>,
              icon: { src: UnTwitter, isSelect: true },
            }}
          >
            <div className="block bg-card">
              <Button loading={loadings?.FOLLOW_TWITTER } className="rounded-3xl  bg-connect text-btn/[0.8] text-xs" onClick={verifyTwitter}>
                Verify
              </Button>
            </div>
          </TaskCard>
          <TaskCard
            task={{
              status: taskStatus['INTERACT_TWITTER']=="complete"&&taskStatus['LIKE_TWEETER']=="complete"?'complete':'incomplete',
              title: "Interact with the following tweets on Twitter",
              icon: { src: UnTwitter, isSelect: true },
            }}
          >
            <div className="block bg-card  border-b border-font">
              <div className="py-6">
                <p className="text-xs text-connect mb-2">
                01. Retweet @Prome_Network on Twitter
                </p>
                <Button
                 loading={loadings?.INTERACT_TWITTER }
                  autoCapitalize="true"
                  className="flex items-center gap-3 w-full rounded-full border-[1px] text-font "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      d="M15.75 2.25H21a.75.75 0 0 1 .75.75v5.25a.75.75 0 0 1-1.5 0V4.81L8.03 17.03a.75.75 0 0 1-1.06-1.06L19.19 3.75h-3.44a.75.75 0 0 1 0-1.5Zm-10.5 4.5a1.5 1.5 0 0 0-1.5 1.5v10.5a1.5 1.5 0 0 0 1.5 1.5h10.5a1.5 1.5 0 0 0 1.5-1.5V10.5a.75.75 0 0 1 1.5 0v8.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V8.25a3 3 0 0 1 3-3h8.25a.75.75 0 0 1 0 1.5H5.25Z"
                      clipRule="evenodd"
                    />
                  </svg>
  
                  <p>Retweet the tweet</p>
                </Button>
              </div>
              <div></div>
            </div>
            <div className="block bg-card">
              <div className="py-6">
                <p className="text-xs text-connect mb-2">
                02. Like  @Prome_Network on Twitter
                </p>
                <Button
                loading={loadings?.LIKE_TWEETER }
                  autoCapitalize="true"
                  className="flex items-center gap-3 w-full rounded-full border-[1px] text-font "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      d="M15.75 2.25H21a.75.75 0 0 1 .75.75v5.25a.75.75 0 0 1-1.5 0V4.81L8.03 17.03a.75.75 0 0 1-1.06-1.06L19.19 3.75h-3.44a.75.75 0 0 1 0-1.5Zm-10.5 4.5a1.5 1.5 0 0 0-1.5 1.5v10.5a1.5 1.5 0 0 0 1.5 1.5h10.5a1.5 1.5 0 0 0 1.5-1.5V10.5a.75.75 0 0 1 1.5 0v8.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V8.25a3 3 0 0 1 3-3h8.25a.75.75 0 0 1 0 1.5H5.25Z"
                      clipRule="evenodd"
                    />
                  </svg>
  
                  <p>Like the tweet</p>
                </Button>
              </div>
              <div></div>
            </div>
          </TaskCard>
          {/* <TaskCard
            task={{
              status: "incomplete",
              title: "Join PROME Network on Telegram",
              icon: { src: UnTelegram, isSelect: true },
            }}
          >
            <div className="block bg-card">
              <Button className="rounded-3xl  bg-connect text-btn/[0.8] text-xs">
                Verify
              </Button>
            </div>
          </TaskCard> */}
          <TaskCard
            task={{
              status: taskStatus['LOGIN_WALLET']!,
              title: "Connect Wallet and interact with PROME DApp",
              icon: { src: UnConnect, isSelect: true },
            }}
          >
            <div className="block bg-card">
              <Button 
              loading={loadings?.LOGIN_WALLET }
               className="rounded-3xl  bg-connect text-btn/[0.8] text-xs" onClick={()=>connectWallet()}>
                Connect Wallet
              </Button>
            </div>
          </TaskCard>
          <TaskCard
            task={{
              status: taskStatus['VERIFY_EMAIL']!,
              title: "Verify your email",
              icon: { src: UnEmail, isSelect: true },
            }}
          >
            <div className="block bg-card  ">
              <div className="py-6">
                
                <p className="text-xs text-connect mb-2">Verify Your Email</p>
                <div className="relative flex w-full bg-blue">
                  <Input
                    crossOrigin={"true"}
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={onEmailChange}
                    className=" border rounded-full py-4bg-card  bg-card py-4 text-white"
                  />
                </div>
                <div className="flex flex-row mt-4 ">
                  <div className="relative flex w-3/4 items-end">
                    <Input
                    crossOrigin={"true"}
                      type="text"
                      placeholder="code"
                      value={code}
                      className="outline outline-0 focus:outline-1   bg-btn border rounded-full py-4  bg-card  text-white"
                      onChange={onCodeChange}
                    />
                
                  </div>
                  <CountdownButton  email={email}/>
                </div>
              </div>
              <Button 
              loading={loadings?.VERIFY_EMAIL }
              className="rounded-3xl  bg-connect text-btn/[0.8] text-xs mt-8 px-6" onClick={submitEmail}>
                    Submit
                  </Button>
            </div>
          </TaskCard>
          <TaskCard
            task={{
              status: taskStatus['QUESTION']!,
              title: "Q&A",
              icon: { src: UnQuestion, isSelect: true },
            }}
          >
            <div className="block bg-card">
              <div className="py-6">
                <p className="text-xs text-connect mb-2">
                  01. Retweet @Prome_Network on Twitter
                </p>
                <form className="mt-2 mb-8 w-full max-w-screen-lg ">
                  <div>
                    <p className="text-sm text-white mt-4 mb-3">
                      01. Country/Region
                    </p>
                    <Select
                      size="lg"
                      label="Select Country"
                      onChange={onCountryChange}
                      selected={(element) =>
                        element&&
                        cloneElement(element, {
                          disabled: true,
                          className:
                            "flex items-center opacity-100 px-0 gap-2 pointer-events-none",
                        })
                      }
                    >
                      {countries.map(({ name, flags }:{name:string, flags:{svg: string}}) => (
                        <Option
                          key={name}
                          value={name}
                          className="flex items-center gap-2"
                        >
                          <Image
                           width={20}
                           height={20}
                            src={flags.svg}
                            alt={name}
                            className="h-5 w-5 rounded-full object-cover"
                          />
                          {name}
                        </Option>
                      ))}
                    </Select>
                  </div>
                  <div>
                    <p className="text-sm text-white mt-4 mb-3">
                      02. Whether there is a photovoltaic equipment at your home?
                    </p>
                    <Select label="Select " onChange={selectEquip}>
                      <Option value="yes">Yes</Option>
                      <Option value="no">No</Option>
                    </Select>
                  </div>
                  <div>
                    <p className="text-sm text-white mt-4 mb-3">
                      03. If the previous answers is YES, please specify the brand
                      and model of the photovoltaic equipment.
                    </p>
                    <Input
                    onInputCapture={onBrandChange}
    
                    crossOrigin={"true"}
                      label="Enter"
                      type="text"
                      placeholder="Brand and Model"
                      className=" border rounded-full py-4bg-card  bg-card py-4 text-white"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-white mt-4 mb-3">
                      04. Your daily household electricity consumption
                    </p>
                    <Input crossOrigin={"true"} label="consumption" icon={<span>kWh</span>}  onInput={onConsumptionChange} />
                  </div>
                  <Button 
                  loading={loadings?.QUESTION }
                  className="rounded-3xl  bg-connect text-btn/[0.8] text-xs mt-8 px-6" onClick={summitQuestionnaire}>
                    Submit
                  </Button>
                </form>
              </div>
              <div></div>
            </div>
          </TaskCard>
          <TaskCard
            task={{
              status: taskStatus['SHARE']!,
              title: "Share this airdrop with your friend",
              icon: { src: UnShare, isSelect: true },
            }}
          >
            <div className="block bg-card">
              <div className="py-4">
                <p className="text-xs text-connect mb-2">
                  Share this airdrop with your friend
                </p>
                <div>
                  <p className="text-sm text-white mt-4 mb-3">
                    Copy the link and share it
                  </p>
                  <Input
                  crossOrigin={"true"}
                    label="consumption"
                    className="rounded-full"
                    value={user?`http://localhost:3000?code=${user?.code}`:"http://localhost:3000"}
                    icon={<DocumentDuplicateIcon />}
                  />
                </div>
                <div>
                  <p className="text-sm text-white mt-4 mb-3">or share it via</p>
                  <div className="flex flex-row">
                    <Image
                      className=" mr-2 w-12 h-12 rounded-full p-2 border-[1px] border-white "
                      src={UnTwitter}
                      alt="twitter"
                    />
                    <Image
                      className="mr-2  w-12 h-12 rounded-full  "
                      src={UnTelegram}
                      alt="telegram"
                    />
                    <Image
                      className="mr-2  w-12 h-12 rounded-full "
                      src={UnQr}
                      alt="qrcode"
                    />
                  </div>
                  <div>
  
                  </div>
                  <p className="text-xs text-connect mb-6 mt-8 pt-10 border-t border-font border-solid" >
                    Share this airdrop with your friend
                  </p>
                  <Button 
                  loading={loadings?.SHARE }
                  className="rounded-3xl  bg-connect text-btn/[0.8] text-xs">
                 Verify Task(s)
              </Button>
                </div>
              </div>
            </div>
          </TaskCard>
        </div>
        <div className="bg-card px-8 py-10 mt-5">
        <div className="text-white/[0.8] text-[1.313rem] mb-8">Coupons</div>
        <CouponList  address={account?.address}/>
        </div>
      </>)


}

export default function Task() {
  const [email, setEmail] = useState("");
  const [Coupons, setCoupons] = useState(['weqweqweqwewqeqwe','qeqweqweqweqwe'])
  const [code, setCode] = useState("");
  const { countries } = useCountries();
  const account = useWallet();
  const [progress, setProgress] = useState(0)

  const {isPending, error, data } = useTaskQuery(account.publicKey?.toBase58(), progress)
    if (isPending) {
        return <div>Loading...</div>
    }
    if(!!error){
        return <div>Error</div>
    }
    let currentProcess=0
    console.log(data)
    if(data){
        data.forEach((task)=>{
            if(task.status==='complete'){
                currentProcess+=1
            }
        })
    }
  return (
    <TaskInner task={data} account={{address: account.publicKey?.toBase58()!}} step={currentProcess}  setProgress={(add)=>setProgress(currentProcess + add)}/>
  );
}


