import mongoose from "mongoose";

const connectTomongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("connected to mongodb");
  } catch (err) {
    console.log(`Error connecting to ${err.message}`);
  }
};

export default connectTomongoDB;

// the below code fragment can be found in:
