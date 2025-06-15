// src/pages/api/migrate-types.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import mongooseConnect from '@/lib/mongooseConnect';
import User from '@/models/User';
import Test from '@/models/Test';
import { TYPES } from '@/components/Test/Properties';

// Map old enum values to new ones
const OLD_TO_NEW_TYPES = {
    'GUARDIAN': TYPES.PROTECTOR,
    'TRENDSETTER': TYPES.STYL,
    'WILDCARD': TYPES.RANDOM,
    'SAGE': TYPES.WISDOM
} as const;

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        await mongooseConnect();
        console.log('Connected to MongoDB');

        // Get all users
        const users = await User.find({});
        console.log(`Found ${users.length} users`);

        // Update each user's results
        for (const user of users) {
            if (user.results) {
                user.results = user.results.map((result: any) => ({
                    personality_type: OLD_TO_NEW_TYPES[result.personality_type as keyof typeof OLD_TO_NEW_TYPES] || result.personality_type,
                    score: result.score
                }));
                await user.save();
                console.log(`Updated user ${user.userHandle}`);
            }
        }

        // Get all tests
        const tests = await Test.find({});
        console.log(`Found ${tests.length} tests`);

        // Update each test's info
        for (const test of tests) {
            if (test.info) {
                test.info = test.info.map((info: any) => ({
                    personality_type: OLD_TO_NEW_TYPES[info.personality_type as keyof typeof OLD_TO_NEW_TYPES] || info.personality_type,
                    score: info.score
                }));
                await test.save();
                console.log(`Updated test ${test._id}`);
            }
        }

        return res.status(200).json({ message: 'Migration completed successfully' });
    } catch (error) {
        console.error('Migration failed:', error);
        return res.status(500).json({ message: 'Migration failed', error: String(error) });
    }
}