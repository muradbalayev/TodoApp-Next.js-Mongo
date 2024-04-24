import mongoose from "mongoose"


export const ConnectDB = async () => {
    await mongoose.connect(`mongodb+srv://${import.meta.env.MONGO_USERNAME}:${import.meta.env.MONGO_PASSWORD}@projects.23rtujj.mongodb.net/todoapp`)
    console.log("DB CONNECTED")
}
