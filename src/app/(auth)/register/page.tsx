"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { registerUser } from "@/redux/fetures/auth.Slice";

const perks = [
  { icon: "✓", label: "Build consistent habits" },
  { icon: "↗", label: "See your progress" },
  { icon: "◎", label: "Own your routine" },
];

const inputStyle = {
  backgroundColor: "var(--input-bg)",
  color: "var(--text-primary)",
  borderColor: "var(--border-color)",
};

const inputClass =
  "mt-1.5 w-full rounded-xl border px-4 py-3 text-sm outline-none transition placeholder:opacity-50 focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20";

export default function RegisterPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { isLoading, error, successMessage } = useAppSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [validationError, setValidationError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setValidationError("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValidationError("");

    if (!formData.username.trim() || !formData.email.trim() || !formData.password) {
      setValidationError("Please fill in all required fields.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setValidationError("Passwords do not match.");
      return;
    }
    if (formData.password.length < 8) {
      setValidationError("Password must be at least 8 characters.");
      return;
    }

    try {
      const result = await dispatch(
        registerUser({
          username: formData.username.trim(),
          email: formData.email.trim(),
          password: formData.password,
        })
      ).unwrap();

      if (result.success) {
        router.push("/dashboard");
      }
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  const passwordType = showPassword ? "text" : "password";

  return (
    <main
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10 transition-colors duration-300 sm:px-6"
      style={{ backgroundColor: "var(--page-bg)", color: "var(--text-primary)" }}
    >
      {/* Soft background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-10 h-80 w-80 rounded-full blur-3xl"
        style={{ backgroundColor: "var(--accent)", opacity: 0.12 }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -right-16 h-96 w-96 rounded-full blur-3xl"
        style={{ backgroundColor: "var(--accent)", opacity: 0.1 }}
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
            style={{ backgroundColor: "var(--accent)", color: "var(--accent-contrast)" }}
          >
            H
          </span>
          habitflow
        </Link>

        {/* The card */}
        <div
          className="rounded-3xl border p-6 sm:p-9"
          style={{
            backgroundColor: "var(--card-bg)",
            borderColor: "var(--border-color)",
            boxShadow: "0 24px 70px rgba(0,0,0,0.12)",
          }}
        >
          <h1 className="text-3xl font-bold tracking-tight">Create your account</h1>
          <p className="mt-2 text-sm leading-6" style={{ color: "var(--text-secondary)" }}>
            Small habits, big changes. Join Habitflow and start today.
          </p>

          <form onSubmit={handleSubmit} className="mt-7 space-y-4" noValidate>
            <div>
              <label htmlFor="name" className="text-sm font-medium">
                Full name
              </label>
              <input
                id="name"
                name="username"
                type="text"
                autoComplete="name"
                placeholder="Enter your full name"
                className={inputClass}
                style={inputStyle}
                value={formData.username}
                onChange={handleChange}
                required
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
                className={inputClass}
                style={inputStyle}
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="text-xs font-medium hover:underline"
                  style={{ color: "var(--accent)" }}
                  aria-pressed={showPassword}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <input
                id="password"
                name="password"
                type={passwordType}
                autoComplete="new-password"
                placeholder="At least 8 characters"
                className={inputClass}
                style={inputStyle}
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="text-sm font-medium">
                Confirm password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={passwordType}
                autoComplete="new-password"
                placeholder="Enter password again"
                className={inputClass}
                style={inputStyle}
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            {validationError && (
              <p className="text-sm text-red-500" role="alert">
                {validationError}
              </p>
            )}
            {error && (
              <p className="text-sm text-red-500" role="alert">
                {error}
              </p>
            )}
            {successMessage && (
              <p className="text-sm text-green-600" role="status">
                {successMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3.5 font-semibold transition hover:-translate-y-0.5 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
              style={{ backgroundColor: "var(--accent)", color: "var(--accent-contrast)" }}
            >
              {isLoading ? "Creating account..." : "Create account"}
              {!isLoading && <span aria-hidden="true">→</span>}
            </button>
          </form>

          <p className="mt-6 text-center text-sm" style={{ color: "var(--text-secondary)" }}>
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

        {/* Perks under the card */}
        <ul
          className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs"
          style={{ color: "var(--text-secondary)" }}
        >
          {perks.map((p) => (
            <li key={p.label} className="flex items-center gap-2">
              <span style={{ color: "var(--accent)" }} aria-hidden="true">
                {p.icon}
              </span>
              {p.label}
            </li>
          ))}
        </ul>

        <p className="mt-6 text-center text-xs" style={{ color: "var(--text-secondary)" }}>
          © 2026 Habitflow. Built for your growth.
        </p>
      </motion.div>
    </main>
  );
}