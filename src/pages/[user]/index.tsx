import { useRouter } from 'next/router'

export default function Page() {
  const router = useRouter()
  const userName : string[] | string | undefined = router.query.user
  return <p>Post: {JSON.stringify(router.query)}</p>
}

