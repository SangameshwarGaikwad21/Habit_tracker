
import User from "@/models/user.models";
import { ConnectionTODB } from "@/config/Db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { randomInt, createHash } from "crypto";
import { sendVerificationEmail } from "@/helpers/sendVerification";

export async function POST(request: NextRequest) {
  try {
    await ConnectionTODB();

    const { email, password } = await request.json();

    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      !email.trim() ||
      !password
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Email and password are required.",
        },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password.",
        },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password.",
        },
        { status: 401 }
      );
    }

    if (!user.isVerified) {
      return NextResponse.json(
        {
          success: false,
          message: "Please verify your email first.",
        },
        { status: 403 }
      );
    }

    // Generate a secure six-digit login OTP
    const otp = randomInt(100000, 1000000).toString();

    const loginOtpHash = createHash("sha256")
      .update(otp)
      .digest("hex");

    const loginOtpExpiry = new Date(
      Date.now() + 10 * 60 * 1000
    );

    // Save the OTP hash and expiry
    user.loginOtpHash = loginOtpHash;
    user.loginOtpExpiry = loginOtpExpiry;

    await user.save();

    const emailResponse = await sendVerificationEmail(
      user.email,
      user.username,
      otp,
      "Habit Tracker - Login OTP"
    );

    if (!emailResponse.success) {
      // Clear the OTP if email delivery fails
      await User.updateOne(
        { _id: user._id, loginOtpHash },
        {
          $unset: {
            loginOtpHash: 1,
            loginOtpExpiry: 1,
          },
        }
      );

      return NextResponse.json(
        {
          success: false,
          message: "Could not send login OTP. Please try again.",
        },
        { status: 502 }
      );
    }

    // Do not create a session at this stage
    return NextResponse.json(
      {
        success: true,
        requiresOtp: true,
        message: "Login OTP sent to your email.",
        email: user.email,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Login OTP error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to process login. Please try again.",
      },
      { status: 500 }
    );
  }
}
