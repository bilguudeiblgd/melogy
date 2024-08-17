import { useRouter } from 'next/router'
import {useSession} from "next-auth/react";
import AccessDenied from "@/components/AccessDenied";

export default function Page() {
  const router = useRouter()
  const userName : string[] | string | undefined = router.query.user
  const { data: session } = useSession()
  // Doesn't have to be middleware here?
  console.log("through index page of [user]")
  if(session?.user != userName) {
    return <AccessDenied />
  }
  return <p>Post: {JSON.stringify(router.query)}</p>
}



