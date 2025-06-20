import Test from "@/models/Test";
import { useRouter } from "next/router";
import Skeleton from "@/components/Skeleton";
import TextEdgy from "@/components/TextEdgy";
import { useSession } from "next-auth/react";
import AccessDenied from "@/components/AccessDenied";
import { useEffect, useState } from "react";
import { getDuoDescription, TestTypeDb, TYPES, TypeScoreType } from "@/components/Test/Properties";

const CARD_COLORS = [
    "#ECC43F", // yellow
    "#EF6A3F", // orange
    "#9F3AF8", // purple
];

const TYPE_COLORS = [
    "#01502D", // green for 1
    "#FED33D", // yellow for 2
    "#8BD91B", // green for 3
];
export const processDuoDescription = (giverTopType: TYPES | null, receiverTopType: TYPES | null) => {
    if (!giverTopType || !receiverTopType) return "Can't determine duo dynamic...";
    return getDuoDescription(giverTopType, receiverTopType);
}

export default function Page() {
    const router = useRouter();
    const { giver, receiver } = router.query;
    const [testData, setTestData] = useState<TestTypeDb | null>(null);
    const [loading, setLoading] = useState(true);
    const [giverTopType, setGiverTopType] = useState<TYPES | null>(null);
    const [receiverTopType, setReceiverTopType] = useState<TYPES | null>(null);

    const { data: session } = useSession();
    const currentUserHandle = session?.user.userHandle;

    useEffect(() => {
        const fetchTest = async () => {
            try {
                const response = await fetch(`/api/test?giver=${giver}&receiver=${receiver}`);
                const data = await response.json();
                setTestData(data.data);
                
                // Get giver's top type from their user data
                if (data.data?.testGiver) {
                    // First get the user data using the ObjectId
                    const giverResponse = await fetch(`/api/user/by-id/${data.data.testGiver}`);
                    const giverData = await giverResponse.json();
                    if (giverData.data?.results) {
                        const sortedResults = [...giverData.data.results].sort((a, b) => b.score - a.score);
                        setGiverTopType(sortedResults[0].personality_type as TYPES);
                    }
                }

                // Get receiver's top type from test data
                if (data.data?.info) {
                    const sortedInfo = [...data.data.info].sort((a, b) => b.score - a.score);
                    setReceiverTopType(sortedInfo[0].personality_type as TYPES);
                }
            } catch (error) {
                console.error('Error fetching test:', error);
            } finally {
                setLoading(false);
            }
        }
        if (giver && receiver) {
            fetchTest();
        }
    }, [giver, receiver]);

    if (session?.user.userHandle !== giver && session?.user.userHandle !== receiver) {
        return <AccessDenied />
    }


    const renderTopTypes = (info: TypeScoreType[]) => {
        const topThree = info.slice(0, 3);
        return (
            <div className="space-y-4">
                {topThree.map((type, index) => (
                    <div 
                        key={type.personality_type} 
                        className="p-4 rounded-3xl shadow-lg"
                        style={{ backgroundColor: CARD_COLORS[index] }}
                    >
                        <TextEdgy className="text-2xl font-bold">
                            {index + 1}. {type.personality_type}
                        </TextEdgy>
                        <div className="mt-2">
                            <div className="w-full bg-white/30 rounded-full h-2.5">
                                <div
                                    className="h-2.5 rounded-full"
                                    style={{ 
                                        width: `${(type.score / topThree[0].score) * 100}%`,
                                        backgroundColor: TYPE_COLORS[index]
                                    }}
                                ></div>
                            </div>
                            <TextEdgy 
                                className="text-sm mt-1 font-semibold"
                            >
                                Score: {type.score.toFixed(2)}
                            </TextEdgy>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <Skeleton showNavbar={true} noContainer={false} maxWidth={"lg"}>
            <div className="py-8">
                {/* <TextEdgy className="text-2xl text-center text-secondary font-bold mb-6">
                    Your type: <span className="text-accent">{giverTopType}</span>
                </TextEdgy> */}

                {loading ? (
                    <div>Loading...</div>
                ) : testData ? (
                    <div className="space-y-4">
                        <TextEdgy className="text-lg text-accent text-center">
                            <span className="text-secondary">Your match with {currentUserHandle}:</span> {processDuoDescription(giverTopType, receiverTopType)}
                        </TextEdgy>
                    {
                        currentUserHandle === giver ? (
                            <div className="">
                            <TextEdgy className="mt-10 mb-4 text-lg text-secondary text-center">
                                What you think {receiver}{"'"}s type is:
                            </TextEdgy>
                            {renderTopTypes(testData.info)}
                        </div>
                        ) : (
                            <div className="">
                            <TextEdgy className="mt-10 mb-4 text-lg text-secondary text-center">
                                What {giver} thinks your type is:
                            </TextEdgy>
                            {renderTopTypes(testData.info)}
                        </div>
                        )
                    }
                    </div>
                ) : (
                    <TextEdgy className="text-lg text-gray-600">
                        No test data found
                    </TextEdgy>
                )}
            </div>
        </Skeleton>
    );
}
