import React from 'react';
import Text from "@/components/Text";
import TextEdgy from "@/components/TextEdgy";

interface Phase1ButtonProps {
    title: string;
    index: number;
    onClick: (index: number) => void;
}

const Phase1Button: React.FC<Phase1ButtonProps> = ({ title, index, onClick}) => {
    return (
        <div>
            <button
                className={"btn btn-secondary w-52 my-2"}
                onClick={() =>  {
                    onClick(index)
                }}
            >
                <TextEdgy className={"text-white font-bold"}>
                    {title}
                </TextEdgy>
            </button>
        </div>
    );
};

export default Phase1Button;
