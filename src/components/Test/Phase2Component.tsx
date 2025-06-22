import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import TinderCard from 'react-tinder-card';
import {TestInfoInterface, TYPES} from "@/components/Test/Properties";
import TextEdgy from "@/components/TextEdgy";
import {MdOutlineSwipe} from "react-icons/md";

const cardData = [
    { name: 'Impulse', url: '/card_images/Cards_0001_Impulse-min.png', types: [TYPES.MAVERICK, TYPES.RANDOM] },
    { name: 'Drive', url: '/card_images/Cards_0002_Drive-min.png', types: [TYPES.HUSTLE, TYPES.PROTECTOR] },
    { name: 'Entertainment', url: '/card_images/Cards_0003_Entertainment-min.png', types: [TYPES.JESTER, TYPES.CHATTERBOX] },
    { name: 'Duty', url: '/card_images/Cards_0004_Duty-min.png', types: [TYPES.CAPTAIN, TYPES.EMPATH] },
    { name: 'Chill', url: '/card_images/Cards_0005_Chill-min.png', types: [TYPES.MOOD, TYPES.WISDOM] },
    { name: 'Wit', url: '/card_images/Cards_0006_Wit-min.png', types: [TYPES.BRAINIAC, TYPES.CRITIC] },
    { name: 'Attraction', url: '/card_images/Cards_0007_Attraction-min.png', types: [TYPES.STYL, TYPES.ROMANTIC] }
];

type Props = {
    handleContinueButton: (arg: TestInfoInterface) => void;
    testInfo: TestInfoInterface;
    testReceiver: string;
};

const Phase2Component: React.FC<Props> = ({ handleContinueButton, testInfo, testReceiver }) => {
    const [currentIndex, setCurrentIndex] = useState(cardData.length - 1);

    useEffect(() => {
        if (currentIndex < 0) {
            handleContinueButton(testInfo);
        }
    }, [currentIndex, handleContinueButton, testInfo]);

    const swiped = (direction: string, types: TYPES[], index: number) => {
        if (direction === 'right') {
            testInfo.phase2.push(...types.map(t => t.toString()));
        }
        setCurrentIndex(index - 1);
    };

    const outOfFrame = (name: string, idx: number) => {
        // console.log(`${name} (${idx}) left the screen!`);
    };

    return (
        <div className="flex flex-col items-center">
            <TextEdgy className="text-xl font-bold mb-4 text-center text-white">Which of these resonate with {testReceiver}?</TextEdgy>
            <TextEdgy className="mb-8 text-md text-center text-accent">Swipe right if it does, left if it doesn{"'"}t.</TextEdgy>
            <div className='relative w-[70vw] max-w-[240px] h-[360px] mx-auto'>
                {cardData.map((character, index) => (
                    <TinderCard
                        className='absolute bg-white border-2 border-gray-200 rounded-2xl w-full h-full'
                        key={character.name}
                        onSwipe={(dir) => swiped(dir, character.types, index)}
                        onCardLeftScreen={() => outOfFrame(character.name, index)}
                        preventSwipe={['up', 'down']}
                    >
                        <div
                            style={{ backgroundImage: 'url(' + character.url + ')' }}
                            className='relative w-full h-full bg-cover bg-center rounded-2xl shadow-xl'
                        >
                            <h3 className="absolute bottom-4 left-4 text-white text-2xl font-bold p-2  bg-opacity-50 rounded-lg"></h3>
                        </div>
                    </TinderCard>
                ))}
            </div>
            <MdOutlineSwipe className="text-5xl mt-4 text-accent animate-pulse" />
         
        </div>
    );
};

export default Phase2Component; 