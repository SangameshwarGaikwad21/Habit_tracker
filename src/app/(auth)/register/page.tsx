
"use client";

import Link from "next/link";

const features = [
  {
    icon: "✓",
    title: "Build consistent habits",
    description: "Turn small daily actions into lasting routines.",
  },
  {
    icon: "↗",
    title: "See your progress",
    description: "Stay motivated as you move toward your goals.",
  },
  {
    icon: "◎",
    title: "Own your routine",
    description: "Create a schedule that fits your life.",
  },
];

export default function RegisterPage() {
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

        {/* LEFT SIDE - BRANDING */}

        <section
          className="relative hidden min-h-screen overflow-hidden border-r p-10 lg:flex lg:flex-col lg:justify-between xl:p-14"
          style={{
            backgroundColor: "var(--section-bg)",
            borderColor: "var(--border-color)",
          }}
        >
          {/* Background glow */}

          <div
            className="pointer-events-none absolute -left-24 top-32 h-72 w-72 rounded-full blur-3xl"
            style={{
              backgroundColor: "var(--accent)",
              opacity: 0.12,
            }}
          />

          <div
            className="pointer-events-none absolute -bottom-24 right-0 h-80 w-80 rounded-full blur-3xl"
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

          {/* Main branding content */}

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
              Your journey to a better you
            </div>

            <h1 className="text-4xl font-bold leading-tight tracking-tight xl:text-6xl">
              Small habits.
              <br />
              <span style={{ color: "var(--accent)" }}>
                Big changes.
              </span>
            </h1>

            <p
              className="mt-5 max-w-md text-base leading-8"
              style={{ color: "var(--text-secondary)" }}
            >
              Create routines that work for you, track your progress,
              and become the person you want to be — one day at a time.
            </p>

            {/* Features */}

            <div className="mt-9 space-y-6">
              {features.map((feature) => (
                <div
                  key={feature.title}
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
                    {feature.icon}
                  </div>

                  <div>
                    <h2 className="text-sm font-semibold">
                      {feature.title}
                    </h2>

                    <p
                      className="mt-1 text-sm leading-6"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Motivational quote */}

            <div
              className="mt-10 rounded-2xl border p-6"
              style={{
                backgroundColor: "var(--card-bg)",
                borderColor: "var(--border-color)",
              }}
            >
              <p className="text-base font-medium leading-7">
                “You don't have to be perfect. You just have to keep
                showing up.”
              </p>

              <p
                className="mt-2 text-sm"
                style={{ color: "var(--text-secondary)" }}
              >
                Start where you are. Grow every day.
              </p>
            </div>
          </div>

          <p
            className="relative z-10 text-sm"
            style={{ color: "var(--text-secondary)" }}
          >
            © 2026 Habitflow. Built for your growth.
          </p>
        </section>

        {/* RIGHT SIDE - REGISTER UI */}

        <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-10 lg:px-12 xl:px-20">

          <div className="w-full max-w-xl">

            {/* Mobile logo */}

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

            {/* Registration Card */}

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
                  START YOUR JOURNEY
                </p>

                <h2 className="text-3xl font-bold tracking-tight">
                  Create your account
                </h2>

                <p
                  className="mt-3 text-sm leading-6"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Join Habitflow and start building better habits today.
                </p>
              </div>

              {/* UI-only form: no submit handler or API connection */}

              <div className="space-y-5">

                {/* Name and Email */}

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="text-sm font-medium"
                    >
                      Full name
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Enter your full name"
                      className={inputClass}
                      style={inputStyle}
                    />
                  </div>

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
                </div>

                {/* Password and Confirm Password */}

                <div className="grid gap-4 sm:grid-cols-2">
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
                      autoComplete="new-password"
                      placeholder="At least 8 characters"
                      className={inputClass}
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="text-sm font-medium"
                    >
                      Confirm password
                    </label>

                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      autoComplete="new-password"
                      placeholder="Enter password again"
                      className={inputClass}
                      style={inputStyle}
                    />
                  </div>
                </div>

                {/* Register Button */}

                <button
                  type="button"
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3.5 font-semibold transition hover:brightness-110"
                  style={{
                    backgroundColor: "var(--accent)",
                    color: "var(--accent-contrast)",
                  }}
                >
                  Create account
                  <span>→</span>
                </button>
              </div>

              {/* Login Link */}

              <p
                className="mt-7 text-center text-sm"
                style={{ color: "var(--text-secondary)" }}
              >
                Already have an account?{" "}

                <Link
                  href="/login"
                  className="font-semibold hover:underline"
                  style={{ color: "var(--accent)" }}
                >
                  Sign in
                </Link>
              </p>
            </div>

            <p
              className="mt-6 text-center text-xs"
              style={{ color: "var(--text-secondary)" }}
            >
              Start small. Stay consistent. Become better.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
