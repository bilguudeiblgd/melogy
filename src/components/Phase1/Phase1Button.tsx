import React from 'react';

interface Phase1ButtonProps {
    title: string;
    onClick: () => void;
    selected: boolean;
}

const Phase1Button: React.FC<Phase1ButtonProps> = ({ title, onClick, selected }) => {
    return (
        <div>
            <button
                className={`btn ${selected ? 'btn-primary' : 'btn-outline'} m-2`}
                onClick={onClick}
            >
                {title}
            </button>
        </div>
    );
};

export default Phase1Button;
