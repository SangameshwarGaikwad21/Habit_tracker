import mongoose, { Schema } from "mongoose"

const taskModel = new Schema(
    {
        title:{
            type:String,
            required:[true,"You have to add the task"]
        },
        description:{
            type:String,
            required:false
        },
        date:{
            type:Date,
            requrired:[false,"You have to add the date"]
        },
        status:{
            type:String,
            required:true
        }
    },
    {
        timestamps:true
    }
)

const tasks= mongoose.models.tasks || mongoose.model("Task",taskModel)
export default tasks;