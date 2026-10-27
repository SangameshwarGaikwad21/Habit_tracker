import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import {ConnectionTODB }from "@/config/Db";
import RoutineModel from "@/models/routine.models";

export async function DELETE() {
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

    await ConnectionTODB();

    const deletedRoutine = await RoutineModel.findOneAndDelete({
      userId: decoded.userId,
    });

    if (!deletedRoutine) {
      return NextResponse.json(
        { success: false, message: "Routine not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Entire routine deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete entire routine error:", error);

    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
