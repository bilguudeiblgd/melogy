import Image from "next/image";
import { signIn, useSession } from "next-auth/react"
import Skeleton from "@/components/Skeleton";
import CopyLink from "@/components/CopyLink";
import { useRouter } from "next/router";
import TextEdgy from "@/components/TextEdgy";
import Loading from "@/components/Loading";
import Link from "next/link";
import GetHandle from "@/components/GetHandle";
import { Session } from "next-auth";
import React, { useContext, useEffect } from "react";
import { TestService } from "@/middleware/test.service";
import { GlobalContext } from "@/pages/_app";
import GroupDropdown from '@/components/GroupDropdown';


export default function Home() {
    const { data: session, status } = useSession()
    const router = useRouter()

    if (session && session.user && !session.user.userHandle) {
        return <GetHandle callbackUrl={"/"} />
    }

    if (status === "loading") {
        return <Loading />
    }
    // #TODO: Bug 1: UI broken on phones - easy
    // #TODO: Bug 2: [user]/result page has bug on reload. Displays wrong thing
    // #TODO: Feature: Phase 1 - battle against chosen ones

    return (
        <main>
            <Skeleton showNavbar={true} noContainer={false}>
                {!session ?
                    (<div className={"flex flex-col items-center pb-10"}>
                        {/* should have landing page */}
                        <div className={"relative flex-1"}>
                            <Image className={"h-full"}
                                src={"/home_illustration_new_1920.jpeg"} width={457} height={814}
                                alt={"illustration of the idea of the app"} />
                        </div>
                        <div>
                            <button onClick={() => {
                                signIn()
                            }} className={"btn my-2 btn-secondary"}>
                                <TextEdgy className={"text-base-100"}>See who you are</TextEdgy>
                            </button>
                        </div>
                    </div>)
                    :
                    (<LoggedInHomePage session={session} />)
                }
            </Skeleton>

        </main>
    );
}

type LoggedInHomePageProps = {
    session: Session
}

const LoggedInHomePage: React.FC<LoggedInHomePageProps> = ({ session }) => {
    const globalContext = useContext(GlobalContext)
    const [testsGiven, setTestsGiven] = React.useState<object[] | null>(null)
    useEffect(() => {
        let testService = new TestService(globalContext.baseURL, session)
        testService.getTestsGiven()?.then(data => {
            setTestsGiven(data)
        })

    }, [globalContext, session])

    const handleGroupSelect = (group: string) => {
        console.log('Selected group:', group);
        // Add your group selection logic here
    };

    return (
        <>
            <div className="h-full w-full flex flex-col justify-start items-center mt-20">
                <div className="relative flex card w-96 shadow-xl bg-secondary items-center flex-col">
                    <div className="flex flex-row items-center">
                        <TextEdgy className="text-primary text-bold mx-2 flex-end text-7xl">1</TextEdgy>
                        <TextEdgy className="text-primary font-bold leading-[1] my-2 text-2xl">SEND THIS LINK TO YOUR FRIENDS:</TextEdgy>
                    </div>
                    <div>
                        {session.user.userHandle && <CopyLink userHandle={session.user.userHandle} />}
                    </div>
                    <div className="absolute -bottom-4 right-4">
                        <GroupDropdown onSelect={handleGroupSelect} />
                    </div>
                    <div className="h-5 w-5"></div>
                </div>

                <div className={"py-8"}>
                    <p className={"text-secondary font-semibold text-sm "}>x people have visited your link</p>
                </div>

                <button className="btn card btn-accent py-8 px-0 w-96 shadow-xl items-start">
                    <Link href={`/${session?.user.userHandle}`} className="flex flex-row items-center">
                        <TextEdgy className="text-primary text-bold mx-2 text-7xl">2</TextEdgy>
                        <TextEdgy className="text-primary font-bold leading-[1] my-2 text-2xl">CHECK MY RESULTS</TextEdgy>
                    </Link>
                </button>

            </div>
        </>

    )
}

//
// export async function getStaticProps() {
//   await connect()
//   console.log("Hello from static props")
//   // const users = mongoose.model('users')
//   // console.log(users)
//   return {}
// }

