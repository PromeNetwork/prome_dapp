import useSWR from "swr"
import service from "@utils/request";

export { type User,type Question,type Coupon} from "./dto";
import {refreshToken, userLogin, userInfo, submitEmail,submitQuestionnaire , } from "./login";

export const login={
    refreshToken:refreshToken(service),
    userLogin: userLogin(service),
    submitEmail:submitEmail(service),
    useInfo:  userInfo(service),
    submitQuestionnaire:submitQuestionnaire(service)
}
