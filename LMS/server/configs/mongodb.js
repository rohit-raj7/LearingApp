// import mongoose from "mongoose";

// // connect to the mongoDb database

// const connectDB = async () => {
//     mongoose.connection.on('connected', () => console.log("Database Connected"))

//     await mongoose.connect(`${process.env.MONGODB_URI}/lms`)
// }
// export default connectDB;



import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/lms`);
    console.log("Database Connected");
  } catch (error) {
    console.error("Database Connection Error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
