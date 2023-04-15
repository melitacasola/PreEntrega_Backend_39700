import mongoose from 'mongoose'

const userCollection = 'users'

const userSchema = new mongoose.Schema({
    username: String,
    pass: String,
    rol: String
});

export const UserModel = mongoose.model(userCollection, userSchema)