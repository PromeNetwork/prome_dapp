
import React from 'react'
import Car from '@images/car.png'
import Box from '@images/box.png'
import Gift from '@images/gift.png'
import Equip from '@images/equip.png'
import Rewards from '@images/rewards.png'
import Image from 'next/image'
export default function Detail() {
    return (
        <div className="p-2">
            <div className="text-font text-[3rem] leading-[2.625rem]">
               <p className="text-xs ">Join our energy revolution! Free Green Energy and permanent rewards from PROME Network. $300K in rewards waiting! </p>
                <p className="text-xs py-2">
                PROME Network is rewarding the effective use of green energy and the large-scale adoption of renewable energy infrastructure, motivating more people to participate in the energy revolution, and working together to accelerate decarbonization to achieve a sustainable future.</p>
                <p className="text-xs">
                Now PROME Network’s flagship product dCronus Pro has launched, the first blockchain-modified 20kWh energy storage device! 20kWh can charge an iPhone 15 1360 times, provide power for Tesla Model 3 for 100+KM, and achieve energy trading in PROME in the future. </p>
                <div className="text-xl text-white/[0.6] pt-[1.5625rem] flex flex-row items-center">
                    <div className='text-center'>
                <Image src={Equip} alt="box" className="w-[7.625rem]"/>
                <span className='text-base'> 20kWh</span>
                </div>
                <div className='mx-[1.375rem]'>
                    <p>=</p>
                    <p className='text-base'>&nbsp;</p>
                </div>
                <div className='text-center'>
                <Image src={Box} alt="box" className="w-[7.625rem] "/>
                <span className='text-base'> 1360 times</span>
                </div>
                <div className='mx-[1.375rem]'>
                 <p>=</p>
                    <p className='text-base'>&nbsp;</p>
                </div>
                <div className='text-center'>
                <Image src={Car} alt="box" className="w-[7.625rem] "/>
                <span className='text-base'> 20kWh</span>
                </div>
            </div>
            <p className="text-xs">
            To celebrate the launch of our test server, in order to reward the early participants of the ecological network. PROME is going to airdrop 2,000 free Green Energy NFTs and 20 free dCronus Pro on the Solana network, with a total reward of $240,000. Join us to get a free ticket to this green energy revolution!
                </p>
            </div>
            
            <div className="mt-6 text-white/[0.6] text-xs">
                <h4 className="text-lg  text-white">Rewards</h4>
                <p className="text-xs py-2">
                <span className=" text-white">20 dCronus Pro device of energy storage.</span>(Due to the geographical restrictions, only German users can apply it)
                </p>
                <div className='flex flex-row items-center'>
                <Image src={Equip} alt="box" className="w-[7.625rem] h-[7.625rem] my-4"/>
                 <span className="text-connect ml-4">X 20</span>
                 </div>
                <p>
                <span className=" text-white">2000 Green Energy NFT</span>
                </p>
                <p className="text-xs py-2">
                Each Green Energy NFT represents 1% lifetime dCronus Pro income rights worth $120. You can participate in Stake and participate in pre-mining on the PROME Network test server. Participating in mining will have the opportunity to receive two parts of rewards, which are ecological network rewards Pre-EFE, and selling green electricity to get USDT rewards.
                </p>
                <div className='flex flex-row items-center'>
                <Image src={Gift} alt="box" className="w-[7.625rem] h-[7.625rem] my-4"/>
                 <span className="text-connect ml-4">X 2000</span>
                 </div>
                 <h4 className="text-lg  text-white">Bonus Rewards</h4>
                 <p className="text-xs py-2">
                 Each Green Energy NFT holder is eligible to burn the NFT with a random amount (from 10 to 500) of EFE token minted to the owner’s address when the EFE token is officially launched. 2000 Green Energy NFT owners will share a total pool of 30,000 EFE Tokens.
                </p>

                <div className='flex flex-row items-center'>
                <div className='text-center flex flex-row items-center'>
                <Image src={Gift} alt="box" className="w-[7.625rem] h-[7.625rem]"/>
                <span className='text-base border-b block w-[3rem] border-connect'></span>
                </div>
                <div className="text-connect mx-3">
                    <p>burn NFT and</p>
                    <p>get EFE token</p>
                </div>
                <div className='text-center flex flex-row items-center'>
                <span className='text-base border-b  block w-[3rem]  border-connect'></span>
                <Image src={Rewards} alt="box" className="w-[7.625rem] h-[7.625rem]"/>
                
                </div>

 
                    </div>
                    <h4 className="text-lg  text-white pt-5">Rewards Rules</h4>
                    <p className="text-xs ">
                    - Completing all event tasks will receive a coupon; 
                    </p>
                    <p className="text-xs ">
                    - Share/invite friends to join the airdrop to get an additional coupon;    
                   </p>
                   <p>
                   - Within 14 days after the event ends, the winner of this event will be drawn from the pool through random numbers, and the winning information will be announced;
                   </p>

            </div>
            <div>
                <div className="bg:w-[70%] phone:w-[90%] py-5 px-6 text-sm bg-layer text-white/[0.9] mt-2">
                <p>Completed all event tasks and </p>
                <p>shared the airdrop activity to your friend</p>
                <p className="text-connect">You get your first coupon</p>
                </div>
                <div className="bg:w-[70%] phone:w-[90%] py-5 px-6 text-sm bg-layer text-white/[0.9] mt-2">
                <p>Your friend joined by your referral link, completed all event  </p>
                <p>tasks and shared the airdrop activity to his/her friend</p>
                <p className="text-connect">You get your second coupon</p>
                </div>
            </div>
        </div>
    )
}
