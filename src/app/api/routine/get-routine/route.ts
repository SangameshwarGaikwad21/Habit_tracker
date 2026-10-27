
import { ConnectionTODB } from "@/config/Db";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import RoutineModel from "@/models/routine.models";

export async function GET() {
  try {
    // 1. Get token from cookie
    const token = (await cookies()).get("token")?.value;

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

    // 3. Verify token and extract userId
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
          message: "Invalid or expired session. Please log in again.",
        },
        { status: 401 }
      );
    }

    // 4. Connect to MongoDB
    await ConnectionTODB();

    // 5. Find this user's timetable
    const showRoutine = await RoutineModel.findOne({ userId }).lean();

    if (!showRoutine) {
      return NextResponse.json(
        {
          success: false,
          message: "Routine not found.",
        },
        { status: 404 }
      );
    }

    // 6. Return the routine
    return NextResponse.json(
      {
        success: true,
        message: "Routine fetched successfully!",
        routine: showRoutine,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Fetch routine error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch the routine.",
      },
      { status: 500 }
    );
  }
}
