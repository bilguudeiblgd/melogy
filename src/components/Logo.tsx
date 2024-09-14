import React from 'react';
import Image from "next/image";
import TextEdgy from "@/components/TextEdgy";
import Text from "@/components/Text";

const Logo = () => {
    return (
        <div className={"flex flex-row justify-center align-center"}>
            <div>
                <Image src={'/whitelogo.png'} alt={"Logo of illustrated face with multiple layers"}  width={48} height={48} />
            </div>
            <TextEdgy className={"hidden md:flex justify-center items-center ml-1 mt-1 text-primary text-4xl"}>MELOGY</TextEdgy>
        </div>
    );
};

export default Logo;