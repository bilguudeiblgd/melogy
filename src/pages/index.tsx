import Image from "next/image";
import { Inter } from "next/font/google";
import { useSession, signIn, signOut } from "next-auth/react"
import Navbar from "@/components/Navbar";
import Skeleton from "@/components/Skeleton";
import Link from "next/link";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: session } = useSession()

  const signInHandler = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>)  => {
    console.log(e);
    signIn();
  }
  const logOutHandler = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    signOut();
  }
  return (
    <main
    >
      <Skeleton>
      <Navbar onSignIn={signInHandler} onLogOut={logOutHandler}/>
          <div>
            <Link href="/dashboard">Dashboard</Link>
          </div>
          <div>
            <Link href="/auth/register">Register</Link>
          </div>

          <pre className="py-6 px-4 whitespace-pre-wrap break-all">
            {JSON.stringify(session, null, 2)}
          </pre>

      </Skeleton>
     
    </main>
  );
}
