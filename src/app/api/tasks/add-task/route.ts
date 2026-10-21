import TaskModel from "@/models/task.models";
import { ConnectionTODB } from "@/config/Db";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function POST(request: Request) {
  try {
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

    const task = await TaskModel.create({
      title: title.trim(),
      userId: session.user.id,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Task created successfully!",
        task,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Task creation error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create task.",
      },
      { status: 500 }
    );
  }
}