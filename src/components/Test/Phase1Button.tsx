import React from 'react';
import Text from "@/components/Text";

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
                <Text className={"text-white"}>
                    {title}
                </Text>
            </button>
        </div>
    );
};

export default Phase1Button;
