
import mongoose, { Schema, type Model } from "mongoose";

export interface IHabit {
  title: string;
  description?: string;
  date: Date;
  status: "pending" | "completed";
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const habitSchema = new Schema<IHabit>(
  {
    title: {
      type: String,
      required: [true, "You have to add the habit title"],
      trim: true,
      maxlength: [150, "Habit title cannot exceed 150 characters"],
    },

    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },

    date: {
      type: Date,
      default: Date.now,
    },

    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

const HabitModel: Model<IHabit> = mongoose.models.Habit || mongoose.model<IHabit>("Habit", habitSchema);

export default HabitModel;
