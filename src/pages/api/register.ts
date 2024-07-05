// pages/api/register.js

import { NextApiRequest, NextApiResponse } from 'next';
import connect from '@/lib/mongoose';
import User from '@/models/User';
import {redirect} from "next/navigation";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // await mongoose
    await connect();
    // mongoose.
    // await
    const { username } = req.body;
    // Validate the username
    // Connect to your database
    const newUser = new User({ username });
    // await db.collection('users').insertOne({ username });
    try {
      await newUser.save();
    } catch(err: any) {
      if ( err && err.code !== 11000 ) {
        console.log(err);
        console.log(err.code);
        res.send('Another error showed up');
        return;
      }

      //duplicate key
      if ( err && err.code === 11000 ) {
        res.status(500).json({success: false, message: 'User already exists'});
        return;
      }
    }

    return res.status(200).json({ success: true, message: 'User registered successfully' });
  }

  // Handle any other HTTP methods
  res.setHeader('Allow', ['POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}