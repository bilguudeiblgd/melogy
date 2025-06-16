import mongoose from 'mongoose';
import IUser from "@/types/IUser";
import {TestTypeDb, TYPES} from "@/components/Test/Properties";

export interface DbUser extends IUser {
    tests_for_me: [TestTypeDb],
    tests_given: [TestTypeDb]
    results?: {
        personality_type: string,
        score: number,
    }[]
    groups: string[]
}

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    userHandle: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(v: string) {
                return /^[a-zA-Z0-9]{8,}$/.test(v);
            },
            message: 'userHandle must be at least 8 characters long and contain only letters and numbers'
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: false, // Not required for Google auth
    },
    image: {
        type: String,
        default: '/default-avatar.png',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    emailVerified: String,
    tests_for_me: [{type: mongoose.SchemaTypes.ObjectId, ref: "tests"}],
    tests_given: [{type: mongoose.SchemaTypes.ObjectId, ref: "tests"}],
    results: {
        type: [{
            personality_type: {
                type: String,
                required: true,
                enum: [...Object.values(TYPES)]
            },
            score: Number,
        }],
        default: Object.values(TYPES).map((value) => {
           return {personality_type: value, score: 0}
        }),
    },
    groups: {
        type: [String],
        default: ['All']
    }
}, {timestamps: true});

// had to follow naming conventions of next-auth db adapter
export default mongoose.models.User || mongoose.model('User', userSchema);