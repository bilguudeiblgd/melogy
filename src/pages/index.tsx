import Image from "next/image";
import {Inter} from "next/font/google";
import {useSession, signIn, signOut} from "next-auth/react"
import Navbar from "@/components/Navbar";
import Skeleton from "@/components/Skeleton";
import {FaRegCopy} from "react-icons/fa6";
import Link from "next/link";
import CopyLink from "@/components/CopyLink";
import mongooseConnect from "@/lib/mongooseConnect";
import mongoose from "mongoose";
import {useRouter} from "next/router";

const inter = Inter({subsets: ["latin"]});

export default function Home() {
    const {data: session} = useSession()
    const router = useRouter()

    if(session && session.user && !session.user.userHandle) {
        router.push('/gethandle')
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
                {!session ?
                    (<div>
                        <Navbar/>

                        <p>Welcome page</p>
                    </div>)
                    :
                    (<div className={"h-screen"}>
                        <Navbar/>
                        {session.user.userHandle && <CopyLink userHandle={session.user.userHandle}/>}
                    </div>)
                }

            </Skeleton>

        </main>
    );
}

//
// export async function getStaticProps() {
//   await connect()
//   console.log("Hello from static props")
//   // const users = mongoose.model('users')
//   // console.log(users)
//   return {}
// }
