
import mongoose, { Schema, type Model } from "mongoose";

export interface IRoutine {
  userId: mongoose.Types.ObjectId;
  title: string;
  time: string;
  createdAt: Date;
  updatedAt: Date;
}

const routineSchema = new Schema<IRoutine>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: [true, "Routine title is required"],
      trim: true,
    },

    time: {
      type: String,
      required: [true, "Routine time is required"],
      match: [
        /^([01]\d|2[0-3]):[0-5]\d$/,
        "Time must be in HH:mm format",
      ],
    },
  },
  { timestamps: true }
);

routineSchema.index({ userId: 1, time: 1 });

const RoutineModel: Model<IRoutine> = mongoose.models.Routine || mongoose.model<IRoutine>("Routine", routineSchema);

export default RoutineModel;
