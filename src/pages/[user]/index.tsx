import {useRouter} from 'next/router'
import {signIn, useSession} from "next-auth/react";
import AccessDenied from "@/components/AccessDenied";
import Skeleton from "@/components/Skeleton";
import {TypeScoreType} from "@/components/Test/Properties";
import React, {useContext, useEffect, useState} from "react";
import {GlobalContext} from "@/pages/_app";
import Loading from "@/components/Loading";
import TextEdgy from "@/components/TextEdgy";
import DisplayTopKResult from "@/components/Test/DisplayTopXResult";

const REQUIRED_TEST_FOR_ME = 1
const REQUIRED_TEST_FOR_OTHERS = 1
const NUMBER_OF_RESULT_SHOWN = 3

export default function Page() {
    const router = useRouter()
    const userName: string[] | string | undefined = router.query.user
    const GLOBALS = useContext(GlobalContext)
    const [testsForMeSize, setTestsForMeSize] = useState<number | null>(null)
    const [testsGivenSize, setTestsGivenSize] = useState<number | null>(null)
    const [typeResult, setTypeResult] = useState<TypeScoreType[]>([])
    const {data: session, status} = useSession()

    useEffect(() => {
        const fetchResultScore = async () => {
            try {
                const response = await fetch(`${GLOBALS.baseURL}/api/get-results`, {
                    method: 'POST',
                    body: JSON.stringify({userHandle: session?.user.userHandle})
                })
                const data = await response.json()
                const results: TypeScoreType[] = data.data.result

                setTestsForMeSize(data.data.tests_for_me_size)
                setTestsGivenSize(data.data.tests_given_size)
                if (results) {
                    setTypeResult(results)
                } else {
                    console.log("Some error let's go")
                }
            } catch (e) {

            }
        }

        fetchResultScore()
    }, [GLOBALS.baseURL, session?.user.userHandle])



    if (status === "loading") {
        return <Loading/>
    }

    if (!session) {
        signIn(undefined, {
            callbackUrl: `/${router.query.user}` || ""
        })
    }

    if (session?.user.userHandle != userName) {
        return <AccessDenied/>
    }

    if (testsGivenSize === null || testsForMeSize === null) {
        return <Loading/>
    }

    if (testsForMeSize < REQUIRED_TEST_FOR_ME || testsGivenSize < REQUIRED_TEST_FOR_OTHERS) {
        return (
            <Skeleton showNavbar={true} noContainer={false} darkTheme={false}>
                <div className={"flex flex-col items-center mt-12"}>
                    <NumberTestCard testsForMeSize={testsForMeSize} testsGivenSize={testsGivenSize}/>

                    <div className={"mt-8"}>
                        <TextEdgy className={"text-primary mb-4"}>TASKS LEFT:</TextEdgy>
                        {testsForMeSize < REQUIRED_TEST_FOR_ME &&
                            <div className={"flex justify-start mb-2 items-center"}>
                                <input type="checkbox checkbox-primary" disabled={true} checked={testsForMeSize >= 1}
                                       className="checkbox"/>
                                <span className="ml-2 text-left">Ask {REQUIRED_TEST_FOR_ME} people to tests you.</span>
                            </div>
                        }
                        {testsGivenSize < REQUIRED_TEST_FOR_OTHERS &&
                            <div className={"flex justify-start items-center"}>
                                <input type="checkbox checkbox-secondary" disabled={true} checked={testsGivenSize >= 1}
                                       className="checkbox"/>
                                <span
                                    className="ml-2 text-left">Give {REQUIRED_TEST_FOR_OTHERS} tests for other people.</span>
                            </div>
                        }
                    </div>
                </div>
            </Skeleton>
        )
    }


    return (<Skeleton showNavbar={true} noContainer={false} darkTheme={false}>
        <div className={"flex flex-col items-center mt-12"}>
            <NumberTestCard testsForMeSize={testsForMeSize} testsGivenSize={testsGivenSize}/>
            <TextEdgy className={"text-primary mt-4"}>RESULT:</TextEdgy>
            <div className={"mt-6"}>
                <DisplayTopKResult topK={NUMBER_OF_RESULT_SHOWN} typeResult={typeResult}/>
            </div>

        </div>
    </Skeleton>)

}




interface NumberTestProps {
    testsForMeSize: number
    testsGivenSize: number
}

const NumberTestCard: React.FC<NumberTestProps> = ({testsForMeSize, testsGivenSize}) => {
    return (
        <div className="stats shadow">

            <div className="stat">
                <div className="stat-figure text-primary">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block h-8 w-8 stroke-current">
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                    </svg>
                </div>
                <div className="stat-title">Total tests for you</div>
                <div className="stat-value text-primary">{testsForMeSize}</div>
            </div>
            <div className="stat">
                <div className="stat-figure text-secondary">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block h-8 w-8 stroke-current">
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                    </svg>
                </div>
                <div className="stat-title">Total given</div>
                <div className="stat-value text-secondary">{testsGivenSize}</div>
            </div>
        </div>
    )
}




