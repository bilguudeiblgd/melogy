// lib/mongooseConnect.ts
import mongoose, { ConnectOptions, Connection } from 'mongoose';

// const options: ConnectOptions = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// };
const mongooseConnect = async () => {
  const uri: string | undefined = process.env.MONGODB_URI; // Replace with your MongoDB connection string and database name
  console.log(uri)
  if (!uri) {
    throw new Error('MongoDB connection URI is not defined in environment variables');
  }
  mongoose.connect(uri).then(
      () => console.log("Mongoose connected")
  ).catch((err) => console.log(err));
  console.log("MongoDB connection URI: " + uri);
}

export default mongooseConnect;
