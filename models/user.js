import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email:{
        type:String,
        unique:true
    },
    firsName:String,
    lastName :String,
    password: String,
    avatar:String
})

export const User = mongoose.model('User',userSchema)