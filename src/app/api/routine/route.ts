
import { ConnectionTODB } from "@/config/Db";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import RoutineModel from "@/models/routine.models";

export async function POST(request: Request) {
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
          message:
            "Invalid or expired session. Please log in again.",
        },
        { status: 401 }
      );
    }

    // 4. Read request body
    const body: unknown = await request.json();

    if (
      typeof body !== "object" ||
      body === null ||
      !("routine" in body) ||
      !Array.isArray(body.routine) ||
      body.routine.length === 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "A non-empty routine array is required.",
        },
        { status: 400 }
      );
    }

    // 5. Validate every routine activity
    const timeRegex = /^([01]\d|2[0-3]):[0-5]\d$/;

    const routineItems: {
      title: string;
      startTime: string;
      endTime: string;
    }[] = [];

    for (const item of body.routine) {
      if (
        typeof item !== "object" ||
        item === null ||
        !("title" in item) ||
        typeof item.title !== "string" ||
        !item.title.trim() ||
        !("startTime" in item) ||
        typeof item.startTime !== "string" ||
        !timeRegex.test(item.startTime) ||
        !("endTime" in item) ||
        typeof item.endTime !== "string" ||
        !timeRegex.test(item.endTime)
      ) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Every routine item needs a title, startTime and endTime in HH:mm format.",
          },
          { status: 400 }
        );
      }

      routineItems.push({
        title: item.title.trim(),
        startTime: item.startTime,
        endTime: item.endTime,
      });
    }

    // 6. Connect to database
    await ConnectionTODB();

    // 7. Save or replace this user's timetable
    const routine = await RoutineModel.findOneAndUpdate(
      { userId },
      {
        $set: {
          userId,
          routine: routineItems,
        },
      },
      {
        returnDocument: "after",
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      }
    );

    // 8. Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Daily routine saved successfully!",
        routine,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Save routine error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to save daily routine.",
      },
      { status: 500 }
    );
  }
}
