import Skeleton from '@/components/Skeleton';
import {signIn, signOut, useSession} from 'next-auth/react'
import AccessDenied from '@/components/AccessDenied';
import Navbar from "@/components/Navbar";
import {useContext, useState} from "react";
import {debounce} from "lodash"
import {useRouter} from "next/router"
import {GlobalContext} from "@/pages/_app";

export default function GetHandle() {
    const router = useRouter()
    const {data: session, update} = useSession()
    const [handle, setHandle] = useState<string>("")
    const [status, setStatus] = useState<string>("Write username, only letter allowed")
    const GLOBALS = useContext(GlobalContext)
    // When rendering client side don't display anything until loading is complete
    // If no session exists, display access denied message
    if (!session) {
        return <Skeleton><AccessDenied/></Skeleton>
    }
    if(session.user.userHandle) {
        router.push("/")
    }
    console.log("session:", session)
    const signInHandler = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        signIn();
    }

    const logOutHandler = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        signOut();
    }

    const checkHandleDebounced = debounce( async (handle: string) => {
        if(handle.length < 8) {
            setStatus("Too short, 8 letter necessary")
            return false
        }
        try {
            const response = await fetch(`${GLOBALS.baseURL}/api/handle-check`, {
                method: 'POST',
                body: JSON.stringify({userHandle: handle})
        })
            if(response.ok) {
                const data = await response.json()

                console.log(data)
                setStatus("Handle is available");
                return true
            }
            else {
                setStatus("Handle not available")
                return false
            }
        } catch(e) {
            console.error(e)

            return false
        }
    }, 1000)

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
            if(response.ok) {
                const data = await response.json()
                console.log(data)
                setStatus(data.status)
                // getSession
                // This is a hack to update the session
                const event = new Event("visibilitychange");
                document.dispatchEvent(event);
                // const event = new Event("visibilitychange");
                // document.dispatchEvent(event);
                router.back()
            } else {
                const errorData = await response.json();
                setStatus(`Error: ${errorData.message || 'Failed to register handle.'}`);
            }
            // if(data. )
            // session.userHandle = data.status

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
            {/*<button onClick={textHandler} className={"btn btn-primary"}>Check</button>*/}
            <p className={"text-red-600"}>
                {status}
            </p>
            <button onClick={handleSubmit} className={"btn btn-primary"}>Submit</button>
        </Skeleton>
    );
}
