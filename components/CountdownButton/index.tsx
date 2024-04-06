import React, { useState } from 'react';
import { Button } from '@material-tailwind/react';

export function CountdownButton({email,sendCode}:{email: string|undefined,sendCode:()=>void}) {
    const [countdown, setCountdown] = useState(0);
    const [disabled, setDisabled] = useState(false);

    const validateEmail = (email: string|undefined) => {
        if(!email) return false
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    const startCountdown = () => {
        setDisabled(true); // 禁用按钮
        setCountdown(60); // 设置倒计时秒数
        sendCode()
        const interval = setInterval(() => {
            setCountdown(prevCountdown => prevCountdown - 1); // 更新倒计时秒数
        }, 1000);

        setTimeout(() => {
            clearInterval(interval); // 清除定时器
            setDisabled(false); // 启用按钮
        }, 10000); // 倒计时结束时间
    };

   
    return (
        <>
             <Button
             onClick={startCountdown}
    size="sm"
    color={disabled ? "gray" : "blue-gray"}
    disabled={disabled||!validateEmail(email) }
    className="text-nowrap   ml-1 rounded-full bg-connect text-btn/[0.8] text-xs  min-w-[70px]   cursor-pointer"
  >
    {disabled ? `${countdown} 秒后` : '验证码'}
  </Button>

        </>
    );
}

