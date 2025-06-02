import React, {useState} from 'react';
import {Phase0QualitiesPart0, Phase0QuestionType, TestInfoInterface} from "@/components/Test/Properties";
import Phase0Button from "@/components/Test/Phase0Button";
import {shuffleArray} from "@/util/TestUtils";
import TextEdgy from "@/components/TextEdgy";

type Props = {
    handleContinueButton: (arg: TestInfoInterface) => void;
    testInfo: TestInfoInterface;
    testReceiver: string
}


const Phase0Part0Component: React.FC<Props> = ({handleContinueButton, testInfo, testReceiver}) => {
    const shuffledQuestions = shuffleArray(Phase0QualitiesPart0) as Phase0QuestionType[]
    const [qualities, setQualities] = useState<Phase0QuestionType[]>(shuffledQuestions)
    const [nextPartEligible, setNextPartEligible] = useState(false);

    const updateTestInfo = () => {
        for (let i = 0; i < 3; i++) {
            testInfo.phase0.group0.push(qualities[i].text)
        }
    }

    const handleSelecting = (index: number, selected: boolean) => {
        let tmpArray = qualities
        setNextPartEligible(true)
        if (selected) {
            for (let i = index; i < tmpArray.length - 1; i++) {
                [tmpArray[i], tmpArray[i + 1]] = [tmpArray[i + 1], tmpArray[i]];
            }
            setQualities([...tmpArray])
        } else {
            for (let i = index; i > 0; i--) {
                [tmpArray[i], tmpArray[i - 1]] = [tmpArray[i - 1], tmpArray[i]];
            }
            setQualities([...tmpArray])
        }
    }

    return (
        <>
            <div className={"mb-4"}>
                <TextEdgy className={"text-white"}>What {testReceiver} like</TextEdgy>
            </div>

            <div className={"w-full"}>
                {qualities.map((item, i) =>
                    <Phase0Button key={i} title={item.text} index={i}
                                  onClick={handleSelecting}
                                  selected={i < 3}
                    />
                )}
            </div>

            {nextPartEligible &&
                <button className={"btn btn-secondary mt-2"} onClick={() => {
                    updateTestInfo()
                    handleContinueButton(testInfo)
                }}>
                    <TextEdgy className={"text-white"}>Continue</TextEdgy>
                </button>
            }
        </>
    );
};

export default Phase0Part0Component;