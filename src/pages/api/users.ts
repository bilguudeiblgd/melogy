
import type { NextApiRequest, NextApiResponse } from 'next';

import db from '../../lib/mongoose';
import User from '../../models/User';

export default async function handler(req: NextApiRequest, 
                                      res :NextApiResponse) {
  // await db.once('open', async () => {
  //   const users = await User.find({});
  //   res.json(users);
  // });
  res.json("Not implemented yet")
}