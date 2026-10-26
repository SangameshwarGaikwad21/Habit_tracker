
import mongoose, { Schema, type Model } from "mongoose";

const routineItemSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    startTime: {
      type: String,
      required: true,
      match: /^([01]\d|2[0-3]):[0-5]\d$/,
    },
    endTime: {
      type: String,
      required: true,
      match: /^([01]\d|2[0-3]):[0-5]\d$/,
    },
  },
  { _id: true }
);

export interface IRoutine {
  userId: mongoose.Types.ObjectId;
  routine: {
    title: string;
    startTime: string;
    endTime: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const routineSchema = new Schema<IRoutine>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    routine: {
      type: [routineItemSchema],
      default: [],
    },
  },
  { timestamps: true }
);

const RoutineModel: Model<IRoutine> =
  mongoose.models.Routine ||
  mongoose.model<IRoutine>("Routine", routineSchema);

export default RoutineModel;
