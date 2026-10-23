import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITask extends Document {
  title: string;
  description?: string;
  date: Date;
  status: "pending" | "completed";
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: [true, "You have to add the task"],
      trim: true,
      maxlength: [150, "Task title cannot exceed 150 characters"],
    },

    description: {
      type: String,
      default: "",
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },

    date: {
      type: Date,
    },

    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

const TaskModel: Model<ITask> = mongoose.models.Task || mongoose.model<ITask>("Task", taskSchema);

export default TaskModel;