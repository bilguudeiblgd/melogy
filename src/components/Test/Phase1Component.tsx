import React, {useState} from 'react';
import {Phase1Questions, Phase1QuestionType, TestInfoInterface} from "@/components/Test/Properties";
import Phase1Button from "@/components/Test/Phase1Button";
import {shuffleArray} from "@/util/TestUtils";
import TextEdgy from "@/components/TextEdgy";


type Props = {
    handleContinueButton: (arg: TestInfoInterface) => void;
    testInfo: TestInfoInterface
}



function splitInto4Group(arr: object[]) {
      if (arr.length !== 14) {
        throw new Error("Array must have exactly 14 elements.");
      }
    
      return [
        arr.slice(0, 4),   // First 4 elements
        arr.slice(4, 8),   // Next 4 elements
        arr.slice(8, 11),  // Next 3 elements
        arr.slice(11, 14)  // Last 3 elements
      ];
}

let recordAnswers: string[] = []

const shuffledQuestions = shuffleArray(Phase1Questions) as Phase1QuestionType[]

const Phase1Component: React.FC<Props> = ({handleContinueButton, testInfo}) => {
    const [groupIndex, setGroupIndex] = useState(0);
    const [twoQuestions, setTwoQuestions] = useState<Phase1QuestionType[]>([shuffledQuestions[0], shuffledQuestions[1]]);

    // questionsGrouped[0].forEach((d) => console.log(d));
    const updateInfo = (res: string[]) => {
        testInfo.phase1.push(...res)
    }
    console.log(shuffledQuestions)
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
                console.log("LAst chosen test: ", chosenText)

            }, 1000)
            return
        }

        setTwoQuestions([twoQuestions[index], shuffledQuestions[groupIndex + 2]])
        setGroupIndex(groupIndex + 1);

    }

    return (
        <>
            <TextEdgy className={"mb-4 text-white"}>Which one are they most likely to do?</TextEdgy>
            {groupIndex <= 12 ? twoQuestions.map((question: Phase1QuestionType, index: number) =>
                    <Phase1Button key={index} title={question.text} index={index}
                                  onClick={() => handleClick(groupIndex, index, question.text)}/>)
                : <TextEdgy>SUCCESS</TextEdgy>
            }

        </>
    );
};

export default Phase1Component;
