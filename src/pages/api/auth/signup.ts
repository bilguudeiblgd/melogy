import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import User from "@/models/User";
import dbConnect from "@/lib/dbConnect";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        await dbConnect();

        const { userHandle, password } = req.body;

        // Validate userHandle format
        if (!/^[a-zA-Z0-9]{8,}$/.test(userHandle)) {
            return res.status(400).json({ 
                message: "User handle must be at least 8 characters long and contain only letters and numbers" 
            });
        }

        // Check if userHandle already exists
        const existingHandle = await User.findOne({ userHandle: userHandle });
        if (existingHandle) {
            console.log("User handle already exists", existingHandle);
            return res.status(400).json({ message: "This user handle is already taken" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({
            userHandle,
            password: hashedPassword,
            name: userHandle, // Use userHandle as name
            email: `${userHandle}@temp.com`, // Temporary email
        });

        // Remove password from response
        const { password: _, ...userWithoutPassword } = user.toObject();

        res.status(201).json(userWithoutPassword);
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: "Error creating user" });
    }
} 