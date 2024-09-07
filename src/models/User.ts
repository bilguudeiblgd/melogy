import mongoose, {Schema} from 'mongoose';
import IUser from "@/types/IUser";
import Test from "@/models/Test";
import {TestType, TYPES} from "@/components/Test/Properties";

interface DbUser extends IUser {
    tests_for_me: [TestType],
    tests_given: [TestType]
    results?: [{
        personality_type: string,
        score: number,
    }]
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
    // results: [{
    //     personality_type: String,
    //     score: Number,
    // }]
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
    }
}, {timestamps: true});

export default mongoose.models.users || mongoose.model<DbUser>('users', userSchema);