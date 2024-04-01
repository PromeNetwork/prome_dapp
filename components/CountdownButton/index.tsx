import React, { useState } from 'react';
import { Button } from '@material-tailwind/react';

export function CountdownButton() {
    const [countdown, setCountdown] = useState(0);
    const [disabled, setDisabled] = useState(false);

    const startCountdown = () => {
        setDisabled(true); // 禁用按钮
        setCountdown(10); // 设置倒计时秒数

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
    size="sm"
    color={disabled ? "gray" : "blue-gray"}
    disabled={disabled}
    className="text-nowrap  ml-1 rounded-full bg-connect text-btn/[0.8] text-xs    cursor-pointer"
  >
    {disabled ? `${countdown} 秒后重新获取` : '获取验证码'}
  </Button>

        </>
    );
}

