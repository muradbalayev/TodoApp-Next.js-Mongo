import mongoose from "mongoose"


export const ConnectDB = async () => {
    await mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@projects.23rtujj.mongodb.net/todoapp`)
    console.log("DB CONNECTED")
}
