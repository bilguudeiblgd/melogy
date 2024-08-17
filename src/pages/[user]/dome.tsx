import {GetServerSideProps} from 'next';
import {useRouter} from 'next/router';
import React, {useEffect} from "react";
import {useContext, useState} from 'react';
import LoadingComponent from '@/components/LoadingComponent';
import {GlobalContext} from '@/pages/_app';
import {getSession, useSession} from 'next-auth/react';
import {number} from "prop-types";
import Navbar from "@/components/Navbar";


interface DomePageProps {
    userExists: boolean;
    receiver: string | null;
}

const Page: React.FC<DomePageProps> = ({userExists, receiver}) => {
    const router = useRouter();
    // const {data: session} = useSession();

    useEffect(() => {
        console.log("userExists: ", userExists)
        console.log("receiver: ", receiver)
        if (!userExists || !receiver) {
            // If user doesn't exist or receiver is null, redirect to the home page
            // router.push('/');
        }
    }, [receiver, router, userExists]);


    return (
        <>
        <Navbar/>
        <form><h2>Phase 1 Questions</h2>
            <div><label>They would furiously debate about the most random topic</label><input type="radio" name="0"
                                                                                                  value="yes"
                /> Yes
                <input type="radio" name="0" value="no"/> No
            </div>
            <div><label>They would drag you out to party</label><input type="radio" name="1" value="yes"
                /> Yes
                <input type="radio" name="1" value="no"/> No
            </div>
            <button type="submit">Next</button>
        </form>
    <div><p>Test for {receiver}</p>
    </div>
    </>
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

        console.log("ss props, session: ", session)
        const receiver = context.query.user as string | undefined;
        console.log("ss props, receiver: ", receiver)

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

        return {
            props: {
                userExists,
                receiver: userExists ? receiver : null,
            },
        };
    }
;
