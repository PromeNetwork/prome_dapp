import {
    getCurrentAddress, getLoginResult, setCurrentAddress,
    setLoginResult
  } from "@utils/storageUtils";
import { refreshToken } from "@api/index";
export const refreshTokenAction = async function () {
    const address = getCurrentAddress();
    if (!address) return;
  
    const loginResult = JSON.parse(getLoginResult(address));
    // if(!loginResult||!loginResult.refreshToken) {
    //   return 
    // }
    const result = await refreshToken(loginResult.refreshToken);
    setLoginResult(JSON.stringify(result), address)
  }