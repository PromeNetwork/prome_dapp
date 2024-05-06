import { TaskCard, Icon, CouponList } from "../index";
import UnTwitter from "@images/untwitter.png";
import UnTelegram from "@images/telegram.png";
import UnEmail from "@images/email.png";
import UnConnect from "@images/prome.png";
import UnQuestion from "@images/question.png";
import { CheckIcon } from '@heroicons/react/20/solid'
import UnShare from "@images/share.png";
import Image from "next/image";
import UnQr from "@images/qrcode.png";
import  SharePic from "@images/share_temp.png";
import { useSession, signIn, signOut } from "next-auth/react"
import * as api from "@api/index";
import Link from "next/link";
import { Button, Input, Select, Option, Dialog, DialogBody } from "@material-tailwind/react";
import { useCountries } from "use-react-countries";
import { useState, cloneElement, useEffect, useCallback, FormEventHandler, FormEvent, useMemo,useRef } from "react";
import { DocumentDuplicateIcon } from "@heroicons/react/20/solid";
import { toast } from 'react-hot-toast';
import { useTaskQuery ,type Task,type  TaskType } from "@hooks/index";
import { useWallet } from "@solana/wallet-adapter-react";
import { User, Question} from '@api/index'
import {autoSignIn,CountdownButton } from '@components/index'
import { useUserContext } from "../index";
import { generateSharePic, useCouponQuery} from '@hooks/index'
import {useConnectStore, useLoginStore } from '@store/index'
const ShareUrl= "https://airdrop.prome.network"
import { useTaskStore, type TaskState } from "@store/index";
type LoadingType = {
    [k in TaskType]:boolean
}
function TaskInner(props: { task?: Task[] , step:number, account?:{address:string},setProgress:(process:number)=>void}) {
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const { countries } = useCountries();
    const [inviteUrl, setInviteUrl] = useState("");
    const [isShowPic, setIsShowPic] = useState(false);
    const { data: session,...res } = useSession()
    // const [showSwitch, setShowSwitch] = useState(false);
   
    // const {complete, setComplete}=useTaskStore((state)=>({complete:state.complete, setComplete:state.setComplete}));
    const completeRef=useRef(false)

    const [questionnaire, setQuestionnaire] = useState<Question>({
        pattern: "Cloud mining machine",
        country: "",
        equipment: "",
        brand: "",
        consumption: "",
    });

    
      
    const { account,step } = props;
    const { data}= useCouponQuery(account?.address!)
    if(data && data.length==2){
      completeRef.current=true
    }else{
      completeRef.current=false
    }
    const {user, setUser} =useLoginStore((state)=>{
      return {user:state.user, setUser:state.setUser}
    })
    // const { user }=useUserContext();
    const {mobileMenuOpen,setMobileMenuOpen}= useConnectStore();
const { wallet }= useWallet()
 
    const taskStatus:{
      [k in TaskType]?:'complete'|'incomplete'|'pending'
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
    const copyUrl = () => {
      navigator.clipboard.writeText(`${ShareUrl}${user&&user?.code?"?code="+user?.code:""}`);
      toast.success('Copied to clipboard');
    }
   
    //*****************************questionnaire */

    const selectEquip = useCallback((value?: string) => {
      console.log(value);
        setQuestionnaire({ ...questionnaire, equipment: value });
      },[questionnaire])
      const selectPatten = useCallback((value?: string) => {
        console.log('selectPatten',value);
      //  setShowSwitch(!showSwitch)
        setQuestionnaire({ ...questionnaire, pattern: value! });
      },[questionnaire])

    const onCountryChange = useCallback((value?: string) => {
      
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

  const renderSelect = () => {
    // console.log("showSwitch",showSwitch )
    console.log("questionnaire pattern",questionnaire.pattern)
  return questionnaire.pattern==="Cloud mining machine"? (
    <>
    </>
  ) : (<>
               <div>
                    <p className="text-sm text-white mt-4 mb-3">
                      02. Country/Region
                    </p>
                    <Select
                      size="lg"
                      label="Select Country"
                      onChange={onCountryChange}
                      className=" text-white"
                      selected={(element) =>
                        element&&
                        cloneElement(element, {
                          disabled: true,
                          className:
                            "flex items-center opacity-100 px-0 gap-2 pointer-events-none",
                        })
                      }
                    >
                      {countries&&countries.sort((a: { name: string; }, b: { name: string; }) => {
  if (a.name < b.name) return -1;
  if (a.name > b.name) return 1;
  return 0;
}).map(({ name,  flags }:{name:string, flags:{svg: string}}) => (
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
                      03. Whether there is a photovoltaic equipment at your home?
                    </p>
                    <Select label="Select " onChange={selectEquip} className=" text-white" >
                      <Option value="yes">Yes</Option>
                      <Option value="no">No</Option>
                    </Select>
                  </div>
                  <div>
                    <p className="text-sm text-white mt-4 mb-3">
                      04. If the previous answers is YES, please specify the brand
                      and model of the photovoltaic equipment.
                    </p>
                    <Input
                    onInputCapture={onBrandChange}
                     value={questionnaire.brand}
                    crossOrigin={"true"}
                      label="Enter"
                      type="text"
                      placeholder="Brand and Model"
                      className=" border rounded-full py-4bg-card  bg-card py-4 text-white"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-white mt-4 mb-3">
                      05. Your daily household electricity consumption
                    </p>
                    <div className="relative flex w-full border-0 ">
      <Input
   crossOrigin={"true"} label="consumption" 
        onInput={onConsumptionChange}
        className="pr-20 border-white  text-white"
        value={questionnaire.consumption}
        // containerProps={{
        //   className: "min-w-0",
        // }}
      />
      <Button
        size="sm"
        color={"gray" }
        disabled={true}
        className="!absolute right-1 top-1 rounded"
      >
        kWh
      </Button>
    </div>
                    
                    {/* <Input className="pr-20" crossOrigin={"true"} label="consumption" icon={<span className=" w-10 text-base ">kWh</span>}  onInput={onConsumptionChange} /> */}
                  </div>
  </>
  )
  }

    /*************end questionnaire */
    props.task?.forEach((task)=>{
        taskStatus[task.type]=task.status
    })

   const summitQuestionnaire=async ()=>{
    if (!onVerifyBefore()) {
        return;
      }
      if(questionnaire.pattern===""){
        toast.error('Please select the type of equipment');
        return;
      }
      if(questionnaire.pattern=="Hardware equipment"){
        if(!questionnaire.country||!questionnaire.equipment||!questionnaire.brand||!questionnaire.consumption){
          toast.error('Please fill out the questionnaire');
          return;
        }
      }
      setLoadings({...loadings,QUESTION:true})
      const questionAnswer :Omit<User,'uid'|'code'>&{question:Question} ={
           question:questionnaire,
           address:account?.address!
      }
      try{
      await api.login.submitQuestionnaire(questionAnswer)
      }catch(e){
       return  toast.error('Please sign in wallet firstly');
      }
      setLoadings({...loadings,QUESTION:false})
      toast.success('Successfully verified questionnaire');
      props.setProgress(step +1 )
       
   }
const sendEmailVerify=async (email:string)=>{
  if (!onVerifyBefore()) {
    return;
  }
  // setLoadings({...loadings,VERIFY_EMAIL:true})
  await api.login.sendMailCode(account?.address!,email)
  // setLoadings({...loadings,VERIFY_EMAIL:false})
  toast.success('Successfully send Email code');
  // props.setProgress(1)
}
   useEffect(()=>{
    async function  loadingShare(){
      const data=await generateSharePic(user?.code!,SharePic.src)
      if(data){
        setInviteUrl(data as string)
        
      }
     }
   
     loadingShare();

   },[user,setInviteUrl])
    
   const downloadPic=()=>{
    const a = document.createElement('a');
    a.href = inviteUrl;
    a.download = 'share.png';
    a.click();
  }

   const showPic=async ()=>{
    if (!onVerifyBefore()) {
        return;
      }
      if(!user?.code){
        toast.error('You must login wallet firstly');
        return;
      }
       
      setIsShowPic(true)
      downloadPic()
    }

   const submitEmail=async ()=>{
    if (!onVerifyBefore()) {
        return;
      }
      setLoadings({...loadings,VERIFY_EMAIL:true})
      const res = await api.login.verifyMailCode({
        email:email,
        code: code,
        address:account?.address!
    })
    if(res && res.status && res.status!=200){
       toast.error('Failed to verify Email');
       setLoadings({...loadings,VERIFY_EMAIL:false})
       return
    }
    console.log("email verify",res)
      setLoadings({...loadings,VERIFY_EMAIL:false})
      toast.success('Successfully verified Email');
      props.setProgress(step + 1)
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
   
    const shareTip=async ()=>{
      if (!onVerifyBefore()) {
        return;
      }
      toast.success('This task must be completed with the help of friends, please share it with them');
    }
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
        if (!account||!account.address) {
          setMobileMenuOpen(true);
          return false;
     }
        if(wallet){
          await autoSignIn(wallet?.adapter,(user)=>setUser(user))
        }else{
          return toast.error('Please connect wallet firstly');
        }
           props.setProgress(step+1)
        }

      const verifyTwitter = async () => {
        if (!onVerifyBefore()) {
          return;
        }
        if(!session) {
          return toast.error('Please click follow Prome Network on Twitter to login first');
        }
        setLoadings({...loadings,FOLLOW_TWITTER:true})

        await api.login.addTwitterTask(account?.address!,'FOLLOW_TWITTER','complete', `${session.user?.name!}-${session.user?.id!}`)
        // await api.login.addTwitterTask(account?.address!,'FOLLOW_TWITTER','pending', `test`)
        setLoadings({...loadings,FOLLOW_TWITTER:false})
        toast.success('Successfully verified Twitter');
        props.setProgress(step + 1)
       
      }
      const verifyRetweet = async () => {
        // if (!onVerifyBefore()) {
        //   return;
        // }
        if(!session) {
          return toast.error('Please click follow Prome Network on Twitter to login first');
        }
        setLoadings({...loadings,INTERACT_TWITTER:true})
        await api.login.addTwitterTask(account?.address!,'INTERACT_TWITTER','complete', `${session.user?.name!}-${session.user?.id!}`)
        setLoadings({...loadings,INTERACT_TWITTER:false})
        toast.success('Successfully verified Twitter');
        props.setProgress(step + 1)
      }
      const loginTwitter=async ()=>{
        if(!session) {
          return signIn('twitter')
        }
        window.open("https://twitter.com/Prome_Network", "_blank")
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
              title: <p>Follow <a href='javascript:void(0)' onClick={loginTwitter}  className="border-b ">PROME Network</a>  on Twitter</p>,
              icon: { src: UnTwitter, isSelect: true },
            }}
          >
            <div className="block bg-card">
              <Button loading={loadings?.FOLLOW_TWITTER || taskStatus['FOLLOW_TWITTER']=="pending" } className="rounded-3xl  bg-connect text-btn/[0.8] text-xs" onClick={verifyTwitter}>
                {taskStatus['FOLLOW_TWITTER']=="pending"?"Pending":"Verify"}
              </Button>
            </div>
          </TaskCard>
          <TaskCard
            task={{
              status: taskStatus['INTERACT_TWITTER']=="complete"?'complete':'incomplete',
              title: "Interact with the following tweets on Twitter",
              icon: { src: UnTwitter, isSelect: true },
            }}
          >
            <div className="block bg-card  border-b border-font">
              <div className="py-6">
                <p className="text-xs text-connect mb-2">
                01. Retweet @Prome_Network on Twitter
                </p>
                <a href="https://x.com/PROME_En/status/1776610812943073551" target="_blank">
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
                </a>
              </div>
              <div></div>
            </div>
            <div className="block bg-card">
              <div className="py-6">
                <p className="text-xs text-connect mb-2">
                02. Like  @Prome_Network on Twitter
                </p>
                <a href="https://x.com/PROME_En/status/1776610812943073551" target="_blank">
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
                </a>
              </div>
              <div className="block bg-card">
              <Button loading={ loadings?.INTERACT_TWITTER || taskStatus['INTERACT_TWITTER']=="pending"  } className="rounded-3xl  bg-connect text-btn/[0.8] text-xs" onClick={verifyRetweet}>
                { taskStatus['INTERACT_TWITTER']=="pending" ?"pending":"Verify"}
              </Button>
            </div>
            </div>
          </TaskCard>
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
                   label="Email Address"
                    crossOrigin={"true"}
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={onEmailChange}
                    className=" border rounded-full py-4bg-card  bg-card py-4 text-white"
                  />
                </div>
                <div className="flex flex-row mt-4 justify-between ">
                  <div className=" flex bg:w-9/12 md:w-9/12 flex-6  phone:w-6/12 items-end ">
                    <div className="min-w-0 w-full">
                    <Input
                    label="code"
                    crossOrigin={"true"}
                    containerProps={{
                      className: "min-w-0",
                    }}
                      type="text"
                      placeholder="code"
                      value={code}
                      size={"md"}
                      className="outline outline-0 focus:outline-1 phone: w-5/8   bg-btn border rounded-full py-4  bg-card  text-white"
                      onChange={onCodeChange}
                    />
                </div>
                  </div>
                  <CountdownButton  email={email} sendCode={()=>sendEmailVerify(email)}/>
                </div>
              </div>
              <Button 
              loading={loadings?.VERIFY_EMAIL }
              disabled={!email||!code}
              className="rounded-3xl  bg-connect text-btn/[0.8] text-xs mt-8 px-6"  onClick={submitEmail}>
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
                Please answer the following questions
                </p>
                <form className="mt-2 mb-8 w-full max-w-screen-lg ">
                <div>
                    <p className="text-sm text-white mt-4 mb-3">
                      01.select hardware equipment or NFT cloud mining
                    </p>
                    <Select label="Select " onChange={selectPatten} className=" text-white" defaultValue={questionnaire.pattern} >
                      <Option value="Hardware equipment">Hardware equipment</Option>
                      <Option value="Cloud mining machine">Cloud mining machine</Option>
                    </Select>
                  </div>
                  {renderSelect()}
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
              status: 'incomplete',
              title: <div className="flex flex-row "><p className={`phone:leading-5 ${completeRef.current?"text-connect":''}`}><span>Share this airdrop with your friend</span><span className="rounded-xl  mt-2 font-500 text-[#303030] ml-2 text-[10px] px-[6px] py-[2px]  bg-gradient-183 from-[#CFFF8B]  from-10% via-[#F9FFF0] from-44% to-[#CFFF8B]">Additional Coupon</span></p>{completeRef.current?<div className="flex  w-[5.25rem] justify-end content-center  items-center">
              <CheckIcon className="h-4 w-4 bg-connect  rounded-full justify-items-center" />
              <div className='ml-2 text-connect'>Done</div>
              </div>:''}</div>,
              icon: { src: UnShare, isSelect: true },
              share: completeRef.current,
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
                  readOnly
                    labelProps={{
                      className: "hidden",
                    }}
                    crossOrigin={"true"}
                    containerProps={{
                      className: "min-w-0  rounded-xl border-0",
                    }}
                    className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10 text-white rounded-10"
                    value={user?`${ShareUrl}?code=${user?.code}`:ShareUrl}
                    icon={<DocumentDuplicateIcon className="text-white" onClick={()=>copyUrl()}/>}
                  />
                </div>
                <div>
                  <p className="text-sm text-white mt-4 mb-3">or share it via</p>
                  <div className="flex flex-row">
                  <a href={`https://twitter.com/intent/tweet?url=${decodeURIComponent(ShareUrl!)}${user?'?code='+user.code:''}&text=${decodeURIComponent('share to your friend to win extra coupon!')}`} target="_blank">

                    <Image
                      className=" mr-2 w-12 h-12 rounded-full "
                      src={UnTwitter}
                      alt="twitter"
                    />
                    </a>
                  <Link target="_bank" href={`https://t.me/share/url?url=${ShareUrl}${user&&user?.code?"?code="+user?.code:''}`}>
                    <Image
                      className="mr-2  w-12 h-12 rounded-full  "
                      src={UnTelegram}
                      alt="telegram"
                    />
                    </Link>
                  
                    <Image
                      className="mr-2  w-12 h-12 rounded-full "
                      src={UnQr}
                      onClick={()=>showPic()}
                      alt="qrcode"
                    />
                    
                  </div>
                  <div>
  
                  </div>
                  <p className="text-xs text-connect mb-6 mt-8 pt-10 border-t border-font border-solid" >
                  At least one of your friends complete all tasks in this airdrop
                  </p>
                  <Button 
                  loading={loadings?.SHARE }
                  className="rounded-3xl  bg-connect text-btn/[0.8] text-xs"
                  onClick={()=>shareTip()}
                  >
                 Verify Task(s)
              </Button>
                </div>
              </div>
            </div>
          </TaskCard>
        </div>
        <div className="bg-card px-8 py-10 mt-5">
        <div className="text-white/[0.8] text-[1.313rem] mb-8">Coupons</div>
        <CouponList data={data} />
        </div>
        <Dialog open={isShowPic} handler={()=>setIsShowPic(false)}  className="min-w-0" >
          <DialogBody >
          {
            inviteUrl&&<img crossOrigin="anonymous" className="aspect-w-375 aspect-h-667 mx-auto " src={decodeURIComponent(inviteUrl)} alt="share" />
          }
          </DialogBody>
          </Dialog>
      </>)


}

export default function Task() {
  const account = useWallet();
  const {progress, setProgress} =useUserContext()
  console.log("process",progress)

  const {isPending, error, data } = useTaskQuery(account.publicKey?.toBase58(), progress)
    if (isPending) {
        return <div>Loading...</div>
    }
    if(!!error){
        return <div>Error</div>
    }
    let currentProcess=0;
    console.log(data)
    if(data){
        data.forEach((task)=>{
            if(task.status==='complete'){
                currentProcess+=1
            }
        })
     
    }
  
  return (
    <TaskInner task={data} account={{address: account.publicKey?.toBase58()!}}  step={currentProcess}  setProgress={(add)=>setProgress(progress + add)}/>
  );
}


