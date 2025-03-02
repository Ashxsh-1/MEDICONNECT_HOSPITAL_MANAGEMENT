import mongoose from "mongoose";

//Database Connection
export const dbConnection = () => {
    mongoose
        .connect(process.env.MONGO_URI, {
            dbName: "HOSPITAL_MANAGEMENT_SYSTEM",
        })
        .then(() => {
            console.log("MongoDB connected");
        })
        .catch((err) => {
            console.log(`Some error occured while connecting to MongoDB database: ${err}`);
        })
};