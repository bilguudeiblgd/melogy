import Image from "next/image";
import { Inter } from "next/font/google";
import { useSession, signIn, signOut } from "next-auth/react"
import Navbar from "@/components/Navbar";
import Skeleton from "@/components/Skeleton";
import { FaRegCopy } from "react-icons/fa6";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: session } = useSession()

  const signInHandler = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>)  => {
    signIn();

  }
  
  const logOutHandler = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    signOut();
  }
  return (
    <main
    >
        <Skeleton>
            {/*<div>*/}
            {/*    <Link href="/dashboard">Dashboard</Link>*/}
            {/*</div>*/}

            {/*<pre className="py-6 px-4 whitespace-pre-wrap break-all">*/}
            {/*  {JSON.stringify(session, null, 2)}*/}
            {/*</pre>*/}
            {/*<div className={"overscroll-y-none"}>*/}


                <div className={"h-screen"}>
                    <Navbar onSignIn={signInHandler} onLogOut={logOutHandler}/>

                    <div className={"flex flex-col justify-center items-center h-full -m-32 gap-2"}>
                        <button className={"btn border-2 rounded-full p-4 flex flex-row items-center"}>
                            <div>
                                <p>https://methology.me/bilguudei/dome</p>
                            </div>
                            <div className={"pl-6 pr-2"}>
                                <FaRegCopy size={16}/>
                            </div>
                        </button>
                        <button className="btn px-16 btn-primary"><h2>Share</h2></button>
                    </div>
                </div>


        </Skeleton>

    </main>
  );
}
