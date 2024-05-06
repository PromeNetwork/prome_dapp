
import useSWR from "swr"


export function useGenerateSharePic(inviteCode: string, imageBase: string  ) {

    // 使用useSWR的key参数来控制请求的唯一性和条件触发
    // 我们这里不直接请求数据，而是用它来触发操作，因此key可以是任何依赖变化的值
    // 使用一个函数作为key，当不满足条件时返回null，这样useSWR就不会触发fetcher函数
    const { data , error } = useSWR(
        () => (inviteCode && imageBase? `generateSharePic-${inviteCode}-${imageBase}` : null),
        async (key:string) => {
            console.log("generate share pic", inviteCode);
            // 这里的 fetcher 函数实际上执行我们需要的操作，而不是获取数据
            // 你可以将 generateSharePic 函数的结果返回，如果它有返回值的话
            try {
                return await generateSharePic(inviteCode,imageBase);
            } catch (e) {
                console.error(e);
                return '';
            }
        },
        {
            // 根据需要配置选项，例如重试、刷新间隔等
        }
    );

    // useSWR会返回data和error，你可以根据情况使用它们
    // 例如，根据返回的data显示操作结果，或者处理error
    return { url:data, picErr:error };


}

export async function generateSharePic(inviteCode: string, imageBase: string) {

    const shareUrl=window.location.href.split("?")[0]+"?code="+inviteCode;
    /**
     *   1. 创建cavans
     2. 加载背景 imageBase
     3. 根据位置绘制二维码图片，
     4. 把二维码和邀请码绘制到背景图片上
        5. 返回图片的base64编码
     */
    const width = 375;
    const height = 667;
    return new Promise((resolve, reject) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const image = new Image();
        image.src = imageBase;
        image.crossOrigin="anonymous"
        image.onload = () => {
            canvas.width = width;
            canvas.height = height;
            image.width=width;
            image.height=height;
            ctx?.drawImage(image, 0, 0, image.width, image.height);
            const qrCode = new Image();
            qrCode.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${shareUrl}`;
            qrCode.crossOrigin="anonymous"
            qrCode.onload = () => {
                if(ctx){
                ctx.fillStyle = "black";
                ctx.font = "20px serif";
                qrCode.width=width/2-30
                qrCode.height=width/2-30
                ctx?.drawImage(qrCode, 5, (height- width/2)+35 , width/2-40, width/2-40);
                ctx?.fillText(inviteCode, 210, height-88);
                resolve(canvas.toDataURL());
            }
            reject('error');
            }
        }
})
}