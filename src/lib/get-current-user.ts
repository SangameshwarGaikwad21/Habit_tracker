import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

import User from "@/models/user.models";
import { ConnectionTODB } from "@/config/Db";

interface TokenPayload {
  userId: string;
}

export async function getCurrentUser() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return null;
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as TokenPayload;

    if (!decoded.userId) {
      return null;
    }

    await ConnectionTODB();

    const user = await User.findById(decoded.userId).select(
      "-password -loginOtpHash -loginOtpExpiry -verificationToken -verificationTokenExpiry -forgotPasswordToken -forgotPasswordExpiry"
    );

    return user;
  } catch (error) {
    console.error("Get current user error:", error);
    return null;
  }
}