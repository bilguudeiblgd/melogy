import React, { useState } from 'react';
import { Phase1Questions, Phase1QuestionType, TestInfoInterface } from "@/components/Test/Properties";
import Phase1Button from "@/components/Test/Phase1Button";
import { shuffleArray } from "@/util/TestUtils";
import TextEdgy from "@/components/TextEdgy";
import Loading from "@/components/Loading";


type Props = {
    handleContinueButton: (arg: TestInfoInterface) => void;
    testInfo: TestInfoInterface;
    testReceiver: string
}

let recordAnswers: string[] = []

const shuffledQuestions = shuffleArray(Phase1Questions) as Phase1QuestionType[]

const Phase1Component: React.FC<Props> = ({ handleContinueButton, testInfo, testReceiver }) => {
    const [groupIndex, setGroupIndex] = useState(0);
    const [twoQuestions, setTwoQuestions] = useState<Phase1QuestionType[]>([shuffledQuestions[0], shuffledQuestions[1]]);
    const [loading, setLoading] = useState(false)

    const updateInfo = (res: string[]) => {
        testInfo.phase1.push(...res)
    }
    const handleClick = (groupIndex: number, index: number, chosenText: string) => {
        //        do stuff
        recordAnswers.push(chosenText)

        if (groupIndex == 12) {
            //     record the answer
            setTimeout(() => {
                for (let i = 0; i < 11; i++) {
                    recordAnswers.push(chosenText)
                }
                updateInfo(recordAnswers)
                handleContinueButton(testInfo);
                console.log("Last chosen test: ", chosenText)
                setLoading(false)

            }, 500)
            setLoading(true)
            return
        }

        setTwoQuestions([twoQuestions[index], shuffledQuestions[groupIndex + 2]])
        setGroupIndex(groupIndex + 1);

    }
    
    return (
        <>
            <TextEdgy className={"mb-4 text-white"}>Which one is {testReceiver} most likely to do?</TextEdgy>
            {loading ? <Loading/> :
            <div className={"flex flex-col items-center"}>
                {groupIndex <= 12 ? twoQuestions.map((question: Phase1QuestionType, index: number) =>
                    <Phase1Button key={index} title={question.text} index={index}
                        onClick={() => handleClick(groupIndex, index, question.text)} />)
                    : <TextEdgy>SUCCESS</TextEdgy>
                }
            </div>
            }
        </>
    );
};

export default Phase1Component;
