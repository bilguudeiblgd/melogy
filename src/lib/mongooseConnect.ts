// lib/mongooseConnect.ts
import mongoose from 'mongoose';

// const options: ConnectOptions = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// };
/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
const cached: { connection?: typeof mongoose; promise?: Promise<typeof mongoose> } = {};

const mongooseConnect = async () => {
  const uri: string | undefined = process.env.MONGODB_URI; // Replace with your MongoDB connection string and database name
  if (!uri) {
    throw new Error('MongoDB connection URI is not defined in environment variables');
  }
  if (cached.connection) return cached.connection
  if (!cached.promise) {
    cached.promise = mongoose.connect(uri, {
      dbName: process.env.MONGODB_DBNAME || 'dev'
    })
  }
  try {
    cached.connection = await cached.promise
  } catch (e) {
    cached.promise = undefined;
    throw e;
  }
  return cached.connection
}

export default mongooseConnect;
