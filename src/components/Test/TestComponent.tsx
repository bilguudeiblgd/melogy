import React, {useState} from 'react';
import Phase0Component from "@/components/Test/Phase0Component";
import Phase1Component from "@/components/Test/Phase1Component";
import {PHASE, TestInfoInterface, TestTypeDb, TestRequestPayload} from "@/components/Test/Properties";
import {processTestInfo} from "@/util/TestUtils";
import PhaseDoneComponent from "@/components/Test/PhaseDoneComponent";
import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react';
import TextEdgy from "@/components/TextEdgy";

const defaultInitTestInfo: TestInfoInterface = {
    phase0: {
        group0: [],
        group1: []
    },
    phase1: []
}

type Props = {
    testReceiver: string;
};

const TestComponent: React.FC<Props> = ({testReceiver}) => {
    const router = useRouter();
    const { data: session } = useSession();
    const [stage, setStage] = useState<PHASE>(PHASE.PHASE0);

    let testInfo: TestInfoInterface = defaultInitTestInfo

    const [testObject, setTestObject] = useState<TestRequestPayload | null>(null);

    const handleContinueButton = (testInfo: TestInfoInterface) => {
        setStage(PHASE.PHASE1);
    }

    const handleEndButton = async (testInfo: TestInfoInterface) => {
        const info = processTestInfo(testInfo);
        const newTestObject: TestRequestPayload = {
            testReceiver: testReceiver,
            testGiver: undefined,
            info: info,
            group: "default"
        };
        setTestObject(newTestObject);
        setStage(PHASE.PHASE_DONE);
    }

    return (
        <div className="min-h-screen flex flex-col items-center mt-10">
            {stage === PHASE.PHASE0 && <Phase0Component
                handleContinueButton={handleContinueButton} testInfo={testInfo} testReceiver={testReceiver}
            />}
            {stage === PHASE.PHASE1 && <Phase1Component
                handleContinueButton={handleEndButton} testInfo={testInfo} testReceiver={testReceiver} />}
            {stage === PHASE.PHASE_DONE && testObject && (
                <div className="flex flex-col items-center justify-center min-h-[60vh]">
                    <TextEdgy className="text-accent text-xl mb-8">Test completed!</TextEdgy>
                    {session?.user ? (
                        <button 
                            onClick={() => router.push(`/${testReceiver}/test-done?testObject=${encodeURIComponent(JSON.stringify(testObject))}`)}
                            className="btn btn-secondary"
                        >
                            <TextEdgy className="text-white">See results</TextEdgy>
                        </button>
                    ) : (
                        <button 
                            onClick={() => signIn(undefined, { callbackUrl: `/${testReceiver}/test-done?testObject=${encodeURIComponent(JSON.stringify(testObject))}` })}
                            className="btn btn-secondary"
                        >
                            <TextEdgy className="text-white">Sign in to see results</TextEdgy>
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default TestComponent;
