import useSWR from "swr"
import service from "@utils/request";

export { User} from "./dto";
import {refreshToken, userLogin, useInfo} from "./login";

export const login={
    refreshToken:refreshToken(service),
    userLogin: userLogin(service),
    useInfo: useInfo(service),
}
