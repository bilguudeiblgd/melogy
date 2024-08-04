import Skeleton from '@/components/Skeleton';
import {signIn, signOut, useSession} from 'next-auth/react'
import AccessDenied from '@/components/AccessDenied';
import Navbar from "@/components/Navbar";
import {useContext, useState} from "react";
import {GlobalContext} from "@/pages/_app";

export default function GetHandle() {
    const {data: session} = useSession()
    const [handle, setHandle] = useState<string>("")
    const [status, setStatus] = useState<string>("")
    const GLOBALS = useContext(GlobalContext)
    // When rendering client side don't display anything until loading is complete
    // If no session exists, display access denied message
    if (!session) {
        return <Skeleton><AccessDenied/></Skeleton>
    }

    const signInHandler = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        signIn();
    }

    const logOutHandler = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        signOut();
    }
    const textHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        console.log(e.target.value)
        setHandle(e.target.value)
    }
    const checkHandle = async () => {
        try {
            const response = await fetch(`${GLOBALS.baseURL}/api/handle-check`, {
                method: 'POST',
                body: JSON.stringify({handle})
        })
            const data = await response.json()
            setStatus(data.status)
        } catch(e) {
            console.error(e)
        }
    }
    const handleSubmit = async () => {
        try {
            const response = await fetch(`${GLOBALS.baseURL}/api/handle-submit`, {
                method: 'POST',
                body: JSON.stringify({handle})
            })
            const data = await response.json()
            // session.userHandle = data.status
            setStatus(data.status)
        } catch(e) {
            console.error(e)
        }
    }

    return (
        <Skeleton>
            <Navbar onSignIn={signInHandler} onLogOut={logOutHandler}/>
            <h1>Get Handle!</h1>
            <input className={"input input-bordered input-primary w-full max-w-xs"} id={"handle"} value={handle}
                   onChange={(e) => textHandler(e)}/>
            <button onClick={checkHandle} className={"btn btn-primary"}>Check</button>
            <p className={"text-red-600"}>
                {status}
            </p>
            <button onClick={handleSubmit} className={"btn btn-primary"}>Submit</button>
        </Skeleton>
    );
}
