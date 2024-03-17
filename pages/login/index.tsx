import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link'

export default function Component() {
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
    <button onClick={() => signIn()}>Sign in</button>
  </>
}