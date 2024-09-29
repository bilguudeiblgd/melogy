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
import Text from "@/components/Text";


// interface DomePageProps {
//     testGiver: IUser;
//     testReceiver: string | null;
// }

const Page: React.FC = () => {
    const router = useRouter();
    const [inapp, setInapp] = useState<boolean>(false)
    const [testReceiverExists, setTestReceiverExists] = useState<boolean>(false)
    const {data: session, status} = useSession();
    const GLOBALS = useContext(GlobalContext)

    const currentURL = `/${router.query.user}/dome`
    const testReceiver = router.query.user as string | undefined
    // navigators can't be accessed in server side
    useEffect(() => {
        const {isInApp} = InAppSpy()
        setInapp(isInApp)

        const userExists = async (testReceiver: string | undefined) => {
            if (!testReceiver) return null
            const response = await fetch(`${GLOBALS.baseURL}/api/user-exists`, {
                method: 'POST',
                body: JSON.stringify({userHandle: testReceiver}),
            })
            return await response.json();
        }

        userExists(testReceiver).then((data) => {
            setTestReceiverExists(data.user != null)
        }).catch(() => {
            setTestReceiverExists(false)
        })

    }, [GLOBALS.baseURL, router, testReceiver]);

    if (!testReceiver) {
        return <div>
            not a good path
        </div>
    }

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


    if (session && session.user.userHandle === testReceiver) {
        return (<div>
            <Text>Nothing to do</Text>
        </div>)
    }

    if (!testReceiverExists) {
        return (<div>
            <Text>User {"doesn't"} exist</Text>
        </div>)
    }



    return (
        <Skeleton showNavbar={true} darkTheme={true}>
            {testReceiver && testGiver && testGiver.userHandle &&
                <TestComponent testGiver={testGiver.userHandle} testReceiver={testReceiver}/>}
        </Skeleton>
    );
};

export default Page;
