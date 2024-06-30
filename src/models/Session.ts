import mongoose from 'mongoose';
import User from './User';

const sessionSchema = new mongoose.Schema({
  user: User,
  session: String,
});

export default mongoose.models.Session || mongoose.model('User', sessionSchema);