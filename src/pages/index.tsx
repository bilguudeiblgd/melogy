import Image from "next/image";
import { Inter } from "next/font/google";
import { useSession, signIn, signOut } from "next-auth/react"
import Navbar from "@/components/Navbar";
import Skeleton from "@/components/Skeleton";
import Link from "next/link";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: session } = useSession()

  const signInHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>)  => {
    console.log(e);
    signIn();
  }
  return (
    <main
    >
      <Skeleton>
      <Navbar/>
        {session ? <p>{session.user?.name}</p> : <p>Session empty</p>}
          <button onClick={(e : React.MouseEvent<HTMLButtonElement, MouseEvent>) => 
            signInHandler(e)}>sign in</button>
          <p>Hello world</p>
          <div>
            <Link href="/dashboard">Dashboard</Link>
          </div>
          <div>
            <Link href="/auth/register">Register</Link>
          </div>

      </Skeleton>
     
    </main>
  );
}
