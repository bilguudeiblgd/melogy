import React, {useState} from 'react';
import Phase0Component from "@/components/Test/Phase0Component";
import Phase1Component from "@/components/Test/Phase1Component";
import {PHASE, TestInfoInterface, TestTypeDb} from "@/components/Test/Properties";
import {testInfoToMongo} from "@/util/TestUtils";
import PhaseDoneComponent from "@/components/Test/PhaseDoneComponent";

const defaultInitTestInfo: TestInfoInterface = {
    phase0: {
        group0: [],
        group1: []
    },
    phase1: []
}

type Props = {
    testReceiver: string;
    testGiver: string
};




const TestComponent: React.FC<Props> = ({testReceiver, testGiver}) => {
    const [stage, setStage] = useState<PHASE>(PHASE.PHASE0)
    // initialize eliminatedQualities
    let testInfo: TestInfoInterface = defaultInitTestInfo
    const handleContinueButton = (testInfo: TestInfoInterface) => {
        setStage(PHASE.PHASE1)
    }
    const handleEndButton = async (testInfo: TestInfoInterface) => {
        let info = testInfoToMongo(testInfo)
        let testObject: TestTypeDb = {
            testReceiver: testReceiver,
            testGiver: testGiver,
            info: info
        }
        try {
            const response = await fetch('/api/test/send', {
                method: 'POST',
                body: JSON.stringify(testObject),
            });

            const result = await response.json()
            console.log("Response from server:", result);
        } catch (error) {
            console.error("Error while sending test info:", error);
        }

        setStage(PHASE.PHASE_DONE)

    }
    return (
        <div className="min-h-screen flex flex-col items-center mt-10">
            {stage === PHASE.PHASE0 && <Phase0Component
                handleContinueButton={handleContinueButton} testInfo={testInfo}
            />}
            {stage === PHASE.PHASE1 && <Phase1Component
                handleContinueButton={handleEndButton} testInfo={testInfo}/>}
            {stage === PHASE.PHASE_DONE && <PhaseDoneComponent
                testInfo={testInfo} testReceiver={testReceiver}/>}
        </div>
    );
};

export default TestComponent;
