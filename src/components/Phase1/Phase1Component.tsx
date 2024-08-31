import React, { useState } from 'react';
import Phase1Group from './Phase1Group';

const qualities = [
    "Stand up for people",
    "Love solving puzzles",
    "Give life changing advice",
    "Focus on self improvement",
    "Organize group activities",
    "Do the most random things",
    "Understand how others feel",
    "Never run out of things to say",
    "Make everyone laugh",
    "Start and win an argument",
    "Have a million date ideas",
    "Take the best photos",
    "Never leave their house",
    "Get called to the principal's office"
];


const splitQualitiesIntoGroups = (arr: string[], groupCount: number): string[][] => {
    const groupSize = Math.ceil(arr.length / groupCount);
    return Array.from({ length: groupCount }, (_, i) =>
        arr.slice(i * groupSize, i * groupSize + groupSize)
    );
};

const Phase1Component: React.FC = () => {
    const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
    const [eliminatedQualities, setEliminatedQualities] = useState<string[]>([]);
    const groups = splitQualitiesIntoGroups(qualities, 4);

    const handleElimination = (eliminated: string[]) => {
        setEliminatedQualities([...eliminatedQualities, ...eliminated]);
        if (currentGroupIndex < groups.length - 1) {
            setCurrentGroupIndex(currentGroupIndex + 1);
        } else {
            console.log("All groups processed. Eliminated qualities:", eliminatedQualities);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <Phase1Group
                qualities={groups[currentGroupIndex]}
                onEliminate={handleElimination}
            />
        </div>
    );
};

export default Phase1Component;
