import type {NextApiRequest, NextApiResponse} from 'next';
import User from "@/models/User";
import IUser from "@/types/IUser";
import mongooseConnect from "@/lib/mongooseConnect";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        await mongooseConnect()

        // Step 2: Parse user string from the query
        const {user} = req.query;
        if (!user || typeof user !== 'string') {
            return res.status(400).json({error: 'User query parameter is required'});
        }

        // Step 3: Query the user from the MongoDB database using Mongoose
        const foundUser = await User.findOne<IUser>({userHandle: user}); // Adjust this query based on your schema
        if (!foundUser) {
            return res.status(404).json({error: 'User not found'});
        }

        // Step 4: Return the user data
        return res.status(200).json(foundUser);

    } catch (error) {
        console.error(error);
        return res.status(500).json({error: 'Internal server error'});
    }
}
