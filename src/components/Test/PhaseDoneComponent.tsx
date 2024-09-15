import React, {useEffect} from 'react';
import {TestInfoInterface} from "@/components/Test/Properties";
import {testInfoToMongo} from "@/util/TestUtils";
import DisplayTopKResult from "@/components/Test/DisplayTopXResult";
import TextEdgy from "@/components/TextEdgy";
import Link from "next/link";

const NUMBER_OF_RESULT_SHOWN = 2

interface Props {
    testInfo: TestInfoInterface,
    testReceiver: string
}

const PhaseDoneComponent: React.FC<Props> = ({testInfo, testReceiver}) => {
    const testResult = testInfoToMongo(testInfo)

    useEffect(() => {

    }, [])

    return (
        <div className={"flex flex-col items-center"}>

            <TextEdgy className={"text-sm font-bold text-primary"}>You think {testReceiver} is: </TextEdgy>
            <DisplayTopKResult topK={NUMBER_OF_RESULT_SHOWN} typeResult={testResult}/>

            <div className={"absolute left-1/2 -translate-x-1/2 bottom-4"}>
                <Link href={"/"} className="btn btn-secondary">
                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M0.336914 13.3208C0.336914 13.0904 0.336914 12.86 0.336914 12.6298C0.485874 11.892 0.962154 11.3751 1.47595 10.8641C4.60747 7.74827 7.73115 4.62431 10.8476 1.49307C11.3639 0.97423 11.8827 0.48675 12.63 0.33667H13.3211C14.0701 0.48339 14.5864 0.97535 15.1022 1.49307C18.3118 4.71643 21.5318 7.92943 24.7482 11.1463C24.8529 11.2511 24.9593 11.3547 25.0548 11.4672C26.21 12.8272 25.4717 14.9261 23.7192 15.2534C23.4574 15.3024 23.1858 15.3007 22.9021 15.3237C22.9021 15.432 22.9021 15.5297 22.9021 15.6272C22.9021 18.0128 22.9044 20.3981 22.9013 22.7837C22.8993 24.441 21.7295 25.6103 20.0752 25.6134C18.8166 25.6156 17.558 25.6142 16.2997 25.6137C15.6781 25.6137 15.4029 25.3351 15.4026 24.7059C15.402 22.8139 15.4037 20.922 15.4018 19.03C15.4009 18.1875 14.8933 17.6813 14.0488 17.6782C13.3496 17.6757 12.6496 17.6972 11.9513 17.6726C11.0942 17.6426 10.5242 18.2542 10.5368 19.0765C10.5659 20.9598 10.5466 22.8436 10.5457 24.7275C10.5454 25.3337 10.2618 25.6134 9.65139 25.6137C8.40931 25.6139 7.16723 25.6142 5.92515 25.6137C4.20343 25.6128 3.04815 24.4587 3.04731 22.7369C3.04619 20.3597 3.04731 17.9825 3.04731 15.6053C3.04731 15.5099 3.04731 15.4144 3.04731 15.3309C2.99831 15.3139 2.98347 15.3046 2.96835 15.3041C2.84515 15.3013 2.72167 15.3041 2.59847 15.2976C1.69407 15.2506 1.02067 14.827 0.596194 14.0306C0.478874 13.8105 0.421754 13.5583 0.337194 13.3208H0.336914Z"
                            fill="white"/>
                    </svg>
                </Link>
            </div>
        </div>
    );
};

export default PhaseDoneComponent;