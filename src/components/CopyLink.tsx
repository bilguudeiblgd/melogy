import {FaRegCopy} from "react-icons/fa6";
import React, {useEffect} from "react";
import {useSession} from "next-auth/react";
import connect from "@/lib/mongoose";
import mongoose from 'mongoose'

const CopyLink: React.FC = () => {
    const { data: session } = useSession()

    useEffect(() => {
    }, [])


    return (
        <div className={"flex flex-col justify-center items-center h-full -m-32 gap-2"}>
            <button className={"btn border-2 rounded-full p-4 flex flex-row items-center"}>
                <div>
                    <p>https://methology.me/bilguudei/dome</p>
                </div>
                <div className={"pl-6 pr-2"}>
                    <FaRegCopy size={16}/>
                </div>
            </button>
            <button className="btn px-16 btn-primary"><h2>Share</h2></button>
        </div>
    )
}



export default CopyLink

