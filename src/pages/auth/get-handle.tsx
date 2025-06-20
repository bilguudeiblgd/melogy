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
            <div className="hero min-h-full bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left lg:pl-8">
                        <TextEdgy className={"text-5xl font-bold"}>Get Your Handle!</TextEdgy>
                        <div className="py-6">
                            <Text>Choose a handle for yourself.</Text>
                            <ul className="list-disc list-inside pl-4 pt-2">
                                <li>Will be displayed as your username.</li>
                                <li>People will use it to find your test.</li>
                            </ul>
                        </div>
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Handle</span>
                                </label>
                                <input type="text" placeholder="yourhandle"
                                       className={`input input-bordered ${feedbackStatus.toLowerCase().includes('not available') || feedbackStatus.toLowerCase().includes('exists') ? 'input-error' : ''} ${feedbackStatus.toLowerCase().includes('available') ? 'input-success' : ''}`}
                                       id={"handle"}
                                       value={handle}
                                       onChange={(e) => textHandler(e)}/>
                                <label className="label">
                                    <span className="label-text-alt">{feedbackStatus}</span>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button onClick={handleSubmit} className="btn btn-primary" disabled={!submitAllowed}>
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Skeleton>
    );
} 