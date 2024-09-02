import React, {useEffect, useState} from 'react';
import Phase0Button from "@/components/Test/Phase0Button";
import Phase0Component from "@/components/Test/Phase0Component";
import Phase1Component from "@/components/Test/Phase1Component";
import {PHASE, TestInfoInterface, TYPES} from "@/components/Test/Properties";

const defaultInitTestInfo: TestInfoInterface = {
    phase0: {
        group0: [],
        group1: []
    },
    phase1: []
}

const TestComponent: React.FC = () => {
    const [stage, setStage] = useState<PHASE>(PHASE.PHASE0)
    // initialize eliminatedQualities
    let testInfo: TestInfoInterface = defaultInitTestInfo
    const handleContinueButton = (testInfo: TestInfoInterface) => {
        setStage(PHASE.PHASE1)
    }
    const handleEndButton = (testInfo: TestInfoInterface) => {

    }
    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            {stage === PHASE.PHASE0 && <Phase0Component
                handleContinueButton={handleContinueButton} testInfo={testInfo}
            />}
            {stage === PHASE.PHASE1 && <Phase1Component handleContinueButton={handleEndButton} testInfo={testInfo} />}

        </div>
    );
};

export default TestComponent;
