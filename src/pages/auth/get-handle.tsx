import Skeleton from '@/components/Skeleton';
import {useSession} from 'next-auth/react'
import AccessDenied from '@/components/AccessDenied';
import React, {useContext, useEffect, useState} from "react";
import {useRouter} from "next/router"
import {GlobalContext} from "@/pages/_app";
import Loading from "@/components/Loading";
import TextEdgy from "@/components/TextEdgy";
import Text from "@/components/Text";

export default function GetHandlePage() {
    const router = useRouter()
    const {data: session, status, update} = useSession()
    const [handle, setHandle] = useState<string>("")
    const [feedbackStatus, setFeedbackStatus] = useState<string>("Minimum 8 characters")
    const [submitAllowed, setSubmitAllowed] = useState<boolean>(false)
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const GLOBALS = useContext(GlobalContext)

    const { callbackUrl } = router.query;

    useEffect(() => {
        if (status === "authenticated" && session.user.userHandle) {
            router.push((callbackUrl as string) || "/");
        }
    }, [status, session, router, callbackUrl]);

    if (status === "loading") {
        return <Loading/>
    }

    if (!session) {
        return <Skeleton showNavbar={true} noContainer={false} maxWidth={"lg"}><AccessDenied/></Skeleton>
    }

    const textHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setHandle(value);
        const hasInvalidChars = /[^a-zA-Z0-9]/.test(value);

        if (hasInvalidChars) {
            setFeedbackStatus("No spaces or special characters allowed");
            setSubmitAllowed(false);
        } else if (value.length < 8) {
            setFeedbackStatus("Minimum 8 characters");
            setSubmitAllowed(false);
        } else {
            setSubmitAllowed(true);
            setFeedbackStatus("");
        }
    }

    const asyncPossibleToRegister = async (userHandle: String) => {
        try {
            const response = await fetch(`${GLOBALS.baseURL}/api/auth/handle-check`, {
                method: 'POST',
                body: JSON.stringify({userHandle: userHandle})
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
            return false
        }
    }

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            const possibleToRegister = await asyncPossibleToRegister(handle)
            if (!possibleToRegister) {
                setFeedbackStatus("Username already exists")
                setTimeout(() => {
                    setFeedbackStatus("")
                }, 2000)
                setSubmitAllowed(false)
                setHandle("")
                return
            }
            const response = await fetch(`${GLOBALS.baseURL}/api/auth/handle-submit`, {
                method: 'POST',
                body: JSON.stringify({handle, email: session.user.email})
            })
            if (response.ok) {
                const data = await response.json()
                setFeedbackStatus(data.status)
                await update({userHandle: handle})
                await router.push((callbackUrl as string) || "/");

            } else {
                const errorData = await response.json();
                setFeedbackStatus(`Error: ${errorData.message || 'Failed to register handle.'}`);
            }
        } catch (e) {
            console.error(e)
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Skeleton showNavbar={true} noContainer={false} maxWidth={"lg"}>
            <div className={"flex margin-auto bg-secondary rounded-lg flex-col items-center mt-24"}>
                <TextEdgy className={"text-primary text-center text-2xl mt-4 mb-4"}>Get Handle!</TextEdgy>
                <div className={"flex flex-col sm:flex-row items-center justify-center"}>
                    <div
                        className={`my-6 w-full max-w-xs sm:mr-4 ${!submitAllowed && "tooltip tooltip-open tooltip-primary"}`}
                        data-tip={feedbackStatus}>
                        <input className={"input input-bordered input-primary "}
                               id={"handle"}
                               value={handle}
                               onChange={(e) => textHandler(e)}
                                disabled={isSubmitting}/>
                    </div>
                    {submitAllowed ? (
                            <button onClick={handleSubmit} className={"btn btn-primary text-base-100"} disabled={isSubmitting}>
                                {isSubmitting ? <span className="loading loading-spinner"></span> :
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                                    </svg>
                                }
                                Submit
                            </button>)
                        :
                        (<button className={`btn btn-secondary ${!submitAllowed && "btn-disabled"} text-base-100`}>
                            Submit
                        </button>)
                    }
                </div>
                <div className="mb-4">
                    <Text className={"text-primary/80"}>Choose handle for yourself</Text>
                    <Text className={"text-primary/80"}>- Will be displayed as your username</Text>
                    <Text className={"text-primary/80"}>- People will use it to do your test</Text>
                </div>
            </div>
        </Skeleton>
    );
} 