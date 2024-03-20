import mongoose from "mongoose";

export const mongoDb= async()=>{
    try {
        // console.log(`${process.env.MONGODB_DATABASE_URL}/${process.env.MONGODB_DATABASE_NAME}`)
        await mongoose.connect(`${process.env.MONGODB_DATABASE_URL}/${process.env.MONGODB_DATABASE_NAME}`)
        console.log("Data Base connection successful")
    } catch (error) {
        console.log("Database not connected : ", error);
        process.exit(0);
    }
}