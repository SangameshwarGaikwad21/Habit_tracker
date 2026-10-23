import { ConnectionTODB } from "@/config/Db";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import HabitModel from "@/models/habit.models";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function PATCH(
  request: Request,
  { params }: RouteContext
) {
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

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Habit ID.",
        },
        { status: 400 }
      );
    }

    await ConnectionTODB();

    const body: unknown = await request.json();

    if ( typeof body !== "object" || body === null || 
      !("title" in body) || typeof body.title !== "string" || 
      !body.title.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "A valid habit title is required.",
        },
        { status: 400 }
      );
    }

    // 7. Update only a task owned by this user
    const updatedHabit = await HabitModel.findOneAndUpdate(
      {
        _id: id,
        userId,
      },
      {
        $set: {
          title: body.title.trim(),
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    // 8. Handle missing task or task not owned by user
    if (!updatedHabit) {
      return NextResponse.json(
        {
          success: false,
          message: "Habit not found.",
        },
        { status: 404 }
      );
    }

    // 9. Return updated task
    return NextResponse.json(
      {
        success: true,
        message: "Habit updated successfully!",
        task: updatedHabit,
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





export async function DELETE(
  request: Request,
  { params }: RouteContext
) {
  try {
    // 1. Authenticate the user
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

    // 2. Verify the JWT
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
          message: "Invalid or expired session.",
        },
        { status: 401 }
      );
    }

    // 3. Get and validate task ID
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Habit ID.",
        },
        { status: 400 }
      );
    }

    // 4. Connect to MongoDB
    await ConnectionTODB();

    // 5. Delete only this user's task
    const deletedHabit = await HabitModel.findOneAndDelete({
      _id: id,
      userId,
    });

    // 6. Handle missing task
    if (!deletedHabit) {
      return NextResponse.json(
        {
          success: false,
          message: "Habit not found.",
        },
        { status: 404 }
      );
    }

    // 7. Return success
    return NextResponse.json(
      {
        success: true,
        message: "habit deleted successfully!",
        task: deletedHabit,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete habit error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete habit.",
      },
      { status: 500 }
    );
  }
}
