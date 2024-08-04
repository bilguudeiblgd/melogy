import type { NextApiRequest, NextApiResponse } from "next";
import db from '../../lib/mongooseConnect'
import mongoose from "mongoose";
import mongooseConnect from "../../lib/mongooseConnect";
import User from "@/models/User"
import mongodb from "@/lib/mongodb";
type Data = {
    status: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
) {
    await mongooseConnect()
    const { handle } = JSON.parse(req.body)
    if (!handle) {
        return res.status(500).json({ status: "Not successful" });
    }
    const user = await User.findOne({ userHandle: "bel" });
    if(user.length > 0)
        return res.status(500).json({ status: "Handle exists" });
    console.log(user)

    return res.status(200).json({ status: "Possible to register!" });
}
