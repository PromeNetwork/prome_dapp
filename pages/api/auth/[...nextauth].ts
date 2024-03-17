import NextAuth ,{type CallbacksOptions,type Profile,type Account,type User,Session}from "next-auth"
import {type JWT} from "next-auth/jwt"
import {type AdapterUser} from "next-auth/adapters"
import FacebookProvider from "next-auth/providers/facebook"
import axios from 'axios';
interface newSession extends Session{
  accessToken?:string
  expires_at?:number
  error?:string
}
interface NewAccount extends Account{
  error?:string
}


async function refreshAccessToken(tokenObject: Account):Promise<NewAccount> {
  try {
      // Get a new set of tokens with a refreshToken
      const tokenResponse = await axios.post(process.env.NEXTAUTH_URL + '/api/auth/refreshToken', {
          token: tokenObject.refreshToken
      });

      return {
          ...tokenObject,
          accessToken: tokenResponse.data.accessToken,
          expires_at: tokenResponse.data.expires_at,
          refreshToken: tokenResponse.data.refreshToken
      }
  } catch (error) {
      return {
          ...tokenObject,
          error: "RefreshAccessTokenError",
      }
  }
}
const callbacks = {
  jwt: async ({ token, account }:{token:JWT,account?:Account|null}) => {
    console.log("token,account",token,account)
      // if (account) {
      //     // This will only be executed at login. Each next invocation will skip this part.
      //     token.accessToken = account.access_token;
      //     token.expires_at = account.expires_at;
      //     token.refreshToken =account.refreshToken;
      // }
      
      // If accessTokenExpiry is 24 hours, we have to refresh token before 24 hours pass.
      // const shouldRefreshTime = Math.round((account?.expires_at! - 60 * 60 * 1000) - Date.now());

      // // If the token is still valid, just return it.
      // if (shouldRefreshTime > 0) {

      //     return Promise.resolve(token);
      // }
     return Promise.resolve(token);
      // If the call arrives after 23 hours have passed, we allow to refresh the token.
  },
  session: async ({session,token}: { session: Session; token: JWT; user: AdapterUser; } & { newSession: any; trigger: "update"; }) => {
    console.log("session,token",session,token)
    let newSession :newSession = session;
      // Here we pass accessToken to the client to be used in authentication with your API
      newSession.accessToken = token.accessToken as string;
      newSession.expires_at = token.expires_at as number;
      newSession.error = token.error as string;

      return Promise.resolve(newSession);
  },
}
export const authOptions = {
  // Configure one or more authentication providers
  secret:'k0tyPpGSj1dVlGtvWV5r0u43FgdgBtoe1XIOKOfz5uk',
  providers: [
    
    FacebookProvider({
      clientId: '1698885600473995',
      clientSecret: 'ef77d2f27df5e5257c5422b30884d4c2',
    }),
    // ...add more providers here
  ],
  callbacks
}
console.log(process.env.FACEBOOK_ID,process.env.FACEBOOK_SECRET)

export default NextAuth(authOptions)