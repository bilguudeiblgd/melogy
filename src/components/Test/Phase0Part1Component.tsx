import React from 'react';
import {Phase0QualitiesPart1, Phase0QuestionType, TestInfoInterface} from "@/components/Test/Properties";
import {shuffleArray} from "@/util/TestUtils";
import { Phase0RankingList } from './Phase0Part0Component';

type Props = {
    handleContinueButton: (arg: TestInfoInterface) => void;
    testInfo: TestInfoInterface;
    testReceiver: string
}

const Phase0Part1Component: React.FC<Props> = ({handleContinueButton, testInfo, testReceiver}) => {
    const shuffledQuestions = shuffleArray(Phase0QualitiesPart1) as Phase0QuestionType[];
    return (
        <Phase0RankingList
            initialQualities={shuffledQuestions}
            label={`What ${testReceiver} dislike`}
            onContinue={(top3) => {
                testInfo.phase0.group1 = top3;
                handleContinueButton(testInfo);
            }}
        />
    );
};

export default Phase0Part1Component;