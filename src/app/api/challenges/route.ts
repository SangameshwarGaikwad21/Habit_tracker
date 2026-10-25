
import { ConnectionTODB } from "@/config/Db";
import ChallengeModel from "@/models/challanges.models";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await ConnectionTODB();

    const challenges = await ChallengeModel.find({
      isActive: true,
    })
      .select("title slug description duration rules")
      .sort({ duration: 1 })
      .lean();

    return NextResponse.json(
      {
        success: true,
        count: challenges.length,
        challenges,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Fetch challenges error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch challenges.",
      },
      { status: 500 }
    );
  }
}
