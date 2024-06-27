import Image from "next/image";
import { Inter } from "next/font/google";
import { useSession, signIn, signOut } from "next-auth/react"

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: session } = useSession()

  const signInHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>)  => {
    console.log(e);
    signIn();
  }
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
    {session ? <p>{session.user?.name}</p> : <p>Session empty</p>}
      <button onClick={(e : React.MouseEvent<HTMLButtonElement, MouseEvent>) => 
        signInHandler(e)}>sign in</button>
      <p>Hello world</p>
    </main>
  );
}
