import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useCreateIndex: true,
      useNewUrlParser: true
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch(error) {
    console.log(`error! ${error}`);
  }
};

export default connectDB;
