
import User from "@/models/user.models";
import { ConnectionTODB } from "@/config/Db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    await ConnectionTODB();

    const { username, email, password } = await request.json();

    // 1. Validate required fields
    if (!username || !email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required.",
        },
        { status: 400 }
      );
    }

    // 2. Validate input types
    if (
      typeof username !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid input.",
        },
        { status: 400 }
      );
    }

    const normalizedUsername = username.trim();
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedUsername || !normalizedEmail) {
      return NextResponse.json(
        {
          success: false,
          message: "Username and email cannot be empty.",
        },
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

    // 3. Check if user already exists
    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Email is already registered.",
        },
        { status: 409 }
      );
    }

    // 4. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5. Create user
    const savedUser = await User.create({
      username: normalizedUsername,
      email: normalizedEmail,
      password: hashedPassword,
      isVerified: true,
    });

    // 6. Return safe user information
    return NextResponse.json(
      {
        success: true,
        message: "User registered successfully.",
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
        {
          success: false,
          message: "Email is already registered.",
        },
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
