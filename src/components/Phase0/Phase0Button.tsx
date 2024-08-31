import React, {useState} from 'react';

interface Phase1ButtonProps {
    title: string;
    index: number;
    onClick: (index: number, selected: boolean) => void;
}

const Phase0Button: React.FC<Phase1ButtonProps> = ({ title, index, onClick}) => {
    const [selected, setSelected] = useState(false);
    return (
        <div>
            <button
                className={`btn ${selected ? 'btn-primary' : 'btn-outline'} m-2`}
                onClick={() =>  {
                    setSelected(!selected)
                    onClick(index, selected)
                }}
            >
                {title}
            </button>
        </div>
    );
};

export default Phase0Button;
