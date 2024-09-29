import React from 'react';
import Text from "@/components/Text";

interface Phase0ButtonProps {
    title: string;
    index: number;
    onClick: (index: number, selected: boolean) => void;
    selected: boolean;
}

const Phase0Button: React.FC<Phase0ButtonProps> = ({ title, index, onClick, selected}) => {
    return (
        <div className={`flex justify-center 
            ${selected && "bg-secondary"}
        `}>
            <button
                className={`btn flex justify-between btn-outline border-neutral-50 w-52 m-1 ${selected ? "hover:bg-primary" : "hover:bg-secondary"}`}
                onClick={() => {
                    onClick(index, selected)
                }}
            >
                <Text className={`text-white ${!selected ? 'line-through' : ""}`}>
                    {title}
                </Text>
                <UpDownIcon selected={selected}/>

            </button>
        </div>
    );
};

type UpDownIconProps = {
    selected: boolean
}
const UpDownIcon: React.FC<UpDownIconProps> = ({selected}) => {
    if (selected) {
        return <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M8.29904 11.75C7.72169 12.75 6.27831 12.75 5.70096 11.75L0.50481 2.75C-0.0725392 1.75 0.649149 0.499999 1.80385 0.499999L12.1962 0.5C13.3509 0.5 14.0725 1.75 13.4952 2.75L8.29904 11.75Z"
                fill="#D9D9D9"/>
        </svg>
    } else {
        return <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M5.70096 1.25C6.27831 0.249998 7.72169 0.25 8.29904 1.25L13.4952 10.25C14.0725 11.25 13.3509 12.5 12.1962 12.5L1.80384 12.5C0.649144 12.5 -0.0725408 11.25 0.504809 10.25L5.70096 1.25Z"
                fill="#D9D9D9"/>
        </svg>
    }
}


export default Phase0Button;
