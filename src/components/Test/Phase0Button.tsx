import React, {useState} from 'react';

interface Phase0ButtonProps {
    title: string;
    index: number;
    onClick: (index: number, selected: boolean) => void;
    selected: boolean;
}

const Phase0Button: React.FC<Phase0ButtonProps> = ({ title, index, onClick, selected}) => {
    return (
        <div>
            <button
                className={`btn ${selected ? 'btn-neutral' : 'btn-primary'} m-2 w-40`}
                onClick={() =>  {
                    onClick(index, selected)
                }}
            >
                <p className={`${selected ? 'line-through' : ""}`}>
                    {title}
                </p>
            </button>
        </div>
    );
};

export default Phase0Button;
