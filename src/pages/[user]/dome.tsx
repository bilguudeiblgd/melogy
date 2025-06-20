import {useRouter} from 'next/router';
import React, {useContext, useEffect, useState} from "react";
import {signIn, useSession} from 'next-auth/react';
import Skeleton from "@/components/Skeleton";
import TestComponent from "@/components/Test/TestComponent";
import Loading from "@/components/Loading";
import {GlobalContext} from "@/pages/_app";
import InAppBrowserWarning from "@/components/InAppBrowserWarning";
import InAppSpy from "inapp-spy";
import Text from "@/components/Text";
import {HomeButton} from "@/components/Test/PhaseDoneComponent";
import { ReNavigation } from '@/components/ReNavigation';
import { TestRequestPayload } from '@/components/Test/Properties';



const Page: React.FC = () => {
    const router = useRouter();
    const [testReceiverExists, setTestReceiverExists] = useState<boolean | undefined>(undefined)
    const [testExists, setTestExists] = useState<boolean | undefined>(undefined)

    const {data: session, status} = useSession();
    const GLOBALS = useContext(GlobalContext)

    const currentURL = `/${router.query.user}/dome`
    const testReceiverUrl = router.query.user as string | undefined
    const testReceiver = testReceiverUrl

    useEffect(() => {
        if (status === "authenticated") {
            if (!session.user.userHandle) {
                router.replace(`/auth/get-handle?callbackUrl=${encodeURIComponent(currentURL)}`);
                return;
            }
            const testGiver = session?.user?.userHandle
            const testExistence = async () => {
                const response = await fetch(`${GLOBALS.baseURL}/api/test/exists`, {
                    method: 'POST',
                    body: JSON.stringify({
                        testGiver: testGiver,
                        testReceiver: testReceiver
                    }),
                })
                return await response.json();
            }

            testExistence().then((data) => {
                setTestExists(data.data != null)
            })

        }

        const userExists = async (testReceiver: string | undefined) => {
            if (!testReceiver) return null
            const response = await fetch(`${GLOBALS.baseURL}/api/user/exists`, {
                method: 'POST',
                body: JSON.stringify({userHandle: testReceiver}),
            })
            return await response.json();
        }

        userExists(testReceiver).then((res) => {
            if (res == null) {
                return
            }
            setTestReceiverExists(res.user != null)


        }).catch(() => {
            setTestReceiverExists(false)
        })

    }, [GLOBALS.baseURL, router, testReceiver, status, session]);

    if (!testReceiver) {
        return <div>
        not a good path
        </div>
    }

    if (status === "loading") {
        return <Loading/>
    }

    // if user doesn't have handle
    if (session && !session.user.userHandle) {
        return <Loading />;
    }

    if (session && session.user.userHandle === testReceiver) {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}>
                <Text>You can{"'"}t take a test for yourself.</Text>
                <HomeButton/>
            </div>
        )
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

    if (testExists) {
        return <ReNavigation path={`/tests?giver=${session?.user?.userHandle}&receiver=${testReceiver}`}/>
    }
  
    return (
        <Skeleton showNavbar={false} noContainer={true} maxWidth={"lg"}>
            {testReceiver &&
                <TestComponent testReceiver={testReceiver}/>}
        </Skeleton>
    );
};

export default Page;


