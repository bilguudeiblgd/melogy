import mongoose, {Schema} from 'mongoose';
import IUser from "@/types/IUser";
import {TestInfoInterface, TestTypeDb, TYPES} from "@/components/Test/Properties";


const testSchema = new Schema<TestTypeDb>({
    testReceiver: {type: Schema.Types.ObjectId, ref: "users", required: true},
    testGiver: {type: Schema.Types.ObjectId, ref: "users", required:true},
    info: [{
        personality_type: {
            type: String,
            required: true,
            enum: [...Object.values(TYPES)]
        },
        score: Number,
    }],
}, {timestamps: true});

export default mongoose.models.Test || mongoose.model<TestTypeDb>('tests', testSchema);