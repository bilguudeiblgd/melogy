import type { NextApiRequest, NextApiResponse } from "next";
import db from '../../lib/mongooseConnect'
import mongoose from "mongoose";
import mongooseConnect from "../../lib/mongooseConnect";
import mongodb from "@/lib/mongodb";
import {User as UserType} from "next-auth"
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
    await mongooseConnect()
    console.log("req body: ")
    console.log(typeof req.body)
    const query = JSON.parse(req.body)
    console.log("Trying user exists: ", )
    console.log(query)
    const user = await User.findOne(query);
    if(!user)
        return res.status(500).json({ status: "User doesn't exist", user: null });

    return res.status(200).json({ status: "User does exist!", user: user });
}
