
import { ConnectionTODB } from "@/config/Db";
import ChallengeModel from "@/models/challanges.models";
import UserChallengeModel from "@/models/userChallenge.models";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    // 1. Get the token from the cookie
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized. Please log in.",
        },
        { status: 401 }
      );
    }

    // 2. Check JWT secret
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      console.error("JWT_SECRET is missing");

      return NextResponse.json(
        {
          success: false,
          message: "Server configuration error.",
        },
        { status: 500 }
      );
    }

    // 3. Verify the token and extract userId
    let userId: string;

    try {
      const verified = jwt.verify(token, secret);

      if (
        typeof verified === "string" ||
        typeof verified.userId !== "string" ||
        !mongoose.isValidObjectId(verified.userId)
      ) {
        throw new Error("Invalid token payload");
      }

      userId = verified.userId;
    } catch {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid or expired session. Please log in again.",
        },
        { status: 401 }
      );
    }

    // 4. Read and validate the request body
    const body: unknown = await request.json();

    if (
      typeof body !== "object" ||
      body === null ||
      !("challengeId" in body) ||
      typeof body.challengeId !== "string" ||
      !mongoose.isValidObjectId(body.challengeId)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "A valid challengeId is required.",
        },
        { status: 400 }
      );
    }

    // 5. Connect to MongoDB
    await ConnectionTODB();

    // 6. Find the shared challenge definition
    const challenge = await ChallengeModel.findById(
      body.challengeId
    );

    if (!challenge || challenge.isActive !== true) {
      return NextResponse.json(
        {
          success: false,
          message: "Challenge not found or inactive.",
        },
        { status: 404 }
      );
    }

    // 7. Check whether the user already joined
    const existing = await UserChallengeModel.findOne({
      userId,
      challengeId: challenge._id,
    });

    if (existing) {
      return NextResponse.json(
        {
          success: false,
          message: "You have already joined this challenge.",
          userChallenge: existing,
        },
        { status: 409 }
      );
    }

    // 8. Create the user's challenge participation
    const userChallenge = await UserChallengeModel.create({
      userId,
      challengeId: challenge._id,
      startDate: new Date(),
      status: "active",
    });

    // 9. Return success
    return NextResponse.json(
      {
        success: true,
        message: "Challenge started successfully!",
        userChallenge,
      },
      { status: 201 }
    );
  } catch (error) {
    // Handle duplicate-key errors
    if (
      error instanceof mongoose.mongo.MongoServerError &&
      error.code === 11000
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "You have already joined this challenge.",
        },
        { status: 409 }
      );
    }

    console.error("Start challenge error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to start challenge.",
      },
      { status: 500 }
    );
  }
}
