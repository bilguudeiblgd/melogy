import React, {useState} from 'react';
import {Phase1Questions, Phase1QuestionType, TestInfoInterface} from "@/components/Test/Properties";
import Phase1Button from "@/components/Test/Phase1Button";
import {useRouter} from "next/router";


type Props = {
    handleContinueButton: (arg: TestInfoInterface) => void;
    testInfo: TestInfoInterface
}

function shuffleArray(array: object[]) {
    // Create a copy of the original array to avoid mutating it
    const newArray = array.slice();

    // Fisher-Yates Shuffle Algorithm
    for (let i = newArray.length - 1; i > 0; i--) {
        // Generate a random index between 0 and i
        const j = Math.floor(Math.random() * (i + 1));

        // Swap elements at index i and j
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
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
const questionsGrouped = splitInto4Group(shuffledQuestions) as Phase1QuestionType[][]

const Phase1Component: React.FC<Props> = ({handleContinueButton, testInfo}) => {
    const router = useRouter()

    const [groupIndex, setGroupIndex] = useState(0);
    // questionsGrouped[0].forEach((d) => console.log(d));
    const updateInfo = (res: string[]) => {
        testInfo.phase1.push(...res)
    }
    const handleClick = (group: number, index: number) => {
        //        do stuff
        recordAnswers.push(questionsGrouped[group][index].text)
        setGroupIndex(groupIndex + 1);
        if (groupIndex == 3) {
            //     record the answer
            updateInfo(recordAnswers)
            handleContinueButton(testInfo);
        }


    }

    return (
        <>
            <h2>Which one are they most likely to do?</h2>
            {groupIndex < 4 && questionsGrouped[groupIndex].map((question, index) =>
                <Phase1Button key={index} title={question.text} index={index} onClick={() => handleClick(groupIndex, index)}/>)
            }
        </>
    );
};

export default Phase1Component;
