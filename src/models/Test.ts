import mongoose, {Schema} from 'mongoose';
import IUser from "@/types/IUser";
import {TYPES} from "@/components/Test/Properties";


const testSchema = new Schema({
    subject: Schema.Types.ObjectId,
    object: Schema.Types.ObjectId,
    info: [{
        personality_test: {
            type: String,
            required: true,
            enum: [...Object.values(TYPES)]
        },
        score: Number,
    }]
});

export default mongoose.models.Test || mongoose.model('tests', testSchema);