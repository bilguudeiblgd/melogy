import {GetServerSideProps} from 'next';
import {useRouter} from 'next/router';
import React, {useEffect} from "react";
import {getSession, useSession} from 'next-auth/react';
import Skeleton from "@/components/Skeleton";
import IUser from "@/types/IUser";
import TestComponent from "@/components/Test/TestComponent";
import Loading from "@/components/Loading";


interface DomePageProps {
    testGiver: IUser;
    testReceiver: string | null;
}

const Page: React.FC<DomePageProps> = ({testGiver, testReceiver}) => {
    const router = useRouter();
    const {data: session, status} = useSession();

    useEffect(() => {

        if (!testGiver || !testReceiver) {
            alert("User isn't logged in")
        }

    }, [testReceiver, router, testGiver]);

    if (status === "loading") {
        return <Loading/>
    }

    return (
        <Skeleton showNavbar={true}>
            {testReceiver && <TestComponent testGiver={testGiver.userHandle} testReceiver={testReceiver}/>}
        </Skeleton>
    );
};

export default Page;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const baseURL: string = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
        const session = await getSession(context);
        if (!session) {
            return {
                redirect: {
                    destination: '/api/auth/signin',
                    permanent: false,
                }
            }
        }
        if (!session.user.userHandle)
            return {
                redirect: {
                    destination: '/gethandle',
                    permanent: false,
                }
            }
        const receiver = context.query.user as string | undefined;
        if (!receiver) {
            // If there is no receiver, redirect to home page
            return {
                redirect: {
                    destination: '/',
                    permanent:
                        false,
                }
            }
        }

        if(session.user.userHandle === receiver) {
            return {
                redirect: {
                    destination: '/',
                    permanent:
                        false,
                }
            }
        }

        const response = await fetch(`${baseURL}/api/user-exists`, {
                method: 'POST',
                body: JSON.stringify({userHandle: receiver}),
            })
        ;

        const userExists = response.ok;
        const data = await response.json()
        return {
            props: {
                testGiver: session.user,
                testReceiver: userExists ? receiver : null,
            },
        };
    }
;
