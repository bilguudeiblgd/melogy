import React, {useEffect, useState} from 'react';
import Phase0Button from "@/components/Test/Phase0Button";
import {Phase0QualitiesPart0} from "@/components/Test/Properties";
import {TestInfoInterface} from "@/components/Test/Properties";
import Phase0Part0Component from "@/components/Test/Phase0Part0Component";
import Phase0Part1Component from "@/components/Test/Phase0Part1Component";


type Props = {
    handleContinueButton: (arg: TestInfoInterface) => void;
    testInfo: TestInfoInterface;
    testReceiver: string
}

const Phase0Component: React.FC<Props> = ({handleContinueButton, testInfo, testReceiver}) => {
    const [partOneFinished, setPartOneFinished] = useState(false)

    const handlePart0Continue = (arg: TestInfoInterface) => {
        setPartOneFinished(true)
    }

    return (<>
        { !partOneFinished ?
            <Phase0Part0Component handleContinueButton={handlePart0Continue} testInfo={testInfo} testReceiver={testReceiver} />
            :
            <Phase0Part1Component handleContinueButton={handleContinueButton} testInfo={testInfo} testReceiver={testReceiver} />
        }
    </>)
};

export default Phase0Component;
