import React from 'react';
import Phase1Button from './Phase1Button';

interface Phase1GroupProps {
    qualities: string[];
    onEliminate: (eliminated: string[]) => void;
}

const Phase1Group: React.FC<Phase1GroupProps> = ({ qualities, onEliminate }) => {
    const [selected, setSelected] = React.useState<string[]>([]);

    const handleSelect = (quality: string) => {
        if (selected.includes(quality)) {
            setSelected(selected.filter(q => q !== quality));
        } else if (selected.length < 3) {
            setSelected([...selected, quality]);
        }
    };

    const handleConfirm = () => {
        onEliminate(selected);
    };

    return (
        <div className="max-w-md mx-auto p-4 rounded-lg shadow-md">
            <div className="flex flex-wrap justify-center mb-4">
                {qualities.map((quality, index) => (
                    <Phase1Button
                        key={index}
                        title={quality}
                        onClick={() => handleSelect(quality)}
                        selected={selected.includes(quality)}
                    />
                ))}
            </div>
            <button
                className="btn btn-success w-full"
                onClick={handleConfirm}
                disabled={selected.length !== 3}
            >
                Confirm Elimination
            </button>
        </div>
    );
};

export default Phase1Group;
