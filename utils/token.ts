

import {
    getCurrentAddress, getLoginResult, setCurrentAddress,
    setLoginResult
  } from "@utils/storageUtils";

  // eslint-disable-next-line no-unused-vars
import { login } from "@api/index";

// eslint-disable-next-line
export const refreshTokenAction = async function () {
    const address = getCurrentAddress();
    if (!address) return;
  
    const loginResult = JSON.parse(getLoginResult(address));
    // if(!loginResult||!loginResult.refreshToken) {
    //   return 
    // }
    const result = await login.refreshToken(loginResult.refreshToken);
    setLoginResult(JSON.stringify(result), address)
  }