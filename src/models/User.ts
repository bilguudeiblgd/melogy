import mongoose, {Schema} from 'mongoose';
//
// import {User as UserInterface} from "next-auth"
//
const userSchema = new Schema({
    name: String,
    email: String,
    image: String,
    userHandle: {
        type: String,
        required: false
    },
    emailVerified: String,
})

export default mongoose.models.User || mongoose.model('users', userSchema);