import User from "@/models/user.models";
import { ConnectionTODB } from "@/config/Db";
import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    await ConnectionTODB();

    const { email, otp } = await request.json();

    if (
      typeof email !== "string" ||
      typeof otp !== "string" ||
      !/^\d{6}$/.test(otp)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Enter a valid six-digit OTP.",
        },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    const loginOtpHash = createHash("sha256")
      .update(otp)
      .digest("hex");

    const user = await User.findOne({
      email: normalizedEmail,
      loginOtpHash,
      loginOtpExpiry: { $gt: new Date() },
      isVerified: true,
    });
    
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid or expired OTP.",
        },
        { status: 400 }
      );
    }

    // Consume the OTP so it cannot be reused
    const result = await User.updateOne(
      {
        _id: user._id,
        loginOtpHash,
        loginOtpExpiry: { $gt: new Date() },
      },
      {
        $unset: {
          loginOtpHash: 1,
          loginOtpExpiry: 1,
        },
      }
    );

    if (result.modifiedCount !== 1) {
      return NextResponse.json(
        {
          success: false,
          message: "OTP has expired or has already been used.",
        },
        { status: 400 }
      );
    }

    const token = jwt.sign(
        {
          userId: user._id.toString(),
        },
        process.env.JWT_SECRET!,
        {
          expiresIn: "7d",
        }
      );

      const response = NextResponse.json(
        {
          success: true,
          message: "OTP verified successfully.",
          user: {
            id: user._id.toString(),
            username: user.username,
            email: user.email,
          },
        },
        { status: 200 }
      );

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
      } catch (error: unknown) {
        console.error("OTP verification error:", error);

        return NextResponse.json(
          {
            success: false,
            message: "Unable to verify OTP. Please try again.",
          },
          { status: 500 }
        );
      }
    }
