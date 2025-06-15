import mongoose, {Schema} from 'mongoose';
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

const userSchema = new Schema<DbUser>({
    name: String,
    email: String,
    image: String,
    userHandle: {
        type: String,
        required: false
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
export default mongoose.models.users || mongoose.model<DbUser>('users', userSchema);