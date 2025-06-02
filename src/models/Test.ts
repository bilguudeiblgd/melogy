import mongoose, {Schema} from 'mongoose';
import {TestTypeDb, TYPES} from "@/components/Test/Properties";


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
    group: {type: Schema.Types.String, required: true},
}, {timestamps: true});

// had to follow naming conventions of next-auth db adapter
export default mongoose.models.tests || mongoose.model<TestTypeDb>('tests', testSchema);