import Skeleton from '@/components/Skeleton';
import { useSession } from 'next-auth/react'
import AccessDenied from '@/components/AccessDenied';

export default function Dashboard() {
  const {data: session } = useSession()

  // When rendering client side don't display anything until loading is complete
  // If no session exists, display access denied message
  if (!session) { return  <Skeleton showNavbar={true} ><AccessDenied/></Skeleton> }

  return (
    <main
    >
      <h1>DASHBOARD!</h1>
    </main>
  );
}
