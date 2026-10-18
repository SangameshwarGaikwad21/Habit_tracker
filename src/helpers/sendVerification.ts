
import { resend } from "@/config/resend";
import VerificationEmail from "../../emails/emailVerification";

interface ApiResponse {
  success: boolean;
  message: string;
}

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string,
  subject = "Habit Tracker - Email Verification Code"
): Promise<ApiResponse> {
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: email,
      subject: "Habit Tracker - Email Verification Code",
      react: VerificationEmail({
        username,
        otp: verifyCode,
      }),
    });

    if (error) {
      console.error("Resend error:", error);

      return {
        success: false,
        message: "Failed to send Habit Tracker verification email.",
      };
    }

    console.log("Habit Tracker verification email sent:", data?.id);

    return {
      success: true,
      message: "Habit Tracker verification email sent successfully.",
    };
  } catch (emailError) {
    console.error(
      "Error sending Habit Tracker verification email:",
      emailError
    );

    return {
      success: false,
      message: "Failed to send Habit Tracker verification email.",
    };
  }
}
