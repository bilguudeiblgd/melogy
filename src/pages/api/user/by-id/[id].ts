import type { NextApiRequest, NextApiResponse } from "next";
import mongooseConnect from "@/lib/mongooseConnect";
import User from "@/models/User";
import { DbUser } from "@/models/User";

type Data = {
    data: DbUser | null;
    message: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    await mongooseConnect();

    if (req.method !== 'GET') {
        return res.status(405).json({ data: null, message: "Method Not Allowed" });
    }

    try {
        const { id } = req.query;

        if (!id) {
            return res.status(400).json({ data: null, message: "Missing user ID" });
        }

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ data: null, message: "User not found" });
        }

        return res.status(200).json({ data: user, message: "successful" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ data: null, message: "Internal Server Error" });
    }
} 