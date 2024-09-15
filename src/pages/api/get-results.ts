import type {NextApiRequest, NextApiResponse} from "next";
import mongooseConnect from '../../lib/mongooseConnect'
import User from "@/models/User";
import {TypeScoreType} from "@/components/Test/Properties";

type Data = {
    data: {
        result: TypeScoreType[]
        tests_for_me_size: number;
        tests_given_size: number;
    } | null;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
) {
    await mongooseConnect()
    const query = JSON.parse(req.body)
    try {
        const user = await User.findOne(query);
        if(!user)
            return res.status(500).json({ data: null });
        return res.status(200).json({
            data: {
                result: user.results,
                tests_for_me_size: user.tests_for_me.length,
                tests_given_size: user.tests_given.length,
            }
        });
    } catch(e) {
        return res.status(500).json({ data: null });
    }
}
