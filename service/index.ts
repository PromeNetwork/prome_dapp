import useSWR from "swr"
import service from "@utils/request";

import {refreshToken, userLogin} from "./login";

export const login={
    refreshToken:refreshToken(service),
    userLogin:userLogin(service)
}