import Image from "next/image";
import {signIn, useSession} from "next-auth/react"
import Skeleton from "@/components/Skeleton";
import CopyLink from "@/components/CopyLink";
import {useRouter} from "next/router";
import TextEdgy from "@/components/TextEdgy";
import Loading from "@/components/Loading";
import Link from "next/link";
import GetHandle from "@/components/GetHandle";


export default function Home() {
    const {data: session, status} = useSession()
    const router = useRouter()

    if(session && session.user && !session.user.userHandle) {
        return <GetHandle callbackUrl={"/"}/>
    }

    if (status === "loading") {
        return <Loading/>
    }
    // #TODO: Bug 1: UI broken on phones - easy
    // #TODO: Bug 2: [user]/result page has bug on reload. Displays wrong thing
    // #TODO: Feature: Phase 1 - battle against chosen ones

    return (
        <main>
            <Skeleton showNavbar={true} noContainer={false} darkTheme={false}>
                {!session ?
                    (<div className={"flex flex-col items-center pb-10"}>
                        {/* should have landing page */}
                        <div className={"relative flex-1"}>
                            <Image className={"h-full"}
                                   src={"/home_illustration.jpg"} width={457} height={814}  alt={"illustration of the idea of the app"}/>
                        </div>
                        <div>
                            <button onClick={() => {signIn()}} className={"btn btn-secondary"}>
                                <TextEdgy className={"text-base-100"} >See who you are</TextEdgy>
                            </button>
                        </div>
                    </div>)
                    :
                    (<div className={"h-full w-full flex flex-col justify-center items-center -mt-24 "}>
                        <div>
                            <p className={"text-primary font-bold mb-2 text-sm"}>Send this link to your friends:</p>
                        </div>
                        <div>
                            {session.user.userHandle && <CopyLink userHandle={session.user.userHandle}/>}
                        </div>
                        <div className={"py-2"}>
                            <p className={"text-secondary font-semibold text-sm "}>x people have visited your link</p>
                        </div>

                        <div className={"flex flex-row"}>
                            <button className={"btn btn-primary h-16 w-28 mx-2"}>
                                <Link href={`/${session?.user.userHandle}`}
                                      className={"flex flex-col items-center justify-center"}>
                                    <Image src={"/eyes_2.png"} alt={"Illustration of eyes"} width={40} height={40}/>
                                    <TextEdgy className={"text-base-100"}>SEE ME!</TextEdgy>
                                </Link>
                            </button>
                            <button className={"btn btn-outline btn-primary h-16 w-28 mx-2"}>
                                <div className={"flex flex-col items-center justify-center"}>
                                    <TextEdgy className={"text-3xl font-custom"} >14</TextEdgy>
                                    <TextEdgy className={"text-sm"} >ARCHETYPES!</TextEdgy>
                                </div>
                            </button>
                        </div>

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
