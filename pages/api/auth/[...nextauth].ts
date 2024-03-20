import NextAuth , { type CallbacksOptions,type Profile,type Account,type User,Session  }from "next-auth"
import {type JWT} from "next-auth/jwt"
import {EndpointHandler, type OAuthConfig, type UserinfoEndpointHandler,type OAuthUserConfig } from "next-auth/providers"
import {type AdapterUser} from "next-auth/adapters"
import {Provider} from "next-auth/providers"
import FacebookProvider,{type FacebookProfile} from "next-auth/providers/facebook"
import Twitter from "next-auth/providers//twitter"
import axios from 'axios';
import { generateNonce, generateRandomness } from '@mysten/zklogin';
import { Ed25519Keypair } from '@mysten/sui.js/keypairs/ed25519';
import { getFullnodeUrl, SuiClient } from '@mysten/sui.js/client';
import  type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next"
interface newSession extends Session{
  accessToken?:string
  expires_at?:number
  error?:string
  id?:string
}
interface NewAccount extends Account{
  error?:string
}
const getNonce = async () => {
  const FULLNODE_URL = "https://fullnode.devnet.sui.io"; // replace with the RPC URL you want to use
  const suiClient = new SuiClient({ url: FULLNODE_URL });
  const { epoch, epochDurationMs, epochStartTimestampMs } = await suiClient.getLatestSuiSystemState();
  const maxEpoch = Number(epoch) + 2; // this means the ephemeral key will be active for 2 epochs from now.
  const ephemeralKeyPair = new Ed25519Keypair();
  const randomness = generateRandomness();
  const nonce = generateNonce(ephemeralKeyPair.getPublicKey(), maxEpoch, randomness);
  return nonce;
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
  session: async ({session,token}: { session: Session; token: JWT; user: AdapterUser; } & { newSession: any; trigger: "update"; }) => {
    console.log("session,token",session,token)
    let newSession :newSession = session;
      // Here we pass accessToken to the client to be used in authentication with your API
      newSession.accessToken = token.accessToken as string;
      newSession.expires_at = token.expires_at as number;
      newSession.error = token.error as string;
      newSession.id=token.id as string; ;

      return newSession;
  },
}
type UrlParams = Record<string, unknown>


const defaultProviders = [
  FacebookProvider({
    clientId: process.env.FACEBOOK_ID!,
    clientSecret: process.env.FACEBOOK_SECRET!,
  }) as OAuthConfig<any>,
  Twitter({
    clientId: process.env.TWITTER_ID!,
    clientSecret: process.env.TWITTER_SECRET!,
    version: "2.0",
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
console.log(process.env.FACEBOOK_ID,process.env.FACEBOOK_SECRET)

const defineProvider=function(nonce:string):OAuthConfig<any>[]{
  return [
    {
      id: "facebook2",
      name: "facebook2",
      type: "oauth",
      authorization: {
        url: "https://www.facebook.com/v17.0/dialog/oauth?scope=openid",
        params: { nonce,response_type:"id_token" },
      },
      token: "https://graph.facebook.com/oauth/access_token",
      userinfo: {
        url: "https://graph.facebook.com/me",
        // https://developers.facebook.com/docs/graph-api/reference/user/#fields
        params: { fields: "id,name,email,picture" },
        async request({ tokens, client, provider }:{tokens: {access_token?: string},client:any,provider: OAuthConfig<UrlParams>}) {
          return await client.userinfo(tokens.access_token!, {
            params: (provider.userinfo! as UserinfoEndpointHandler ).params,
          })
        },
      },
  
      profile(profile?: {id?:string,name?:string,email?:string,picture?:{data?:{url:string}}}) {
        return {
          id: profile?.id!,
          name: profile?.name!,
          email: profile?.email!,
          image: profile?.picture?.data?.url!,
        }
      },
      style: { logo: "/facebook.svg", bg: "#006aff", text: "#fff" },
      options: {
        clientId: process.env.FACEBOOK_ID!,
        clientSecret: process.env.FACEBOOK_SECRET!,
      },
    }
]
}
export default async function handler(req:NextApiRequest, res:NextApiResponse){
  const nonce = await getNonce();
  return NextAuth(req,res,( (nonce)=>{
    authOptions.providers=authOptions.providers.concat(defineProvider(nonce))
    return authOptions
  })(nonce))
}