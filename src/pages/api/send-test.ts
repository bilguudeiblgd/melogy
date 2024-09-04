import type {NextApiRequest, NextApiResponse} from "next";
import {TestInfoInterface} from "@/components/Test/Properties";
import mongooseConnect from "@/lib/mongooseConnect";

type Data = {
    name: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
) {
    const query = JSON.parse(req.body)


    await mongooseConnect()

    res.status(200).json({name: "Hello World!"});
}

