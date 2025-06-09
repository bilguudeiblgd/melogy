import { useRouter } from 'next/router'
import { signIn, useSession } from "next-auth/react";
import AccessDenied from "@/components/AccessDenied";
import Skeleton from "@/components/Skeleton";
import React from "react";
import Loading from "@/components/Loading";
import TestHistory from "@/components/TestHistory";
import TextEdgy from "@/components/TextEdgy";

export default function TestHistoryPage() {
    const router = useRouter()
    const userName: string[] | string | undefined = router.query.user
    const { data: session, status } = useSession()

    if (status === "loading") {
        return <Loading />
    }

    if (!session) {
        signIn("google", {
            callbackUrl: `/${router.query.user}/test` || ""
        })
    }

    if (session?.user.userHandle != userName) {
        return <AccessDenied />
    }

    return (
        <Skeleton showNavbar={true} noContainer={false} maxWidth={"lg"}>
            <div className="flex flex-col items-center mt-12">
                <TextEdgy className="text-2xl text-accent mb-8">Test History</TextEdgy>
                <div className="w-full px-4">
                    {session?.user.userHandle && (
                        <TestHistory userHandle={session.user.userHandle} />
                    )}
                </div>
            </div>
        </Skeleton>
    )
} 