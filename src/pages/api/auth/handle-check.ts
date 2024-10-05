import type {NextApiRequest, NextApiResponse} from "next";
import mongooseConnect from "../../../lib/mongooseConnect";
import User from "@/models/User"

type Data = {
    message: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
) {
    await mongooseConnect()
    const query = JSON.parse(req.body)
    try {
        const user = await User.find(query);
        if (user.length > 0)
            return res.status(200).json({message: "Handle exists"});
        return res.status(200).json({message: "Possible to register"});

    } catch (e) {
        return res.status(500).json({message: (e as Error).message});
    }

}
