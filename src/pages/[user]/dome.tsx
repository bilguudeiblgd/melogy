import {useRouter} from 'next/router';
import React, {useContext, useEffect, useState} from "react";
import {signIn, useSession} from 'next-auth/react';
import Skeleton from "@/components/Skeleton";
import TestComponent from "@/components/Test/TestComponent";
import Loading from "@/components/Loading";
import GetHandle from "@/components/GetHandle";
import {GlobalContext} from "@/pages/_app";
import InAppBrowserWarning from "@/components/InAppBrowserWarning";
import InAppSpy from "inapp-spy";


// interface DomePageProps {
//     testGiver: IUser;
//     testReceiver: string | null;
// }

const Page: React.FC = () => {
    const router = useRouter();
    const [inapp, setInapp] = useState<boolean>(false)

    const {data: session, status} = useSession();
    const GLOBALS = useContext(GlobalContext)

    const currentURL = `/${router.query.user}/dome`
    // navigators can't be accessed in server side
    useEffect(() => {
        const {isInApp} = InAppSpy()
        setInapp(isInApp)
    }, []);

    if (inapp) return (<InAppBrowserWarning/>)

    // unauthenticated user
    if (status === "unauthenticated") {
        signIn(undefined, {
            callbackUrl: `/${router.query.user}/dome` || '/'
        })
    }

    if (status === "loading") {
        return <Loading/>
    }

    // if user doesn't have handle
    if (session && !session.user.userHandle) {
        return <GetHandle callbackUrl={currentURL}/>
    }

    const testGiver = session?.user

    const testReceiver = router.query.user as string | undefined;
    if (!testReceiver) {
        // If there is no receiver, redirect to home page
        router.push('/')
    }

    if (session && session.user.userHandle === testReceiver) {
        router.push(`/${session.user.userHandle}`)
    }

    const userExists = async (testReceiver: string | undefined) => {
        if (!testReceiver) return null
        const response = await fetch(`${GLOBALS.baseURL}/api/user-exists`, {
            method: 'POST',
            body: JSON.stringify({userHandle: testReceiver}),
        })

        return response.ok;
    }

    if (!userExists(testReceiver)) {
        alert("no such route exists")
        router.push('/')
    }

    return (
        <Skeleton showNavbar={true}>
            {testReceiver && testGiver && testGiver.userHandle &&
                <TestComponent testGiver={testGiver.userHandle} testReceiver={testReceiver}/>}
        </Skeleton>
    );
};

export default Page;
