import React, { useState } from 'react';
import Phase0Button from "@/components/Phase0/Phase0Button";

enum TYPES {
    HUSTLE, GUARDIAN, EMPATH, CAPTAIN, JESTER, CHATTERBOX, BRAINIAC, CRITIC,
    ROMANTIC, TRENDSETTER, MAVERICK, WILDCARD, MOOD, SAGE
}

const qualities = [
    {text: "Determined", types: [TYPES.HUSTLE, TYPES.GUARDIAN]},
    {text: "Caring", types: [TYPES.EMPATH, TYPES.CAPTAIN]},
    {text:"Entertaining", types: [TYPES.JESTER, TYPES.CHATTERBOX]},
    {text: "Logical", types: [TYPES.BRAINIAC, TYPES.CRITIC]},
    {text: "Good taste", types: [TYPES.ROMANTIC, TYPES.TRENDSETTER]},
    {text: "Bold", types: [TYPES.MAVERICK, TYPES.WILDCARD]},
    {text: "Deep", types: [TYPES.MOOD, TYPES.SAGE]}
];


const Phase0Component: React.FC = () => {
    const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
    const [eliminatedQualities, setEliminatedQualities] = useState<string[]>([]);
    const handleSelecting = (index: number, selected: boolean) => {

    }
    // const typeScore = Array.from(TYPES)
    // const qualitiesSelected =
    return (
        <div className="min-h-screen flex items-center justify-center">
            { qualities.map((item, i) => {
                return (
                    <Phase0Button key={i} title={item.text} index={i} onClick={handleSelecting} />
                )
            }) }
        </div>
    );
};

export default Phase0Component;
