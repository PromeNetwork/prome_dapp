import axios,{AxiosInstance} from 'axios'
import { refreshTokenAction} from "@utils/token";
import {getCurrentAccessToken, getCurrentAddress} from "@utils/storageUtils";

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

const service = axios.create({
  baseURL: 'http://127.0.0.1:3002',
  timeout: 60000
})

service.interceptors.request.use(config => {
  config.headers['Tenant-Id'] = 1;
  config.headers['Terminal'] = 1;
  return config
}, error => {
  console.log(error)
})


service.interceptors.response.use(async res => {
    const code = res.data.code;
    // const msg = errorCode[code] || res.data.msg || errorCode['default']
    const msg = "Network Error"
    if (res.status === 200||res.status===201) {
      if (code != null && code !== 0) {
        if (code === 401) {
          const originalRequest = res.config;
          await refreshTokenAction()
          originalRequest.headers['Authorization'] = 'Bearer ' + getCurrentAccessToken(getCurrentAddress());
          return service(originalRequest);
        } else {
          return Promise.reject(new Error(res.data.msg || msg))
        }
      } else {
        if (Array.isArray(res.data)) {
          return Promise.resolve(res.data)
        } else {
          if (res.data.hasOwnProperty('otherData')) {
            return Promise.resolve({data: res.data.data ?? null, otherData: res.data.otherData})
          }

          if (res.data.hasOwnProperty('data')) {
            return Promise.resolve(res.data.data)
          } else if (res.data.hasOwnProperty('rows')) {
            return Promise.resolve(res.data)
          } else {
            return Promise.resolve(res.data)
          }
        }

      }
    } else {
      return Promise.reject(new Error(msg))
    }
  },
  async function (error) {
    // 如果发生了错误，判断是否是401
    console.dir(error)
    return Promise.reject(error)
  }
  
 
)
export default service