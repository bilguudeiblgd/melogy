import Skeleton from '@/components/Skeleton';
import {signOut, useSession} from 'next-auth/react'
import AccessDenied from '@/components/AccessDenied';
import React, {useContext, useState} from "react";
import {debounce} from "lodash"
import {useRouter} from "next/router"
import {GlobalContext} from "@/pages/_app";
import Loading from "@/components/Loading";
import TextEdgy from "@/components/TextEdgy";

// user name might exist
// it might not exist and can create account
// 1. auth was wrong or smth, email was not validated

export default function GetHandle() {
    const router = useRouter()
    const {data: session, status} = useSession()
    const [handle, setHandle] = useState<string>("")
    const [feedbackStatus, setFeedbackStatus] = useState<string>("Write your username")
    const [submitAllowed, setSubmitAllowed] = useState<boolean>(false)
    const GLOBALS = useContext(GlobalContext)
    // When rendering client side don't display anything until loading is complete
    // If no session exists, display access denied message

    if (status === "loading") {
        return <Loading/>
    }

    if (!session) {
        return <Skeleton showNavbar={true}><AccessDenied/></Skeleton>
    }

    if (session.user.userHandle) {
        router.push("/")
    }

    const checkHandleDebounced = debounce(async (handle: string) => {
        if (handle.length < 8) {
            setFeedbackStatus("Too short")
            return false
        }
        try {
            const response = await fetch(`${GLOBALS.baseURL}/api/handle-check`, {
                method: 'POST',
                body: JSON.stringify({userHandle: handle})
            })
            const data = await response.json()

            if (response.ok) {
                if (data.message === "Possible to register") {
                    setFeedbackStatus("Handle is available");
                    setSubmitAllowed(true)
                    return true
                }

                if (data.message === "Handle exists") {
                    setFeedbackStatus("Handle not available")
                    setSubmitAllowed(false)
                    return false
                }
                console.log(data)

            } else {
                console.log("error happening", data.message)
                return false
            }
        } catch (e) {
            console.error(e)
            return false
        }
    }, 800)

    const textHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setHandle(value);
        checkHandleDebounced(value);
    }


    const handleSubmit = async () => {
        try {
            const response = await fetch(`${GLOBALS.baseURL}/api/handle-submit`, {
                method: 'POST',
                body: JSON.stringify({handle, email: session.user.email})
            })
            if (response.ok) {
                const data = await response.json()
                setFeedbackStatus(data.status)
                // getSession
                // This is a hack to update the session
                const event = new Event("visibilitychange");
                document.dispatchEvent(event);
                // document.dispatchEvent(event);
                alert("Success! Please log in again")
                signOut()
                router.push('/api/auth/signin')
            } else {
                const errorData = await response.json();
                setFeedbackStatus(`Error: ${errorData.message || 'Failed to register handle.'}`);
            }
            // if(data. )
            // session.userHandle = data.status

        } catch (e) {
            console.error(e)
        }
    }

    // #TODO: make the styling better
    return (
        <Skeleton showNavbar={true}>
            <div className={"flex h-full -mt-24 flex-col items-center justify-center"}>
                <TextEdgy className={"text-primary text-2xl mb-4"}>Get Handle!</TextEdgy>
                <div className={"flex flex-col sm:flex-row items-center justify-center"}>
                    <input className={"input input-bordered input-primary w-full max-w-xs my-4 sm:mr-4"} id={"handle"}
                           value={handle}
                           onChange={(e) => textHandler(e)}/>
                    {/*<button onClick={textHandler} className={"btn btn-primary"}>Check</button>*/}
                    {submitAllowed ? (
                            <button onClick={handleSubmit} className={"btn btn-info text-base-100"}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                                </svg>
                                Submit
                            </button>)
                        :
                        (<button className={`btn btn-secondary ${!submitAllowed && "btn-disabled"} text-base-100`}>
                            <span className="loading loading-spinner"></span>
                            {feedbackStatus}
                        </button>)
                    }
                </div>

            </div>
            <div>


            </div>
        </Skeleton>
    );
}
