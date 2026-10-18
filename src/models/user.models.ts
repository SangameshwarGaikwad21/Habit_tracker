import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

export const userSchema = new Schema({
    username:{
        type:String,
        required:[true,"username is required"],
        trim:true
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        unique:true
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    }, 
    verificationToken: {
        type: String,
    },
    verificationTokenExpiry: {
        type: Date,
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
})



const User = mongoose.models.users || mongoose.model("users",userSchema)
export default User; 