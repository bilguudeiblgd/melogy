import {FaRegCopy} from "react-icons/fa6";
import React, {useContext, useEffect} from "react";
import {useSession} from "next-auth/react";
import {GlobalContext} from "@/pages/_app";

type Props = {
    userHandle: string
}

const CopyLink: React.FC<Props> = ({userHandle}) => {
    const { data: session } = useSession()
    const [copied, setCopied] = React.useState<boolean>(false)
    useEffect(() => {
    }, [])

    const buttonHandler = (url: string) => {
        navigator.clipboard.writeText(url)
            .then(r => {
                setCopied(true)
                setTimeout((() => {
                    setCopied(false)
                }), 1500)
            })
    }
    const GLOBALS = useContext(GlobalContext)
    const generatedURL = `${GLOBALS.baseURL}/${userHandle}/dome`

    return (
        <div >
            {copied && <NotifCopiedToClipboard />}
            <button onClick={() => buttonHandler(generatedURL)}
                    className={"btn border-none rounded-full p-4 flex flex-row items-center btn-primary"}>
                <div>
                    <p className="text-accent text-bold">{generatedURL}</p>
                </div>
                <div className={"text-accent pl-6 pr-2"}>
                    <FaRegCopy size={16}/>
                </div>
            </button>
            {/*<button className="btn px-16 btn-primary"><h2>Share</h2></button>*/}
        </div>
    )
}

const NotifCopiedToClipboard: React.FC = () => {
    return (
        <div className={"fixed left-1/2 -translate-x-1/2 top-4"}>
            <div role="alert" className="alert bg-secondary alert-success">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="h-6 w-6 shrink-0 stroke-current text-accent">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span className="text-accent">Copied to clipboard</span>
            </div>
        </div>
    )
};


export default CopyLink

