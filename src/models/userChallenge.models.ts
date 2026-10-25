import mongoose, { Schema, type Model } from "mongoose";

export interface IUserChallenge {
  userId: mongoose.Types.ObjectId;
  challengeId: mongoose.Types.ObjectId;
  startDate: Date;
  status: "active" | "completed" | "abandoned";
  createdAt: Date;
  updatedAt: Date;
}

const userChallengeSchema = new Schema<IUserChallenge>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    challengeId: {
      type: Schema.Types.ObjectId,
      ref: "Challenge",
      required: true,
    },

    startDate: {
      type: Date,
      default: Date.now,
      required: true,
    },

    status: {
      type: String,
      enum: ["active", "completed", "abandoned"],
      default: "active",
    },
  },
  { timestamps: true }
);

userChallengeSchema.index(
  { userId: 1, challengeId: 1 },
  { unique: true }
);

const UserChallengeModel: Model<IUserChallenge> =
  mongoose.models.UserChallenge ||
  mongoose.model<IUserChallenge>("UserChallenge", userChallengeSchema);

export default UserChallengeModel;