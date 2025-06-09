import Skeleton from '@/components/Skeleton';
import {useSession} from 'next-auth/react'
import AccessDenied from '@/components/AccessDenied';
import React, {useContext, useEffect, useRef, useState} from "react";
import {useRouter} from "next/router"
import {GlobalContext} from "@/pages/_app";
import Loading from "@/components/Loading";
import TextEdgy from "@/components/TextEdgy";
import Text from "@/components/Text";

// user name might exist
// it might not exist and can create account
// 1. auth was wrong or smth, email was not validated

interface Props {
    callbackUrl?: string
}


export default function GetHandle({callbackUrl}: Props) {
    const router = useRouter()
    const {data: session, status, update} = useSession()
    const [handle, setHandle] = useState<string>("")
    const [feedbackStatus, setFeedbackStatus] = useState<string>("Minimum 8 characters")
    const [submitAllowed, setSubmitAllowed] = useState<boolean>(false)
    const GLOBALS = useContext(GlobalContext)
    const modalRef = useRef<HTMLDialogElement | null>(null)
    console.log(session?.user)

    // When rendering client side don't display anything until loading is complete
    // If no session exists, display access denied message
    useEffect(() => {
        if (!modalRef) return
        modalRef.current?.showModal()
    }, []);

    if (status === "loading") {
        return <Loading/>
    }

    if (!session) {
        return <Skeleton showNavbar={true} noContainer={false} maxWidth={"lg"}><AccessDenied/></Skeleton>
    }

    if (session.user.userHandle) {
        router.push("/")
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
                // getSession
                await update({userHandle: handle})
                // alert("Success! Please log in again")
                // signOut({callbackUrl: callbackUrl || "/"})
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


    return (
        <dialog ref={modalRef} id={"handle_modal"} className={"modal"}>
            <div className={"modal-box w-full h-full"}>
                <div className={"flex h-full -mt-24 flex-col items-center justify-center"}>
                    <TextEdgy className={"text-primary text-2xl mb-4"}>Get Handle!</TextEdgy>
                    <div className={"flex flex-col sm:flex-row items-center justify-center"}>
                        <div
                            className={`my-6 w-full max-w-xs sm:mr-4 ${!submitAllowed && "tooltip tooltip-open tooltip-primary"}`}
                            data-tip={feedbackStatus}>
                            <input className={"input input-bordered input-primary "}
                                   id={"handle"}
                                   value={handle}
                                   onChange={(e) => textHandler(e)}/>
                        </div>
                        {submitAllowed ? (
                                <button onClick={handleSubmit} className={"btn btn-info text-base-100"}>
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
                                    Submit
                                </button>)
                            :
                            (<button className={`btn btn-secondary ${!submitAllowed && "btn-disabled"} text-base-100`}>
                                Submit
                            </button>)
                        }
                    </div>
                    <div>
                        <Text>Choose handle for yourself</Text>
                        <Text>- Will be displayed as your username</Text>
                        <Text>- People will use it to do your test</Text>
                    </div>
                </div>


            </div>

        </dialog>
    );
}
