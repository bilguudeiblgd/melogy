import React, {useState} from 'react';

interface Phase1ButtonProps {
    title: string;
    index: number;
    onClick: (index: number) => void;
}

const Phase1Button: React.FC<Phase1ButtonProps> = ({ title, index, onClick}) => {
    return (
        <div>
            <button
                className={"btn w-48 my-2"}
                onClick={() =>  {
                    onClick(index)
                }}
            >
                <p >
                    {title}
                </p>
            </button>
        </div>
    );
};

export default Phase1Button;
