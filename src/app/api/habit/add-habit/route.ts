import { ConnectionTODB } from "@/config/Db";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import HabitModel from "@/models/habit.models";

export async function POST(request: Request) {
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

    const { title } = await request.json();

    if (typeof title !== "string" || !title.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Task title is required.",
        },
        { status: 400 }
      );
    }

    const habit = await HabitModel.create({
      title: title.trim(),
      userId,
      date: new Date(),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Habit created successfully!",
        habit,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Habit creation error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create habit.",
      },
      { status: 500 }
    );
  }
}
