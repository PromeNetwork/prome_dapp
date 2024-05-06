import NextAuth , { type CallbacksOptions,type Profile,type Account,type User,Session  }from "next-auth"
import {type JWT} from "next-auth/jwt"
import {EndpointHandler, type OAuthConfig, type UserinfoEndpointHandler,type OAuthUserConfig } from "next-auth/providers"
import {type AdapterUser} from "next-auth/adapters"
import {Provider} from "next-auth/providers"
import FacebookProvider,{type FacebookProfile} from "next-auth/providers/facebook"
import Twitter from "next-auth/providers//twitter"
import axios from 'axios';
import { DefaultSession } from "next-auth";
import  type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next"

declare module "next-auth" {
  interface Session {
    user?: {
      id: string;
    } & DefaultSession["user"];
  }
}
interface NewAccount extends Account{
  error?:string
}

async function refreshAccessToken(tokenObject: Account):Promise<NewAccount> {
  try {
      // Get a new set of tokens with a refreshToken
      const tokenResponse = await axios.post(process.env.NEXTAUTH_URL + '/refreshToken', {
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
  // session: async({ session, user }:{session: Session,user: User|AdapterUser })=>{
  //   if (session.user) {
  //     session.user.id = user.id;
  //   }
  //   return session;
  // },
  signIn: async ({user,account,profile}:{user: User|AdapterUser, account: Account|null, profile?: Profile|undefined}) => {
    console.log("user,account,profile",user,account,profile)
    return true
  },
  jwt: async ({ token, account }:{token:JWT,account?:Account|null}) => {
    console.log("token,account",token,account)
    if (account) {
      token.accessToken = account.access_token
      token.id = account.id
    }
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
     return token;
      // If the call arrives after 23 hours have passed, we allow to refresh the token.
  },
  session: async ({session,token,user,newSession}: { session: Session; token: JWT; user: AdapterUser; } & { newSession: any; trigger: "update"; }) => {
    console.log("session,token,user,newSession",session,token,user,newSession)
    let curSession :Session = session;
      // Here we pass accessToken to the client to be used in authentication with your API
      
      if(curSession.user){
        curSession.user.id=token.sub as string; ;
      }

      return curSession;
  },
}
type UrlParams = Record<string, unknown>


const defaultProviders = [
  FacebookProvider({
    clientId: process.env.FACEBOOK_ID!,
    clientSecret: process.env.FACEBOOK_SECRET!,
  }) as OAuthConfig<any>,
  // TwitterLegacy({
  //   clientId: process.env.TWITTER_ID!,
  //   clientSecret: process.env.TWITTER_SECRET!,
  // }) as OAuthConfig<any>
  Twitter({
    clientId: process.env.TWITTER_ID!,
    clientSecret: process.env.TWITTER_SECRET!,
     version: "2.0",
    // authorization: {
    //   url: "https://twitter.com/i/oauth2/authorize",
    //   params: { scope: "users.read,follows.read,post.read, offline.access" },
    // },
    userinfo: {
      url: "https://api.twitter.com/2/users/me",
      params: { "user.fields": "id,profile_image_url"},
    },
  }) as OAuthConfig<any>,
  // ...add more providers here
]
export const authOptions = {
  debug: true,
  // Configure one or more authentication providers
  secret:process.env.SECRET,
  providers: defaultProviders,
  callbacks
}
console.log(process.env.TWITTER_ID,process.env.TWITTER_SECRET)


type MyObjects  =ArrayLike<UrlParams>

export default async function handler(req:NextApiRequest, res:NextApiResponse){
  // const nonce = await getNonce();
  return NextAuth(req,res,( (nonce)=>{
    // authOptions.providers=authOptions.providers.concat(defineProvider(nonce))
    return authOptions
  })(1))
}