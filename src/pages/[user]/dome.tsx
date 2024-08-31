import {GetServerSideProps} from 'next';
import {useRouter} from 'next/router';
import React, {useEffect} from "react";
import {useContext, useState} from 'react';
import LoadingComponent from '@/components/LoadingComponent';
import {GlobalContext} from '@/pages/_app';
import {getSession, useSession} from 'next-auth/react';
import {number} from "prop-types";
import Navbar from "@/components/Navbar";
import Phase1 from "@/components/Phase1/Phase1Component"
import Skeleton from "@/components/Skeleton";
import IUser from "@/types/IUser";
import Phase0Component from "@/components/Phase0/Phase0Component";


interface DomePageProps {
    user: IUser;
    receiver: string | null;
}

const Page: React.FC<DomePageProps> = ({user, receiver}) => {
    const router = useRouter();
    const {data: session} = useSession();

    useEffect(() => {
        console.log("user: ", user)
        console.log("receiver: ", receiver)
        if (!user || !receiver) {
            // If user doesn't exist or receiver is null, redirect to the home page
            // router.push('/');
            alert("User logged in")
        }

    }, [receiver, router, user]);


    return (
        <Skeleton>
            <div className={"h-screen"}>

                <Navbar/>
                <Phase0Component/>

                <div><p>Test for {receiver}</p>
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
        const receiver = context.query.user as string | undefined;
        if (!receiver) {
            // If there is no receiver, redirect to home page
            return {
                redirect: {
                    destination: '/',
                    permanent:
                        false,
                }
                ,
            }
                ;
        }
        console.log("json: ", JSON.stringify({userHandle: receiver}))
        const response = await fetch(`${baseURL}/api/user-exists`, {
                method: 'POST',
                body: JSON.stringify({userHandle: receiver}),
            })
        ;

        const userExists = response.ok;
        const data = await response.json()
        return {
            props: {
                user: data.user,
                receiver: userExists ? receiver : null,
            },
        };
    }
;
