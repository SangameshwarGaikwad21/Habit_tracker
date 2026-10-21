import TaskModel from "@/models/task.models";
import { ConnectionTODB } from "@/config/Db";
import { auth } from "@/auth";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function PATCH(
  request: Request,
  { params }: RouteContext
) {
  try {
    // 1. Check authentication
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized. Please log in.",
        },
        { status: 401 }
      );
    }

    // 2. Get task ID from URL
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid task ID.",
        },
        { status: 400 }
      );
    }

    // 3. Connect to MongoDB
    await ConnectionTODB();

    // 4. Read request body
    const body: unknown = await request.json();

    if (
      typeof body !== "object" ||
      body === null ||
      !("title" in body) ||
      typeof body.title !== "string" ||
      !body.title.trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "A valid task title is required.",
        },
        { status: 400 }
      );
    }

    // 5. Update only the authenticated user's task
    const updatedTask = await TaskModel.findOneAndUpdate(
      {
        _id: id,
        userId: session.user.id,
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

    // 6. Check whether the task exists
    if (!updatedTask) {
      return NextResponse.json(
        {
          success: false,
          message: "Task not found.",
        },
        { status: 404 }
      );
    }

    // 7. Return updated task
    return NextResponse.json(
      {
        success: true,
        message: "Task updated successfully!",
        task: updatedTask,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update task error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update task.",
      },
      { status: 500 }
    );
  }
}