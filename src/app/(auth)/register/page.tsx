
"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
        headers: {
          "Content-Type": "application/json",
        },
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

      // Change this route if your verification page uses another URL.
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

  const inputClass =
    "mt-2 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20";

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0b1220] px-4 py-12 text-white">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-xl font-bold tracking-tight"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-400 text-lg text-slate-950">
            H
          </span>
          habitflow
        </Link>

        <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 shadow-2xl shadow-black/20 sm:p-8">
          <div className="mb-7">
            <p className="mb-3 text-sm font-medium text-sky-300">
              START YOUR JOURNEY
            </p>

            <h1 className="text-3xl font-bold tracking-tight">
              Create your account
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Build better habits, one day at a time.
            </p>
          </div>

          {error && (
            <div
              role="alert"
              className="mb-5 rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300"
            >
              {error}
            </div>
          )}

          {success && (
            <div
              role="status"
              className="mb-5 rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-300"
            >
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="text-sm font-medium text-slate-200">
                Full name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                className={inputClass}
                required
                maxLength={100}
              />
            </div>

            <div>
              <label htmlFor="email" className="text-sm font-medium text-slate-200">
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
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="text-sm font-medium text-slate-200"
              >
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
                minLength={8}
                required
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-slate-200"
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
                minLength={8}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center rounded-xl bg-sky-400 px-4 py-3.5 font-semibold text-slate-950 transition hover:bg-sky-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-sky-300 hover:text-sky-200"
            >
              Sign in
            </Link>
          </p>
        </div>

        <p className="mt-6 text-center text-xs leading-5 text-slate-500">
          Start small. Stay consistent. Become better.
        </p>
      </div>
    </main>
  );
}
