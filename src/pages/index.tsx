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

// #TODO - add group selection (changed into later edit format. User can see other people's results)
// #TODO - fix phase 0 and 1, they are just too complicated, make it drag and drop
// #TODO - can we add back button to phase 0 and 1?

export default function Home() {
    const { data: session, status } = useSession()
    const router = useRouter()

    useEffect(() => {
        if (status === "authenticated" && session && !session.user.userHandle) {
            router.push("/auth/get-handle?callbackUrl=/");
        }
    }, [session, status, router]);

    if (status === "loading" || (status === "authenticated" && session && !session.user.userHandle)) {
        return <Loading />
    }
    // #TODO: Bug 1: UI broken on phones - easy
    // #TODO: Bug 2: [user]/result page has bug on reload. Displays wrong thing
    // #TODO: Feature: Phase 1 - battle against chosen ones

    return (
        <main>
            <Skeleton showNavbar={true} noContainer={false} maxWidth={"lg"}>
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
    const [groups, setGroups] = React.useState<string[]>(session.user.groups || []);
    const [selectedGroup, setSelectedGroup] = React.useState<string | null>(null);
    const [addingGroup, setAddingGroup] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const GLOBALS = useContext(GlobalContext);

    // Optionally, fetch latest groups from API on mount
    // React.useEffect(() => {
    //     async function fetchGroups() {
    //         const res = await fetch(`${GLOBALS.baseURL}/api/user/${session.user.userHandle}`);
    //         const user = await res.json();
    //         setGroups(user.groups || []);
    //     }
    //     fetchGroups();
    // }, [session.user.userHandle, GLOBALS.baseURL]);

    const handleGroupSelect = (group: string) => {
        setSelectedGroup(group);
    };

    const handleAddGroup = async (group: string) => {
        if (!group || groups.includes(group)) return;
        setLoading(true);
        // Update backend
        await fetch(`${GLOBALS.baseURL}/api/user/${session.user.userHandle}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ group })
        });
        setGroups(prev => [...prev, group]);
        setSelectedGroup(group);
        setLoading(false);
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
                    <div className="h-5 w-5"></div>
                </div>

                {selectedGroup && (
                    <div className="mt-2 text-primary font-bold">Selected group: {selectedGroup}</div>
                )}

                <div className={"py-4"}>
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

