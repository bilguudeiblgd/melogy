import mongoose, {Schema} from 'mongoose';
import IUser from "@/types/IUser";

const PersonalityTypes = [
    "Chatterbox", "Critic",
    "Hustle", "Captain",
    "Maverick", "Guardian",
    "Romantic", "Trendsetter",
    "Sage", "Empath",
    "Brainiac", "Mood",
    "Wildcard", "Jester"
];


const testSchema = new Schema({
    subject: Schema.Types.ObjectId,
    object: Schema.Types.ObjectId,
    info: {
        phase0: {
            group0: [
                {
                    type: String,
                    required: true,
                    enum: [...PersonalityTypes],
                    score: Number,
                }
            ],
            group1: [
                {
                    type: String,
                    required: true,
                    enum: [...PersonalityTypes],
                    score: Number,
                }
            ]
        },
        phase1: {
            type: [ {
                type: String,
                enum: [...PersonalityTypes],
                required: true,
            } ],
            required: true
        }
    }
});

export default mongoose.models.Test || mongoose.model('tests', testSchema);