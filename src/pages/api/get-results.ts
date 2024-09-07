import type { NextApiRequest, NextApiResponse } from "next";
import db from '../../lib/mongooseConnect'
import mongoose from "mongoose";
import mongooseConnect from "../../lib/mongooseConnect";
import mongodb from "@/lib/mongodb";
import {User as UserType} from "next-auth"
import User from "@/models/User";
import IUser from "@/types/IUser";
import {TypeScoreType} from "@/components/Test/Properties";

type Data = {
    data: TypeScoreType[] | null;
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
        return res.status(200).json({ data: user.results });
    } catch(e) {
        return res.status(500).json({ data: null });
    }
}
