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
const connect = async () => {
  mongoose.connect(uri).then(
      () => console.log("Mongoose connected")
  ).catch((err) => console.log(err));
  console.log("MongoDB connection URI: " + uri);
}

export default connect;
