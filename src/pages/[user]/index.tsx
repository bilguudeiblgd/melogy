import { useRouter } from 'next/router'
import {useSession} from "next-auth/react";
import AccessDenied from "@/components/AccessDenied";
import Navbar from "@/components/Navbar";
import Skeleton from "@/components/Skeleton";

export default function Page() {
  const router = useRouter()
  const userName : string[] | string | undefined = router.query.user
  const { data: session } = useSession()
  // Doesn't have to be middleware here?
  console.log("through index page of [user]")
  if(session?.user.userHandle != userName) {
    return <AccessDenied />
  }
  return <Skeleton>
    <Navbar/>
    <p>{JSON.stringify(session)}</p>
    <p>Welcome to ur dashboard</p>
    <p>Tests from ppl will be here!</p>
  </Skeleton>
}



