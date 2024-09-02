import React, {useEffect, useState} from 'react';
import {Phase0QualitiesPart1, TestInfoInterface} from "@/components/Test/Properties";
import Phase0Button from "@/components/Test/Phase0Button";

type Props = {
    handleContinueButton: (arg: TestInfoInterface) => void;
    testInfo: TestInfoInterface
}


const Phase0Part1Component : React.FC<Props> = ({handleContinueButton, testInfo}) => {
    const [eliminatedQualities, setEliminatedQualities] = useState<boolean[]>([]);
    const [eliminatedCount, setEliminatedCount] = useState(0);
    const [nextPartEligible, setNextPartEligible] = useState(false);
    // initialize eliminatedQualities
    useEffect(() => {
        let arr: boolean[] = []
        Phase0QualitiesPart1.forEach(() => {
            arr.push(false)
        })
        setEliminatedQualities(arr)
    }, []);
    const handleSelecting = (index: number, selected: boolean) => {
        let tmpArray = eliminatedQualities
        const nowSelected = !tmpArray[index]
        if (nowSelected) {
            if(eliminatedCount + 1 > 4) return

            else setEliminatedCount(eliminatedCount + 1)
        }
        else setEliminatedCount(eliminatedCount - 1)
        tmpArray[index] = nowSelected
        setEliminatedQualities([...tmpArray])
        if (eliminatedCount == 3)
            setNextPartEligible(true)
        else setNextPartEligible(false)
        console.log(eliminatedQualities)
    }

    const updateTestInfo = () => {
        eliminatedQualities.forEach((val, index) => {
            if(!val)
                testInfo.phase0.group1.push(Phase0QualitiesPart1[index].text)
        });
    }

    return (
        <>
            <div>
                <p>Eliminate what {"he/she's"} not like</p>
            </div>
            <div>

                {Phase0QualitiesPart1.map((item, i) =>
                    <Phase0Button key={i} title={item.text} index={i} onClick={handleSelecting}
                                  selected={eliminatedQualities[i]}/>
                )}
            </div>

            {nextPartEligible &&
                <button onClick={() => {
                    updateTestInfo()
                    handleContinueButton(testInfo)
                }}>Continue</button>
            }
        </>
    );
};

export default Phase0Part1Component;