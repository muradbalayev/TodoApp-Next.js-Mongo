import mongoose from "mongoose"

export const ConnectDB = async () => {
    await mongoose.connect('mongodb+srv://muradbalazade6:qTKOyothaJEqozcS@projects.23rtujj.mongodb.net/todoapp')
    console.log("DB CONNECTED")
}