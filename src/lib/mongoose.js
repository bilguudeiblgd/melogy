// lib/mongoose.js
import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI; // Replace with your MongoDB connection string and database name

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default mongoose.connection;