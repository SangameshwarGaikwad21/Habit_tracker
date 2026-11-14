"use client";
import Link from "next/link";

const benefits = [
  {
    icon: "✓",
    title: "Stay consistent",
    description: "Keep building the habits that move you forward.",
  },
  {
    icon: "↗",
    title: "Track your growth",
    description: "See your progress and celebrate every milestone.",
  },
  {
    icon: "◎",
    title: "Own your day",
    description: "Stay focused on your routines and daily goals.",
  },
];

export default function LoginPage() {
  const inputStyle = {
    backgroundColor: "var(--input-bg)",
    color: "var(--text-primary)",
    borderColor: "var(--border-color)",
  };

  const inputClass =
    "mt-1.5 w-full rounded-xl border px-4 py-3 text-sm outline-none transition placeholder:opacity-50 focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20";

  return (
    <main
      className="min-h-screen transition-colors duration-300"
      style={{
        backgroundColor: "var(--page-bg)",
        color: "var(--text-primary)",
      }}
    >
      <div className="grid min-h-screen lg:grid-cols-2">

        {/* LEFT SIDE - LOGIN FORM */}

        <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-10 lg:px-12 xl:px-20">

          <div className="w-full max-w-xl">

            {/* Mobile Logo */}

            <Link
              href="/"
              className="mb-8 inline-flex items-center gap-2 text-xl font-bold lg:hidden"
            >
              <span
                className="flex h-10 w-10 items-center justify-center rounded-xl"
                style={{
                  backgroundColor: "var(--accent)",
                  color: "var(--accent-contrast)",
                }}
              >
                H
              </span>
              habitflow
            </Link>

            {/* Login Card */}

            <div
              className="rounded-3xl border p-6 shadow-xl sm:p-9"
              style={{
                backgroundColor: "var(--card-bg)",
                borderColor: "var(--border-color)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.07)",
              }}
            >
              <div className="mb-8">
                <p
                  className="mb-3 text-xs font-bold tracking-[0.2em]"
                  style={{ color: "var(--accent)" }}
                >
                  WELCOME BACK
                </p>

                <h1 className="text-3xl font-bold tracking-tight">
                  Welcome back!
                </h1>

                <p
                  className="mt-3 text-sm leading-6"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Your journey doesn't stop here. Sign in and keep
                  making progress every day.
                </p>
              </div>

              {/* UI-only Login Form */}

              <div className="space-y-5">

                {/* Email */}

                <div>
                  <label
                    htmlFor="email"
                    className="text-sm font-medium"
                  >
                    Email address
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    className={inputClass}
                    style={inputStyle}
                  />
                </div>

                {/* Password */}

                <div>
                  <label
                    htmlFor="password"
                    className="text-sm font-medium"
                  >
                    Password
                  </label>

                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    className={inputClass}
                    style={inputStyle}
                  />
                </div>

                {/* Remember Me and Forgot Password */}

                <div className="flex flex-wrap items-center justify-between gap-3">

                  <label
                    className="flex cursor-pointer items-center gap-2 text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded accent-sky-400"
                    />
                    Remember me
                  </label>

                  <Link
                    href="/forgot-password"
                    className="text-sm font-semibold transition hover:underline"
                    style={{ color: "var(--accent)" }}
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Sign In Button */}

                <button
                  type="button"
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3.5 font-semibold transition hover:brightness-110"
                  style={{
                    backgroundColor: "var(--accent)",
                    color: "var(--accent-contrast)",
                  }}
                >
                  Sign in
                  <span>→</span>
                </button>
              </div>

              {/* Divider */}

              <div className="relative my-7 flex items-center">
                <div
                  className="h-px flex-1"
                  style={{ backgroundColor: "var(--border-color)" }}
                />
                <span
                  className="px-4 text-xs"
                  style={{ color: "var(--text-secondary)" }}
                >
                  OR
                </span>
                <div
                  className="h-px flex-1"
                  style={{ backgroundColor: "var(--border-color)" }}
                />
              </div>

              {/* Register Link */}

              <p
                className="text-center text-sm"
                style={{ color: "var(--text-secondary)" }}
              >
                Don't have an account?{" "}

                <Link
                  href="/register"
                  className="font-semibold hover:underline"
                  style={{ color: "var(--accent)" }}
                >
                  Create account
                </Link>
              </p>
            </div>

            <p
              className="mt-6 text-center text-xs"
              style={{ color: "var(--text-secondary)" }}
            >
              Small steps every day lead to big changes.
            </p>
          </div>
        </section>

        {/* RIGHT SIDE - BRANDING */}

        <section
          className="relative hidden min-h-screen overflow-hidden border-l p-10 lg:flex lg:flex-col lg:justify-between xl:p-14"
          style={{
            backgroundColor: "var(--section-bg)",
            borderColor: "var(--border-color)",
          }}
        >

          {/* Background Glow */}

          <div
            className="pointer-events-none absolute -right-24 top-32 h-72 w-72 rounded-full blur-3xl"
            style={{
              backgroundColor: "var(--accent)",
              opacity: 0.12,
            }}
          />

          <div
            className="pointer-events-none absolute -bottom-24 left-0 h-80 w-80 rounded-full blur-3xl"
            style={{
              backgroundColor: "var(--accent)",
              opacity: 0.1,
            }}
          />

          {/* Logo */}

          <Link
            href="/"
            className="relative z-10 inline-flex w-fit items-center gap-3 text-2xl font-bold tracking-tight"
          >
            <span
              className="flex h-11 w-11 items-center justify-center rounded-2xl text-xl"
              style={{
                backgroundColor: "var(--accent)",
                color: "var(--accent-contrast)",
              }}
            >
              H
            </span>

            habitflow
          </Link>

          {/* Main Content */}

          <div className="relative z-10 max-w-xl">

            <div
              className="mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm"
              style={{
                borderColor: "var(--border-color)",
                backgroundColor: "var(--card-bg)",
                color: "var(--text-secondary)",
              }}
            >
              <span style={{ color: "var(--accent)" }}>✦</span>
              Your progress is waiting for you
            </div>

            <h2 className="text-4xl font-bold leading-tight tracking-tight xl:text-6xl">
              Every day is a
              <br />
              <span style={{ color: "var(--accent)" }}>
                fresh start.
              </span>
            </h2>

            <p
              className="mt-5 max-w-md text-base leading-8"
              style={{ color: "var(--text-secondary)" }}
            >
              You've already started building a better version of
              yourself. Come back, stay focused, and keep moving
              toward the goals that matter.
            </p>

            {/* Benefits */}

            <div className="mt-9 space-y-6">
              {benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="flex items-start gap-4"
                >
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg font-bold"
                    style={{
                      backgroundColor: "var(--card-bg)",
                      color: "var(--accent)",
                      border: "1px solid var(--border-color)",
                    }}
                  >
                    {benefit.icon}
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold">
                      {benefit.title}
                    </h3>

                    <p
                      className="mt-1 text-sm leading-6"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Motivational Quote */}

            <div
              className="mt-10 rounded-2xl border p-6"
              style={{
                backgroundColor: "var(--card-bg)",
                borderColor: "var(--border-color)",
              }}
            >
              <p className="text-base font-medium leading-7">
                “Success is the sum of small efforts, repeated day
                in and day out.”
              </p>

              <p
                className="mt-2 text-sm"
                style={{ color: "var(--text-secondary)" }}
              >
                Keep showing up. Your future self will thank you.
              </p>
            </div>
          </div>

          {/* Footer */}

          <p
            className="relative z-10 text-sm"
            style={{ color: "var(--text-secondary)" }}
          >
            © 2026 Habitflow. Every day, a better you.
          </p>
        </section>
      </div>
    </main>
  );
}
