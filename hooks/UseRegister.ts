
import useSWR from "swr"
import {autoSignIn} from '@components/index'
import { WalletAdapter, Adapter } from "@solana/wallet-adapter-base";
import { PublicKey } from "@solana/web3.js";
export function useAutoSignIn(adapter: Adapter|null, connected :boolean, connecting:boolean, publicKey:PublicKey | null) {
    // 使用useSWR的key参数来控制请求的唯一性和条件触发
    // 我们这里不直接请求数据，而是用它来触发操作，因此key可以是任何依赖变化的值
    // 使用一个函数作为key，当不满足条件时返回null，这样useSWR就不会触发fetcher函数
    const { data, error } = useSWR(
      () => (adapter && connected && !connecting && publicKey ? `autoSignIn-${publicKey}` : null),
      async (key) => {
        console.log("auto sign in", adapter, connected, connecting, publicKey);
        // 这里的 fetcher 函数实际上执行我们需要的操作，而不是获取数据
        // 你可以将 autoSignIn 函数的结果返回，如果它有返回值的话
        return autoSignIn(adapter!);
      },
      {
        // 根据需要配置选项，例如重试、刷新间隔等
      }
    );
  
    // useSWR会返回data和error，你可以根据情况使用它们
    // 例如，根据返回的data显示操作结果，或者处理error
  }