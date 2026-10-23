
import mongoose, { Schema, type Model } from "mongoose";

export interface IChallenge {
  title: string;
  number: 21 | 75 | 90;
  date: Date;
  status: "pending" | "completed";
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const challengeSchema = new Schema<IChallenge>(
  {
    title: {
      type: String,
      required: [true, "Challenge title is required"],
      trim: true,
    },

    number: {
      type: Number,
      enum: [21, 75, 90],
      default: 21,
      required: true,
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

const ChallengeModel: Model<IChallenge> = mongoose.models.Challenge || mongoose.model<IChallenge>("Challenge", challengeSchema);

export default ChallengeModel;
