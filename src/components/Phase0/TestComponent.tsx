import React, {useEffect, useState} from 'react';
import Phase0Button from "@/components/Phase0/Phase0Button";

enum TYPES {
    HUSTLE, GUARDIAN, EMPATH, CAPTAIN, JESTER, CHATTERBOX, BRAINIAC, CRITIC,
    ROMANTIC, TRENDSETTER, MAVERICK, WILDCARD, MOOD, SAGE
}

enum PHASE {
    PHASE0, PHASE1
}

const qualities = [
    {text: "Determined", types: [TYPES.HUSTLE, TYPES.GUARDIAN]},
    {text: "Caring", types: [TYPES.EMPATH, TYPES.CAPTAIN]},
    {text: "Entertaining", types: [TYPES.JESTER, TYPES.CHATTERBOX]},
    {text: "Logical", types: [TYPES.BRAINIAC, TYPES.CRITIC]},
    {text: "Good taste", types: [TYPES.ROMANTIC, TYPES.TRENDSETTER]},
    {text: "Bold", types: [TYPES.MAVERICK, TYPES.WILDCARD]},
    {text: "Deep", types: [TYPES.MOOD, TYPES.SAGE]}
];


const TestComponent: React.FC = () => {
    const [eliminatedQualities, setEliminatedQualities] = useState<boolean[]>([]);
    const [eliminatedCount, setEliminatedCount] = useState(0);
    const [nextStageEligible, setNextStageEligible] = useState(false);
    const [stage, setStage] = useState<PHASE>(PHASE.PHASE0)
    // initialize eliminatedQualities
    useEffect(() => {
        let arr: boolean[] = []
        qualities.forEach(() => {
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
            setNextStageEligible(true)
        else setNextStageEligible(false)
        console.log(eliminatedQualities)
    }

    const handleContinueButton = () => {
        setStage(PHASE.PHASE1)
    }
    // const typeScore = Array.from(TYPES)
    // const qualitiesSelected =
    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            {stage === PHASE.PHASE0 ?
                <>
                    <div>
                        <p>Eliminate what {"he/she's"} not like</p>
                    </div>
                    <div>
                        {qualities.map((item, i) =>
                            <Phase0Button key={i} title={item.text} index={i} onClick={handleSelecting}
                                          selected={eliminatedQualities[i]}/>
                        )}
                    </div>

                    {nextStageEligible &&
                        <button onClick={() => {
                            handleContinueButton()
                        }}>Continue</button>
                    }
                </> : <></>
            }

        </div>
    );
};

export default TestComponent;
