import mongoose from 'mongoose';

const connectDB = (uri: string) => {
  mongoose.set('strictQuery', true);
  
  return mongoose.connect(uri);
};

export default connectDB;