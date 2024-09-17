import type {NextApiRequest, NextApiResponse} from "next";
import mongooseConnect from "@/lib/mongooseConnect";
import Test from "@/models/Test";
import {TestTypeDb} from "@/components/Test/Properties"; // Assuming this is the file where TestSchema is defined

type Data = {
    data: TestTypeDb | null;
    message: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
) {
    // Connect to the database
    await mongooseConnect();

    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({data: null, message: "Method Not Allowed"});
    }

    try {
        const {testReceiver, testGiver} = JSON.parse(req.body);
        // Check if the necessary fields are present
        if (!testReceiver || !testGiver) {
            return res.status(400).json({data: null, message: "Missing required fields"});
        }

        const test = await Test.findOne<TestTypeDb>({testReceiver: testReceiver, testGiver: testGiver})
        if (!test) {
            return res.status(200).json({data: null, message: "Test doesn't exist"});
        }
        return res.status(200).json({data: test, message: "Test exists"});
    } catch (error) {
        return res.status(500).json({data: null, message: "Internal Server Error"});
    }
}

