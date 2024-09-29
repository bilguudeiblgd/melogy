import React from 'react';
import Image from "next/image";
import TextEdgy from "@/components/TextEdgy";

type Props = {
    darkTheme: boolean
}

const Logo: React.FC<Props> = ({darkTheme}) => {
    return (
        <div className={"flex flex-row justify-center align-center"}>
            <div>
                <Image src={'/whitelogo.png'} alt={"Logo of illustrated face with multiple layers"}  width={48} height={48} />
            </div>
            <TextEdgy className={"hidden md:flex justify-center items-center ml-1 mt-1 text-4xl"}>
                <span className={`text-secondary`}>ME</span>
                <span className={`${darkTheme ? "text-white" : "text-primary"}`}>LOGY</span>
            </TextEdgy>
        </div>
    );
};

export default Logo;