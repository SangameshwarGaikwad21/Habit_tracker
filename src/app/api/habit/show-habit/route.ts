import { ConnectionTODB } from "@/config/Db";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import HabitModel from "@/models/habit.models";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request) {
  try {
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

    let userId: string;

    try {
      const verified = jwt.verify(token, secret);

      if ( typeof verified === "string" || typeof verified.userId !== "string") {
        throw new Error("Invalid token payload");
      }
      userId = verified.userId;
    } 
    catch {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid or expired session. Please log in again.",
        },
        { status: 401 }
      );
    }

    await ConnectionTODB();

    const showHabit = await HabitModel.find({userId});

    if (!showHabit) {
      return NextResponse.json(
        {
          success: false,
          message: "Habit is not added found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Show habit successfully!",
        task: showHabit,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update habit error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update habit.",
      },
      { status: 500 }
    );
  }
}