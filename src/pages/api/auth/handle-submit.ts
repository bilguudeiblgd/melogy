import type {NextApiRequest, NextApiResponse} from "next";
import mongooseConnect from '../../../lib/mongooseConnect'
import User from "@/models/User"

type Data = {
    status: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
) {
    await mongooseConnect()
    const { handle, email } = JSON.parse(req.body)
    if (!handle) {
        return res.status(500).json({ status: "Not successful" });
    }
    let user = await User.findOne({ userHandle: handle }, 'userHandle');
    if(user)
        return res.status(500).json({ status: "Handle exists" });
    console.log(user)
    user = await User.findOneAndUpdate({email: email}, {userHandle: handle})
    if(user) {
        return res.status(200).json({ status: "Created handle!" });
    }
    console.log("user:", user)
    return res.status(500).json({ status: "Something wrong" });
}
