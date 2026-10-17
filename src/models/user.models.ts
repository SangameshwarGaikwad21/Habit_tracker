import mongoose, { Schema } from "mongoose";

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
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
    verificationToken: String,
    verificationTokenExpiry: Date,
})

const User = mongoose.models.users || mongoose.model("users",userSchema)
export default User; 