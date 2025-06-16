import React from 'react';
import {Phase0QualitiesPart0, Phase0QuestionType, TestInfoInterface} from "@/components/Test/Properties";
import {shuffleArray} from "@/util/TestUtils";
import { Phase0RankingList } from './Phase0Component';

const Phase0Part0Component: React.FC<{
    handleContinueButton: (arg: TestInfoInterface) => void;
    testInfo: TestInfoInterface;
    testReceiver: string;
}> = ({handleContinueButton, testInfo, testReceiver}) => {
    const shuffledQuestions = shuffleArray(Phase0QualitiesPart0) as Phase0QuestionType[];
    return (
        <Phase0RankingList
            initialQualities={shuffledQuestions}
            label={`What ${testReceiver} is like`}
            onContinue={(top3) => {
                testInfo.phase0.group0 = top3;
                handleContinueButton(testInfo);
            }}
        />
    );
};

export default Phase0Part0Component;