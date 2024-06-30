// lib/mongoose.ts
import mongoose, { ConnectOptions, Connection } from 'mongoose';

const uri: string | undefined = process.env.MONGODB_URI; // Replace with your MongoDB connection string and database name

if (!uri) {
  throw new Error('MongoDB connection URI is not defined in environment variables');
}

// const options: ConnectOptions = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// };

mongoose.connect(uri);

const connection: Connection = mongoose.connection;

export default connection;
