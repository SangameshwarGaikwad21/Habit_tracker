import User from "@/models/user.models";
import { ConnectionTODB } from "@/config/Db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { randomInt, createHash } from "crypto";
import { sendVerificationEmail } from "@/helpers/sendVerification";

export async function POST(request: NextRequest) {
  try {
    await ConnectionTODB();

    const { username, email, password } = await request.json();

    if (!username || !email || !password) {
      return NextResponse.json(
        { success: false, message: "All fields are required." },
        { status: 400 }
      );
    }

    const normalizedEmail = String(email).trim().toLowerCase();

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "Email is already registered." },
        { status: 409 }
      );
    }

    if (
      typeof username !== "string" ||
      typeof password !== "string" ||
      typeof email !== "string"
    ) {
      return NextResponse.json(
        { success: false, message: "Invalid input." },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        {
          success: false,
          message: "Password must be at least 8 characters.",
        },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate a 6-digit OTP
    const otp = randomInt(100000, 1000000).toString();

    // Store only the OTP hash
    const verificationToken = createHash("sha256")
      .update(otp)
      .digest("hex");

    const verificationTokenExpiry = new Date(
      Date.now() + 10 * 60 * 1000
    );

    const savedUser = await User.create({
      username: username.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      isVerified: false,
      verificationToken,
      verificationTokenExpiry,
    });

    const emailResponse = await sendVerificationEmail(
      normalizedEmail,
      username.trim(),
      otp
    );

    if (!emailResponse.success) {
      // The account remains unverified.
      // A resend-verification endpoint can issue another OTP.
      return NextResponse.json(
        {
          success: false,
          message:
            "Account created, but the verification email could not be sent. Please request a new code.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "Account created! Check your email for the verification code.",
        user: {
          id: savedUser._id,
          username: savedUser.username,
          email: savedUser.email,
          isVerified: savedUser.isVerified,
        },
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Registration error:", error);

    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === 11000
    ) {
      return NextResponse.json(
        { success: false, message: "Email is already registered." },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Registration failed. Please try again.",
      },
      { status: 500 }
    );
  }
}
