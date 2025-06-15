import type { NextApiRequest, NextApiResponse } from 'next';
import User, { DbUser } from "@/models/User";
import mongooseConnect from "@/lib/mongooseConnect";
import mongoose from "mongoose";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        await mongooseConnect()
        console.log(mongoose.modelNames())
        if (!mongoose.modelNames().includes("tests"))
            return res.status(500).json({ error: 'model tests has not been initialized' });

        const { user } = req.query;
        if (!user || typeof user !== 'string') {
            return res.status(400).json({ error: 'User query parameter is required' });
        }

        const foundUser = await User.findOne<DbUser>({ userHandle: user })

        if (!foundUser)
            return res.status(404).json({ error: 'User not found' });

        const populatedData = await foundUser?.populate({
            path: 'tests_for_me', populate: [
                { path: 'testGiver' },
                { path: 'testReceiver' },
            ]
        });
        return res.status(200).json(populatedData.tests_for_me);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
} 