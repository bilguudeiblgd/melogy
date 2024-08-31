import mongoose, {Schema} from 'mongoose';
import IUser from "@/types/IUser";

const userSchema = new Schema<IUser>({
    name: String,
    email: String,
    image: String,
    userHandle: {
        type: String,
        required: false
    },
    emailVerified: String,
})

export default mongoose.models.users || mongoose.model<IUser>('users', userSchema);