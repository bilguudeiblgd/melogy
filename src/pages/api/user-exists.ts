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
    console.log("req body: ")
    console.log(typeof req.body)
    const query = JSON.parse(req.body)
    console.log("Trying user exists: ", )
    console.log(query)
    const user = await User.find(query);
    if(user.length == 0)
        return res.status(500).json({ status: "User doesn't exist" });

    return res.status(200).json({ status: "User does exist!" });
}
