"use client";
import { useRef, useState, type FormEvent, type ClipboardEvent, type KeyboardEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAppSelector } from "@/redux/hooks";
import axios from "@/lib/axios";

const inputStyle = {
  backgroundColor: "var(--input-bg, #111827)",
  color: "var(--text-primary, #f8fafc)",
  borderColor: "var(--border-color, #334155)",
};

export default function VerifyOtpPage() {
  const router = useRouter();

  const { pendingEmail } = useAppSelector(
    (state) => state.auth
  );

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);

    const updatedOtp = [...otp];
    updatedOtp[index] = digit;

    setOtp(updatedOtp);
    setError("");

    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    event: KeyboardEvent<HTMLInputElement>
  ) => {
    if (
      event.key === "Backspace" &&
      !otp[index] &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (event: ClipboardEvent<HTMLDivElement>) => {
    event.preventDefault();

    const pastedOtp = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!pastedOtp) return;

    const updatedOtp = Array(6).fill("");

    pastedOtp.split("").forEach((digit, index) => {
      updatedOtp[index] = digit;
    });

    setOtp(updatedOtp);
    setError("");

    const nextIndex = Math.min(pastedOtp.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      setError("Please enter the complete 6-digit verification code.");
      return;
    }

    if (!pendingEmail) {
      setError("Your login session has expired. Please login again.");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post("/users/verify-login-otp", {
        email: pendingEmail,
        otp: enteredOtp,
      });

      if (!response.data.success) {
        setError(response.data.message || "OTP verification failed.");
        return;
      }

      setSuccess("Email verified successfully!");

      router.replace("/dashboard");
    } catch (err: unknown) {
      const message =
        typeof err === "object" &&
        err !== null &&
        "response" in err
          ? (err as { response?: { data?: { message?: string } } })
              .response?.data?.message
          : undefined;

      setError(message || "Invalid or expired OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10 sm:px-6"
      style={{
        backgroundColor: "var(--page-bg, #080d18)",
        color: "var(--text-primary, #f8fafc)",
      }}
    >
      {/* Background glow */}
      <div
        className="pointer-events-none absolute -right-24 top-10 h-80 w-80 rounded-full blur-3xl"
        style={{
          backgroundColor: "var(--accent, #38bdf8)",
          opacity: 0.13,
        }}
      />

      <div
        className="pointer-events-none absolute -bottom-24 -left-16 h-96 w-96 rounded-full blur-3xl"
        style={{
          backgroundColor: "var(--accent, #38bdf8)",
          opacity: 0.1,
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo */}
        <Link
          href="/"
          className="mx-auto mb-6 flex w-fit items-center gap-3 text-2xl font-bold"
        >
          <span
            className="flex h-11 w-11 items-center justify-center rounded-2xl text-xl"
            style={{
              backgroundColor: "var(--accent, #38bdf8)",
              color: "var(--accent-contrast, #06111e)",
            }}
          >
            H
          </span>
          habitflow
        </Link>

        {/* OTP Card */}
        <div
          className="rounded-3xl border p-6 sm:p-9"
          style={{
            backgroundColor: "var(--card-bg, #111827)",
            borderColor: "var(--border-color, #263449)",
            boxShadow: "0 24px 80px rgba(0,0,0,0.22)",
          }}
        >
          {/* Email icon */}
          <div
            className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl text-2xl"
            style={{
              backgroundColor: "var(--accent, #38bdf8)",
              color: "var(--accent-contrast, #06111e)",
            }}
          >
            ✉
          </div>

          <h1 className="text-3xl font-bold tracking-tight">
            Verify your email
          </h1>

          <p
            className="mt-3 text-sm leading-6"
            style={{ color: "var(--text-secondary, #94a3b8)" }}
          >
            We've sent a 6-digit verification code to
            <span className="mt-1 block font-semibold">
              {pendingEmail || "your registered email"}
            </span>
          </p>

          <form onSubmit={handleSubmit} className="mt-8">
            {/* OTP Inputs */}
            <label className="text-sm font-medium">
              Enter verification code
            </label>

            <div
              className="mt-3 flex justify-between gap-2"
              onPaste={handlePaste}
            >
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(element) => {
                    inputRefs.current[index] = element;
                  }}
                  type="text"
                  inputMode="numeric"
                  autoComplete={index === 0 ? "one-time-code" : "off"}
                  maxLength={1}
                  value={digit}
                  onChange={(event) =>
                    handleChange(index, event.target.value)
                  }
                  onKeyDown={(event) =>
                    handleKeyDown(index, event)
                  }
                  className="h-12 min-w-0 flex-1 rounded-xl border text-center text-xl font-bold outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-400/10 sm:h-14"
                  style={inputStyle}
                  aria-label={`OTP digit ${index + 1}`}
                  required
                />
              ))}
            </div>

            {/* Error */}
            {error && (
              <p
                className="mt-4 rounded-lg bg-red-500/10 p-3 text-sm text-red-500"
                role="alert"
              >
                {error}
              </p>
            )}

            {/* Success */}
            {success && (
              <p className="mt-4 rounded-lg bg-green-500/10 p-3 text-sm text-green-500">
                {success}
              </p>
            )}

            {/* Verify button */}
            <button
              type="submit"
              disabled={isLoading || otp.join("").length !== 6}
              className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3.5 font-semibold transition hover:-translate-y-0.5 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
              style={{
                backgroundColor: "var(--accent, #38bdf8)",
                color: "var(--accent-contrast, #06111e)",
              }}
            >
              {isLoading ? "Verifying..." : "Verify & Continue"}
              {!isLoading && <span>→</span>}
            </button>
          </form>

          <p
            className="mt-6 text-center text-sm"
            style={{ color: "var(--text-secondary, #94a3b8)" }}
          >
            Wrong email or need to start again?{" "}
            <Link
              href="/login"
              className="font-semibold hover:underline"
              style={{ color: "var(--accent, #38bdf8)" }}
            >
              Back to login
            </Link>
          </p>
        </div>

        <p
          className="mt-6 text-center text-xs"
          style={{ color: "var(--text-secondary, #94a3b8)" }}
        >
          © 2026 Habitflow. Every day, a better you.
        </p>
      </motion.div>
    </main>
  );
}
