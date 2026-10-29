"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || "Registration failed.");
      }

      setSuccess(
        data.message || "Account created successfully. Please verify your email."
      );

      setTimeout(() => {
        router.push(
          `/verify-email?email=${encodeURIComponent(formData.email.trim())}`
        );
      }, 1200);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  const inputStyle = {
    backgroundColor: "var(--input-bg)",
    color: "var(--text-primary)",
    borderColor: "var(--border-color)",
  };

  const inputClass =
    "mt-1.5 w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition placeholder:opacity-50 focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20";

  return (
    // h-dvh + overflow-hidden = the page never scrolls
    <main
      className="h-dvh overflow-hidden transition-colors duration-300"
      style={{
        backgroundColor: "var(--page-bg)",
        color: "var(--text-primary)",
      }}
    >
      <div className="grid h-full lg:grid-cols-2">
        {/* LEFT SIDE — BRANDING */}
        <section
          className="relative hidden h-full overflow-hidden border-r p-10 lg:flex lg:flex-col lg:justify-between xl:p-14"
          style={{
            backgroundColor: "var(--section-bg)",
            borderColor: "var(--border-color)",
          }}
        >
          <div
            className="pointer-events-none absolute -left-24 top-32 h-72 w-72 rounded-full blur-3xl"
            style={{ backgroundColor: "var(--accent)", opacity: 0.12 }}
          />
          <div
            className="pointer-events-none absolute -bottom-24 right-0 h-80 w-80 rounded-full blur-3xl"
            style={{ backgroundColor: "var(--accent)", opacity: 0.1 }}
          />

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

          <div className="relative z-10 max-w-xl">
            <div
              className="mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm"
              style={{
                borderColor: "var(--border-color)",
                backgroundColor: "var(--card-bg)",
                color: "var(--text-secondary)",
              }}
            >
              <span style={{ color: "var(--accent)" }}>✦</span>
              Your journey to a better you
            </div>

            <h1 className="text-4xl font-bold leading-tight tracking-tight xl:text-5xl">
              Small habits.
              <br />
              <span style={{ color: "var(--accent)" }}>Big changes.</span>
            </h1>

            <p
              className="mt-4 max-w-md text-base leading-7"
              style={{ color: "var(--text-secondary)" }}
            >
              Create routines that work for you, track your progress, and become
              the person you want to be — one day at a time.
            </p>

            <div className="mt-7 space-y-4">
              {features.map((feature) => (
                <div key={feature.title} className="flex items-start gap-4">
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-base font-bold"
                    style={{
                      backgroundColor: "var(--card-bg)",
                      color: "var(--accent)",
                      border: "1px solid var(--border-color)",
                    }}
                  >
                    {feature.icon}
                  </div>

                  <div>
                    <h2 className="text-sm font-semibold">{feature.title}</h2>
                    <p
                      className="mt-0.5 text-sm leading-5"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quote card: only shown on tall screens so nothing overflows */}
            <div
              className="mt-7 hidden rounded-2xl border p-5 [@media(min-height:820px)]:block"
              style={{
                backgroundColor: "var(--card-bg)",
                borderColor: "var(--border-color)",
              }}
            >
              <p className="text-base font-medium leading-7">
                “You don&apos;t have to be perfect. You just have to keep showing
                up.”
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
            © {new Date().getFullYear()} Habitflow. Built for your growth.
          </p>
        </section>

        {/* RIGHT SIDE — FORM */}
        <section className="flex h-full items-center justify-center px-4 py-4 sm:px-10 lg:px-12 xl:px-20">
          <div className="w-full max-w-xl">
            {/* Mobile branding */}
            <Link
              href="/"
              className="mb-4 inline-flex items-center gap-2 text-xl font-bold lg:hidden"
            >
              <span
                className="flex h-9 w-9 items-center justify-center rounded-xl"
                style={{
                  backgroundColor: "var(--accent)",
                  color: "var(--accent-contrast)",
                }}
              >
                H
              </span>
              habitflow
            </Link>

            <div
              className="rounded-3xl border p-5 shadow-xl sm:p-7"
              style={{
                backgroundColor: "var(--card-bg)",
                borderColor: "var(--border-color)",
                boxShadow: "0 20px 60px rgba(0, 0, 0, 0.07)",
              }}
            >
              <div className="mb-4">
                <p
                  className="mb-2 text-xs font-bold tracking-[0.2em]"
                  style={{ color: "var(--accent)" }}
                >
                  START YOUR JOURNEY
                </p>

                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  Create your account
                </h2>

                <p
                  className="mt-2 hidden text-sm leading-6 sm:block"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Join Habitflow and start building better habits today.
                </p>
              </div>

              {error && (
                <div
                  role="alert"
                  className="mb-3 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-2 text-sm text-red-500"
                >
                  {error}
                </div>
              )}

              {success && (
                <div
                  role="status"
                  className="mb-3 rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-600"
                >
                  {success}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="text-sm font-medium">
                    Full name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    className={inputClass}
                    style={inputStyle}
                    required
                    maxLength={100}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="text-sm font-medium">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={inputClass}
                    style={inputStyle}
                    required
                  />
                </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor="password" className="text-sm font-medium">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="At least 8 characters"
                    value={formData.password}
                    onChange={handleChange}
                    className={inputClass}
                    style={inputStyle}
                    minLength={8}
                    required
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
                    placeholder="Enter your password again"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={inputClass}
                    style={inputStyle}
                    minLength={8}
                    required
                  />
                </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-1 flex w-full items-center justify-center rounded-xl px-4 py-3 font-semibold transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                  style={{
                    backgroundColor: "var(--accent)",
                    color: "var(--accent-contrast)",
                  }}
                >
                  {loading ? "Creating account..." : "Create account"}
                </button>
              </form>

              <p
                className="mt-4 text-center text-sm"
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
              className="mt-4 hidden text-center text-xs leading-5 [@media(min-height:760px)]:block"
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