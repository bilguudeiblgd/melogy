import {GetServerSideProps} from 'next';
import {useRouter} from 'next/router';
import React, {useEffect} from "react";
import {useContext, useState} from 'react';
import LoadingComponent from '@/components/LoadingComponent';
import {GlobalContext} from '@/pages/_app';
import {getSession, useSession} from 'next-auth/react';
import {number} from "prop-types";
import Navbar from "@/components/Navbar";
import Skeleton from "@/components/Skeleton";
import IUser from "@/types/IUser";
import Phase0Component from "@/components/Test/Phase0Component";
import TestComponent from "@/components/Test/TestComponent";


interface DomePageProps {
    testGiver: IUser;
    testReceiver: string | null;
}

const Page: React.FC<DomePageProps> = ({testGiver, testReceiver}) => {
    const router = useRouter();
    const {data: session} = useSession();

    useEffect(() => {
        console.log("user: ", testGiver)
        console.log("receiver: ", testReceiver)
        if (!testGiver || !testReceiver) {
            // If user doesn't exist or receiver is null, redirect to the home page
            // router.push('/');
            alert("User logged in")
        }

    }, [testReceiver, router, testGiver]);


    return (
        <Skeleton showNavbar={true}>
            <div className={"h-screen"}>
                {testReceiver && <TestComponent testGiver={testGiver.userHandle} testReceiver={testReceiver}/>}

                <div><p>Test for {testReceiver}</p>
                </div>

            </div>
        </Skeleton>
    );
};

export default Page;

export const getServerSideProps: GetServerSideProps = async (context) => {
        const baseURL: string = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000";
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
