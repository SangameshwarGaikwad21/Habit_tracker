import { ConnectionTODB } from "@/config/Db";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import RoutineModel from "@/models/routine.models";

interface RouteContext {
  params: Promise<{ id: string }>;
}

async function getAuthenticatedUserId(): Promise<string | null> {
  const token = (await cookies()).get("token")?.value;
  const secret = process.env.JWT_SECRET;

  if (!token || !secret) {
    return null;
  }

  try {
    const verified = jwt.verify(token, secret);

    if (
      typeof verified === "string" ||
      typeof verified.userId !== "string" ||
      !mongoose.isValidObjectId(verified.userId)
    ) {
      return null;
    }

    return verified.userId;
  } catch {
    return null;
  }
}

// PATCH: Update the user's complete routine
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = (await cookies()).get("token")?.value;
    const secret = process.env.JWT_SECRET;

    if (!token || !secret) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, secret);

    if (
      typeof decoded === "string" ||
      typeof decoded.userId !== "string" ||
      !mongoose.isValidObjectId(decoded.userId)
    ) {
      return NextResponse.json(
        { success: false, message: "Invalid token" },
        { status: 401 }
      );
    }

    const { id } = await params;

    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid routine activity ID" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { title, startTime, endTime } = body;

    if (
      typeof title !== "string" ||
      !title.trim() ||
      typeof startTime !== "string" ||
      typeof endTime !== "string" ||
      !/^([01]\d|2[0-3]):[0-5]\d$/.test(startTime) ||
      !/^([01]\d|2[0-3]):[0-5]\d$/.test(endTime)
    ) {
      return NextResponse.json(
        { success: false, message: "Invalid title or time format" },
        { status: 400 }
      );
    }

    await ConnectionTODB();

    const updatedRoutine = await RoutineModel.findOneAndUpdate(
      {
        userId: decoded.userId,
        "routine._id": id,
      },
      {
        $set: {
          "routine.$.title": title.trim(),
          "routine.$.startTime": startTime,
          "routine.$.endTime": endTime,
        },
      },
      {
        returnDocument: "after",
        runValidators: true,
      }
    );

    if (!updatedRoutine) {
      return NextResponse.json(
        { success: false, message: "Routine activity not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Routine activity updated successfully",
        routine: updatedRoutine.routine,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update routine activity error:", error);

    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}


// DELETE: Delete the user's complete routine
export async function DELETE(
  request: Request,
  { params }: RouteContext
) {
  try {
    // 1. Authenticate user
    const userId = await getAuthenticatedUserId();

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Please log in." },
        { status: 401 }
      );
    }

    // 2. Validate routine document ID
    const { id } = await params;

    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid routine ID." },
        { status: 400 }
      );
    }

    // 3. Connect to database
    await ConnectionTODB();

    // 4. Delete only the routine owned by this user
    const deletedRoutine = await RoutineModel.findOneAndDelete({
      _id: id,
      userId,
    });

    if (!deletedRoutine) {
      return NextResponse.json(
        { success: false, message: "Routine not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Routine deleted successfully!",
        routine: deletedRoutine,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete routine error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to delete routine." },
      { status: 500 }
    );
  }
}
