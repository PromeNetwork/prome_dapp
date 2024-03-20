import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link'
import {jwtDecode ,type JwtPayload} from 'jwt-decode'


export default function Component({provider}: {provider: string}) {

console.log("provider",provider)



  const { data: session,...res } = useSession()
  console.log(JSON.stringify(session),JSON.stringify(res))
  if(session) {
  
    console.log("2",session.user)
    return <>
      Signed in as {session.user?.name} 1 <br/>
      <button onClick={() => signOut()}>Sign out</button>
      <div>
      <Link href="https://www.facebook.com/profile.php?id=100083222450995">like</Link>
      </div>
    </>
  }
  return <>
    Not signed in <br/>
    <button onClick={() => signIn(provider)}>Sign in</button>
  </>
}
//https://twitter.com/i/oauth2/authorize?client_id=liLwAyJ4qTHKRbl9U0sPom2b3&scope=users.read%20tweet.read%20offline.access&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3001%2Fapi%2Fauth%2Fcallback%2Ftwitter&state=-8m55TJQwLioNHTX6y4U7akBrj65gH4RfhBDxDG4Zkc&code_challenge=8ogrVEb-23lIvpr7srVwAQ6QVhSgiIwthzpsdtwyS9M&code_challenge_method=S256
//https://weilandy-app.vercel.app/api/auth/callback/twitter
export function getStaticPaths(){
  return {
    paths: ['facebook','google','github','twitter','facebook2'].map(provider => ({params: {provider}})),
    fallback: false
  }
}


export function getStaticProps({params}:{ params:{provider: string} }) {

  return {
    props: {
      provider: params.provider
    }
  }
}
