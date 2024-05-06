

import {
    getCurrentAddress, getLoginResult, setCurrentAddress,
    setLoginResult
  } from "@utils/storageUtils";
  import {useWallet} from "@solana/wallet-adapter-react";

  // eslint-disable-next-line no-unused-vars
import { login } from "@api/index";
import { autoSignIn, getToken} from "@components/index";

// eslint-disable-next-line