import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {TestTypeDb} from './Test/Properties';

interface TestWithUser {
    testReceiver?: {
        userHandle: string;
    };
    testGiver?: {
        userHandle: string;
    };
    info: TestTypeDb['info'];
    group: string;
    createdAt: string;
}

interface TestHistoryProps {
    userHandle: string;
}

const TestHistory: React.FC<TestHistoryProps> = ({userHandle}) => {
    const [testsGiven, setTestsGiven] = useState<TestWithUser[]>([]);
    const [testsReceived, setTestsReceived] = useState<TestWithUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchTestHistory = async () => {
            try {
                // Fetch tests given
                const givenResponse = await fetch(`/api/user/${userHandle}/get-tests-given`);
                if (!givenResponse.ok) {
                    throw new Error('Failed to fetch tests given');
                }
                const givenData = await givenResponse.json();
                setTestsGiven(Array.isArray(givenData) ? givenData : []);

                // Fetch tests received
                const receivedResponse = await fetch(`/api/user/${userHandle}/get-tests-received`);
                if (!receivedResponse.ok) {
                    throw new Error('Failed to fetch tests received');
                }
                const receivedData = await receivedResponse.json();
                setTestsReceived(Array.isArray(receivedData) ? receivedData : []);

                setLoading(false);
            } catch (error) {
                console.error('Error fetching test history:', error);
                setError(error instanceof Error ? error.message : 'An error occurred');
                setLoading(false);
            }
        };

        fetchTestHistory();
    }, [userHandle]);

    if (loading) {
        return <div className="animate-pulse">Loading test history...</div>;
    }

    if (error) {
        return <div className="text-error text-center">{error}</div>;
    }

    return (
        <div className="space-y-8">
            {/* Tests Given Section */}
            <div>
                <h2 className="text-2xl font-bold mb-4 text-primary">Tests Given</h2>
                <div className="space-y-4">
                    {!testsGiven || testsGiven.length === 0 ? (
                        <p className="text-gray-500">No tests given yet</p>
                    ) : (
                        testsGiven.map((test, index) => (
                            <div key={index} className="bg-secondary p-4 rounded-lg shadow">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="font-semibold text-primary">
                                            To: {test.testReceiver?.userHandle || 'Unknown'}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {new Date(test.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => router.push(`/${test.testReceiver?.userHandle}`)}
                                        className="btn btn-primary btn-sm"
                                    >
                                        View Profile
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Tests Received Section */}
            <div>
                <h2 className="text-2xl font-bold mb-4 text-primary">Tests Received</h2>
                <div className="space-y-4">
                    {!testsReceived || testsReceived.length === 0 ? (
                        <p className="text-gray-500">No tests received yet</p>
                    ) : (
                        testsReceived.map((test, index) => (
                            <div key={index} className="bg-secondary p-4 rounded-lg shadow">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="font-semibold text-primary">
                                            From: {test.testGiver?.userHandle || 'Unknown'}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {new Date(test.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => router.push(`/${test.testGiver?.userHandle}`)}
                                        className="btn btn-primary btn-sm"
                                    >
                                        View Profile
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default TestHistory; 