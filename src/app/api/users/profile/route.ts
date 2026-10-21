import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/get-current-user";

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized. Please verify your login.",
        },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Profile fetched successfully.",
      user: {
        id: user._id.toString(),
        username: user.username,
        email: user.email,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    console.error("Profile API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch profile.",
      },
      { status: 500 }
    );
  }
}
