"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";

const perks = [
  { icon: "✓", label: "Stay consistent" },
  { icon: "↗", label: "Track your growth" },
  { icon: "◎", label: "Own your day" },
];

const inputStyle = {
  backgroundColor: "var(--input-bg, #111827)",
  color: "var(--text-primary, #f8fafc)",
  borderColor: "var(--border-color, #334155)",
};

const inputClass =
  "mt-2 w-full rounded-xl border px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-400/10";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  // UI-only for now. Replace this with your login thunk when the API is ready.
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <main
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10 sm:px-6"
      style={{
        backgroundColor: "var(--page-bg, #080d18)",
        color: "var(--text-primary, #f8fafc)",
      }}
    >
      {/* Soft background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-10 h-80 w-80 rounded-full blur-3xl"
        style={{ backgroundColor: "var(--accent, #38bdf8)", opacity: 0.13 }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-16 h-96 w-96 rounded-full blur-3xl"
        style={{ backgroundColor: "var(--accent, #38bdf8)", opacity: 0.1 }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo above the card */}
        <Link
          href="/"
          className="mx-auto mb-6 flex w-fit items-center gap-3 text-2xl font-bold tracking-tight"
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

        {/* Card */}
        <div
          className="rounded-3xl border p-6 sm:p-9"
          style={{
            backgroundColor: "var(--card-bg, #111827)",
            borderColor: "var(--border-color, #263449)",
            boxShadow: "0 24px 80px rgba(0,0,0,0.22)",
          }}
        >
          <h1 className="text-3xl font-bold tracking-tight">Welcome back!</h1>
          <p
            className="mt-2 text-sm leading-6"
            style={{ color: "var(--text-secondary, #94a3b8)" }}
          >
            Every day is a fresh start. Sign in and keep making progress.
          </p>

          <form onSubmit={handleSubmit} className="mt-7 space-y-4">
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
                className={inputClass}
                style={inputStyle}
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  aria-pressed={showPassword}
                  className="text-xs font-medium hover:underline"
                  style={{ color: "var(--accent, #38bdf8)" }}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Enter your password"
                className={inputClass}
                style={inputStyle}
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <label
                className="flex cursor-pointer items-center gap-2 text-sm"
                style={{ color: "var(--text-secondary, #94a3b8)" }}
              >
                <input type="checkbox" className="h-4 w-4 rounded accent-sky-400" />
                Remember me
              </label>

              <Link
                href="/forgot-password"
                className="text-sm font-semibold transition hover:underline"
                style={{ color: "var(--accent, #38bdf8)" }}
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3.5 font-semibold transition hover:-translate-y-0.5 hover:brightness-110"
              style={{
                backgroundColor: "var(--accent, #38bdf8)",
                color: "var(--accent-contrast, #06111e)",
              }}
            >
              Sign in
              <span aria-hidden="true">→</span>
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="h-px flex-1" style={{ backgroundColor: "var(--border-color, #263449)" }} />
            <span className="px-4 text-xs" style={{ color: "var(--text-secondary, #94a3b8)" }}>
              or
            </span>
            <div className="h-px flex-1" style={{ backgroundColor: "var(--border-color, #263449)" }} />
          </div>

          <p className="text-center text-sm" style={{ color: "var(--text-secondary, #94a3b8)" }}>
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-semibold hover:underline"
              style={{ color: "var(--accent, #38bdf8)" }}
            >
              Create account
            </Link>
          </p>
        </div>

        {/* Perks under the card */}
        <ul
          className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs"
          style={{ color: "var(--text-secondary, #94a3b8)" }}
        >
          {perks.map((perk) => (
            <li key={perk.label} className="flex items-center gap-2">
              <span style={{ color: "var(--accent, #38bdf8)" }} aria-hidden="true">
                {perk.icon}
              </span>
              {perk.label}
            </li>
          ))}
        </ul>

        <p className="mt-6 text-center text-xs" style={{ color: "var(--text-secondary, #94a3b8)" }}>
          © 2026 Habitflow. Every day, a better you.
        </p>
      </motion.div>
    </main>
  );
}