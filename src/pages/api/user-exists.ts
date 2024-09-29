import type {NextApiRequest, NextApiResponse} from "next";
import mongooseConnect from '../../lib/mongooseConnect'
import User from "@/models/User";
import IUser from "@/types/IUser";

type Data = {
    status: string;
    user: IUser | null
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
) {
    try {
        await mongooseConnect()
        const query = JSON.parse(req.body)
        const user = await User.findOne(query);
        if (!user)
            return res.status(200).json({status: "User doesn't exist", user: null});

        return res.status(200).json({status: "User does exist!", user: user});
    } catch (e) {
        return res.status(500).json({status: "Internal server error", user: null});
    }

}
