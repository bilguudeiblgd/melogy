import {Document} from "mongoose";

interface IUser extends Document {
    name: string;
    email: string;
    image: string;
    userHandle: string;
    emailVerified: string,
}

export default IUser