
import mongoose, { Schema, type Model } from "mongoose";

export interface IChallenge {
  title: string;
  slug: string;
  description: string;
  duration: 21 | 75 | 90;
  rules: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const challengeSchema = new Schema<IChallenge>(
  {
    title: {
      type: String,
      required: [true, "Challenge title is required"],
      trim: true,
      maxlength: 100,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },

    duration: {
      type: Number,
      enum: [21, 75, 90],
      required: true,
    },

    rules: {
      type: [String],
      default: [],
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const ChallengeModel: Model<IChallenge> =
  mongoose.models.Challenge ||
  mongoose.model<IChallenge>("Challenge", challengeSchema);

export default ChallengeModel;
