import {useRouter} from 'next/router';
import React, {useContext, useEffect, useState} from "react";
import {signIn, useSession} from 'next-auth/react';
import Skeleton from "@/components/Skeleton";
import TestComponent from "@/components/Test/TestComponent";
import TestReceiverInfo from '@/components/Test/TestReceiverInfo';
import Loading from "@/components/Loading";
import GetHandle from "@/components/GetHandle";
import {GlobalContext} from "@/pages/_app";
import InAppBrowserWarning from "@/components/InAppBrowserWarning";
import InAppSpy from "inapp-spy";
import Text from "@/components/Text";
import {HomeButton} from "@/components/Test/PhaseDoneComponent";


// interface DomePageProps {
//     testGiver: IUser;
//     testReceiver: string | null;
// }

const Page: React.FC = () => {
    const router = useRouter();
    const [inapp, setInapp] = useState<boolean>(false)
    const [testReceiverExists, setTestReceiverExists] = useState<boolean | undefined>(undefined)
    const [testAvailable, setTestAvailable] = useState<boolean | undefined>(undefined)

    const {data: session, status} = useSession();
    const GLOBALS = useContext(GlobalContext)

    const currentURL = `/${router.query.user}/dome`
    const testReceiver = router.query.user as string | undefined

    const testGiver = session?.user

    // navigators can't be accessed in server side
    useEffect(() => {
        const {isInApp} = InAppSpy()
        setInapp(isInApp)

        const userExists = async (testReceiver: string | undefined) => {
            if (!testReceiver) return null
            const response = await fetch(`${GLOBALS.baseURL}/api/user/exists`, {
                method: 'POST',
                body: JSON.stringify({userHandle: testReceiver}),
            })
            return await response.json();
        }

        const queryTest = async (testReceiver: string | undefined, testGiver: string | undefined) => {
            if (!testReceiver) return null
            if (!testGiver) return null
            console.log(GLOBALS.baseURL)
            console.log(testReceiver, testGiver)
            const response = await fetch(`${GLOBALS.baseURL}/api/test/exists`, {
                method: 'POST',
                body: JSON.stringify({testReceiver: testReceiver, testGiver: testGiver}),
            })
            return await response.json();
        }

        userExists(testReceiver).then((res) => {
            if (res == null) {
                return
            }
            setTestReceiverExists(res.user != null)

            queryTest(testReceiver, testGiver?.userHandle).then((res) => {
                console.log(res)
                if (res == null) {
                    return
                }
                setTestAvailable(res.data == null)
            }).catch(() => {
            })

        }).catch(() => {
            setTestReceiverExists(false)
        })

    }, [GLOBALS.baseURL, router, testGiver?.userHandle, testReceiver]);

    if (!testReceiver) {
        return <div>
            not a good path
        </div>
    }

    if (inapp) return (<InAppBrowserWarning/>)

    // unauthenticated user
    if (status === "unauthenticated") {
        signIn("google", {
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



    if (session && session.user.userHandle === testReceiver) {
        return (<div>
            <Text>Nothing to do</Text>
            <HomeButton/>
        </div>)
    }

    if (testReceiverExists === undefined) {
        return <Loading/>
    }

    if (!testReceiverExists) {
        return (<div>
            <Text>User {"doesn't"} exist</Text>
            <HomeButton/>
        </div>)
    }
    if (testAvailable === undefined) {
        return <Loading/>
    }

    if (!testAvailable) {
        return (<div>
            <Text>Already took the test</Text>
            <HomeButton/>
        </div>)
    }


    return (
        <Skeleton showNavbar={true} noContainer={true} darkTheme={true}>
            <TestReceiverInfo testReceiver={testReceiver}/>
            {testReceiver && testGiver && testGiver.userHandle &&
                <TestComponent testGiver={testGiver.userHandle} testReceiver={testReceiver}/>}
        </Skeleton>
    );
};

export default Page;
