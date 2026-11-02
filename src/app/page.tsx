"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Theme = "blue" | "light";

/* ---------------------------------- Data ---------------------------------- */

const initialHabits = [
  { id: "water", label: "Drink 2L of water", time: "All day", done: true },
  { id: "read", label: "Read 20 pages", time: "7:30 AM", done: true },
  { id: "workout", label: "30 min workout", time: "6:00 PM", done: false },
  { id: "plan", label: "Plan tomorrow", time: "9:30 PM", done: false },
];

const routine = [
  { time: "6:30", title: "Wake up and stretch", state: "done" },
  { time: "7:30", title: "Read 20 pages", state: "done" },
  { time: "9:00", title: "Deep work block", state: "now" },
  { time: "18:00", title: "30 min workout", state: "next" },
  { time: "21:30", title: "Plan tomorrow", state: "next" },
] as const;

const steps = [
  {
    title: "Pick a few habits",
    description:
      "Start with two or three. Name them, set a time, and decide how often you want to do them.",
  },
  {
    title: "Check them off daily",
    description:
      "Open Today, follow your routine, and tick each habit as you finish it. It takes seconds.",
  },
  {
    title: "Review your week",
    description:
      "See which habits stuck, which days slipped, and adjust your plan before the next week starts.",
  },
];

const faqs = [
  {
    question: "What is Habitflow?",
    answer:
      "Habitflow is a place to manage your daily habits and routines, join challenges, and see your progress over time.",
  },
  {
    question: "Is it free to start?",
    answer:
      "Yes. You can create an account and start tracking habits right away.",
  },
  {
    question: "Can I create my own habits?",
    answer:
      "Yes. Create habits around your own goals, choose when they happen, and edit them any time.",
  },
  {
    question: "Can I plan my whole day, not just habits?",
    answer:
      "Yes. Build a daily routine with activities and time slots, then follow it from the Today view.",
  },
  {
    question: "What happens if I miss a day?",
    answer:
      "Your history stays intact. Habitflow shows you the gap so you can pick up again, with no guilt screens.",
  },
  {
    question: "Does it work on my phone?",
    answer:
      "Yes. The site adapts to phones, tablets, and desktop screens.",
  },
];

// Deterministic sample data for the consistency preview (7 weeks x 7 days)
const heatmap = Array.from({ length: 49 }, (_, i) => {
  const week = Math.floor(i / 7);
  const day = i % 7;
  const base = (week * 2 + day * 3 + (i % 5)) % 5;
  return Math.min(4, Math.max(0, base + (week > 3 ? 1 : 0) - (day === 6 ? 1 : 0)));
});

/* ---------------------------------- Page ---------------------------------- */

export default function Home() {
  const [theme, setTheme] = useState<Theme>("blue");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("habit-theme");
      if (saved === "blue" || saved === "light") setTheme(saved);
    } catch {
      /* storage unavailable */
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("habit-theme", theme);
    } catch {
      /* storage unavailable */
    }
  }, [theme, mounted]);

  function toggleTheme() {
    setTheme((c) => (c === "blue" ? "light" : "blue"));
  }

  return (
    <main
      data-theme={theme}
      className="landing-page min-h-screen overflow-x-hidden transition-colors duration-300"
    >
      {/* Navbar */}
      <header className="site-header sticky top-0 z-50 border-b backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-4 sm:px-8">
          <Link href="/" className="flex shrink-0 items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 text-lg font-bold text-black">
              H
            </span>
            <span className="text-xl font-bold tracking-tight">
              habit<span className="accent-text">flow</span>
            </span>
          </Link>

          <div className="hidden items-center gap-8 text-sm md:flex">
            <a href="#features" className="nav-link">Features</a>
            <a href="#how-it-works" className="nav-link">How it works</a>
            <a href="#faq" className="nav-link">FAQ</a>
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={
                theme === "blue" ? "Switch to light theme" : "Switch to dark theme"
              }
              title={theme === "blue" ? "Switch to light mode" : "Switch to dark mode"}
              className="theme-button flex h-10 w-10 items-center justify-center rounded-xl border text-lg transition hover:scale-105"
            >
              {theme === "blue" ? "☀️" : "🌙"}
            </button>

            <Link
              href="/login"
              className="nav-link hidden rounded-lg px-3 py-2 text-sm sm:inline-flex"
            >
              Sign in
            </Link>

            <Link href="/register" className="btn-primary px-3 py-2.5 text-xs sm:px-4 sm:text-sm">
              Get started
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero: message left, working demo right */}
      <section className="hero-section relative overflow-hidden px-5 pb-20 pt-14 sm:px-8 lg:pb-28 lg:pt-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_70%_20%,rgba(14,165,233,0.16),transparent_55%)]"
        />

        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <h1 className="hero-heading text-5xl font-extrabold leading-[1.05] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
              Plan your day.
              <br />
              Check off your habits.
              <br />
              <span className="muted-highlight">See what sticks.</span>
            </h1>

            <p className="muted-text mt-7 max-w-xl text-base leading-8 sm:text-lg">
              Habitflow puts your habits, your daily routine, and your progress
              on one screen, so you always know what to do next.
            </p>

            <div className="mt-9 flex flex-col gap-4 min-[480px]:flex-row">
              <Link href="/register" className="btn-primary group gap-3 px-7 py-4 shadow-lg shadow-cyan-500/20">
                Start for free
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <a
                href="#features"
                className="secondary-button inline-flex items-center justify-center rounded-xl border px-7 py-4 font-semibold transition hover:border-cyan-400/40 hover:bg-cyan-400/10"
              >
                See how it works
              </a>
            </div>

            <ul className="muted-text mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm">
              <li>✓ Free to start</li>
              <li>✓ Set up in a minute</li>
              <li>✓ Works on any screen</li>
            </ul>
          </div>

          <TodayDemo />
        </div>
      </section>

      {/* Features: bento layout, each tile shows its own thing */}
      <section
        id="features"
        className="content-section scroll-mt-20 border-t px-5 py-24 sm:px-8 lg:py-28"
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <h2 className="section-heading text-3xl font-bold tracking-tight sm:text-5xl">
              Everything for a productive day, in one place.
            </h2>
            <p className="muted-text mt-5 max-w-xl leading-7">
              Habits tell you what to repeat. Your routine tells you when.
              Your progress tells you what is working.
            </p>
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-6">
            {/* Habits */}
            <article className="panel rounded-2xl border p-6 sm:p-7 lg:col-span-3">
              <h3 className="text-xl font-semibold">Build habits that last</h3>
              <p className="muted-text mt-2 max-w-md leading-7">
                Set what you want to repeat and tick it off each day. Small
                actions add up to a streak.
              </p>

              <div className="mt-7 space-y-3">
                {[
                  { name: "Morning walk", days: [1, 1, 1, 1, 0, 1, 1] },
                  { name: "Read 20 pages", days: [1, 1, 0, 1, 1, 1, 0] },
                  { name: "No phone after 10 PM", days: [0, 1, 1, 1, 1, 0, 1] },
                ].map((h) => (
                  <div key={h.name} className="soft-row flex items-center justify-between gap-4 rounded-xl px-4 py-3">
                    <span className="text-sm font-medium">{h.name}</span>
                    <span className="flex gap-1.5" aria-label="Last 7 days">
                      {h.days.map((d, i) => (
                        <span
                          key={i}
                          className={`h-5 w-5 rounded-md ${d ? "bg-cyan-400" : "dot-empty"}`}
                        />
                      ))}
                    </span>
                  </div>
                ))}
              </div>
            </article>

            {/* Routine */}
            <article className="panel rounded-2xl border p-6 sm:p-7 lg:col-span-3">
              <h3 className="text-xl font-semibold">Plan your routine by the hour</h3>
              <p className="muted-text mt-2 max-w-md leading-7">
                Give each activity a time slot and follow your day from top to
                bottom.
              </p>

              <ol className="mt-7 space-y-1">
                {routine.map((r) => (
                  <li key={r.time} className="flex items-center gap-4 py-2">
                    <span className="muted-text w-12 shrink-0 font-mono text-sm">{r.time}</span>
                    <span
                      className={`h-3 w-3 shrink-0 rounded-full ${
                        r.state === "done"
                          ? "bg-cyan-400"
                          : r.state === "now"
                          ? "bg-cyan-400 ring-4 ring-cyan-400/25"
                          : "dot-empty"
                      }`}
                    />
                    <span
                      className={`text-sm ${
                        r.state === "done" ? "muted-text line-through" : "font-medium"
                      }`}
                    >
                      {r.title}
                    </span>
                    {r.state === "now" && (
                      <span className="ml-auto rounded-full bg-cyan-400/15 px-2.5 py-0.5 text-xs font-semibold accent-text">
                        Now
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </article>

            {/* Progress */}
            <article className="panel rounded-2xl border p-6 sm:p-7 lg:col-span-4">
              <h3 className="text-xl font-semibold">See your consistency</h3>
              <p className="muted-text mt-2 max-w-md leading-7">
                Review the last seven weeks at a glance. Darker squares mean
                more habits completed that day.
              </p>

              <div className="mt-7 overflow-x-auto">
                <div
                  className="grid w-max grid-flow-col grid-rows-7 gap-1.5"
                  role="img"
                  aria-label="Example heatmap of habit completion over seven weeks"
                >
                  {heatmap.map((level, i) => (
                    <span key={i} className={`h-6 w-6 rounded-md heat-${level}`} />
                  ))}
                </div>
              </div>
              <p className="muted-text mt-4 text-xs">Example data</p>
            </article>

            {/* Challenges */}
            <article className="panel rounded-2xl border p-6 sm:p-7 lg:col-span-2">
              <h3 className="text-xl font-semibold">Take on challenges</h3>
              <p className="muted-text mt-2 leading-7">
                Set a goal for a fixed period and work toward it a day at a time.
              </p>

              <div className="mt-7">
                <div className="flex items-baseline justify-between text-sm">
                  <span className="font-medium">30 days of reading</span>
                  <span className="muted-text">day 18 of 30</span>
                </div>
                <div
                  className="soft-row mt-3 h-2.5 overflow-hidden rounded-full"
                  role="progressbar"
                  aria-valuenow={18}
                  aria-valuemin={0}
                  aria-valuemax={30}
                  aria-label="Challenge progress"
                >
                  <div className="h-full w-[60%] rounded-full bg-gradient-to-r from-cyan-400 to-sky-500" />
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* How it works: a real sequence */}
      <section
        id="how-it-works"
        className="content-section scroll-mt-20 border-y px-5 py-24 sm:px-8 lg:py-28"
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <h2 className="section-heading text-3xl font-bold tracking-tight sm:text-5xl">
              Start small. Three steps is all it takes.
            </h2>
            <p className="muted-text mt-5 max-w-xl leading-7">
              You do not need to change everything in one day. Begin with one
              habit and build from there.
            </p>
          </div>

          <ol className="relative mt-16 grid gap-12 md:grid-cols-3 md:gap-8">
            <div
              aria-hidden="true"
              className="step-line absolute left-7 top-7 hidden h-px w-[calc(100%-3.5rem)] md:block"
            />
            {steps.map((step, i) => (
              <li key={step.title} className="relative">
                <span className="step-badge relative flex h-14 w-14 items-center justify-center rounded-full border font-mono text-lg font-semibold">
                  {i + 1}
                </span>
                <h3 className="mt-6 text-xl font-semibold">{step.title}</h3>
                <p className="muted-text mt-3 max-w-sm leading-7">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section
        id="faq"
        className="content-section scroll-mt-20 border-b px-5 py-24 sm:px-8 lg:py-28"
      >
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="section-heading text-4xl font-bold tracking-tight sm:text-5xl">
              Questions, answered.
            </h2>
            <p className="muted-text mt-5 max-w-sm leading-7">
              Everything to know before you add your first habit.
            </p>
          </div>

          <div className="faq-card divide-y overflow-hidden rounded-2xl border">
            {faqs.map((faq) => (
              <details key={faq.question} className="group p-5 sm:p-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <span className="accent-text shrink-0 text-xl transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="muted-text mt-4 max-w-xl leading-7">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="content-section px-5 py-24 sm:px-8 lg:py-28">
        <div className="cta-card relative mx-auto max-w-5xl overflow-hidden rounded-3xl border px-6 py-16 text-center sm:px-12 sm:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl"
          />
          <div className="relative">
            <h2 className="section-heading mx-auto max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
              Your next productive day starts with one habit.
            </h2>
            <p className="muted-text mx-auto mt-6 max-w-xl leading-7">
              Create your account, add a habit, and check it off today.
            </p>
            <Link href="/register" className="btn-primary mt-9 gap-3 px-7 py-4">
              Create your account
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer border-t px-5 py-12 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-10 md:grid-cols-3">
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="text-xl font-bold">
                habit<span className="accent-text">flow</span>
              </Link>
              <p className="muted-text mt-4 max-w-xs text-sm leading-7">
                Build habits that actually stick. Made for progress, not
                perfection.
              </p>
            </div>

            <FooterGroup
              title="Explore"
              links={[
                { label: "Features", href: "#features" },
                { label: "How it works", href: "#how-it-works" },
                { label: "FAQ", href: "#faq" },
              ]}
            />
            <FooterGroup
              title="Account"
              links={[
                { label: "Sign in", href: "/login" },
                { label: "Create account", href: "/register" },
              ]}
            />
          </div>

          <p className="muted-text mt-12 border-t border-[var(--line)] pt-7 text-xs">
            © 2026 Habitflow. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Theme styles */}
      <style jsx global>{`
        .landing-page {
          --page: #080f1d;
          --surface: #101a2a;
          --soft: #ffffff0d;
          --text: #f8fafc;
          --muted: #9ca3af;
          --line: #ffffff14;
          --button-surface: #ffffff08;
          --accent: #22d3ee;
          --heat-0: #ffffff0f;
          --heat-1: #22d3ee40;
          --heat-2: #22d3ee80;
          --heat-3: #22d3eec0;
          --heat-4: #22d3ee;
          background: var(--page);
          color: var(--text);
        }

        .landing-page[data-theme="light"] {
          --page: #ffffff;
          --surface: #ffffff;
          --soft: #f3f4f6;
          --text: #111827;
          --muted: #6b7280;
          --line: #e5e7eb;
          --button-surface: #f9fafb;
          --accent: #0e7490;
          --heat-0: #eef2f7;
          --heat-1: #a5f3fc;
          --heat-2: #67e8f9;
          --heat-3: #22d3ee;
          --heat-4: #0891b2;
        }

        .site-header {
          background: color-mix(in srgb, var(--page) 88%, transparent);
          border-color: var(--line);
        }
        .site-footer,
        .content-section {
          border-color: var(--line);
        }

        .accent-text { color: var(--accent); }
        .muted-text { color: var(--muted); }
        .hero-heading,
        .section-heading { color: var(--text); }
        .muted-highlight { color: var(--muted); }

        .nav-link { color: var(--muted); transition: color 0.2s; }
        .nav-link:hover { color: var(--accent); }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 0.75rem;
          background: #22d3ee;
          color: #020617;
          font-weight: 600;
          transition: background 0.2s, transform 0.2s;
        }
        .btn-primary:hover { background: #67e8f9; transform: translateY(-2px); }

        .secondary-button,
        .theme-button {
          border-color: var(--line);
          background: var(--button-surface);
          color: var(--text);
        }

        .panel,
        .preview-card,
        .faq-card,
        .cta-card {
          background: var(--surface);
          border-color: var(--line);
          color: var(--text);
        }
        .landing-page[data-theme="light"] .panel,
        .landing-page[data-theme="light"] .preview-card {
          box-shadow: 0 20px 50px rgb(15 23 42 / 7%);
        }
        .landing-page[data-theme="light"] .cta-card {
          background: linear-gradient(135deg, #f8fafc, #eef2f7);
        }
        .landing-page[data-theme="light"] .hero-section {
          background: radial-gradient(ellipse at 70% 20%, rgb(14 165 233 / 9%), transparent 55%);
        }

        .soft-row { background: var(--soft); }
        .dot-empty { background: var(--heat-0); border: 1px solid var(--line); }
        .demo-divider { border-color: var(--line); }

        .heat-0 { background: var(--heat-0); }
        .heat-1 { background: var(--heat-1); }
        .heat-2 { background: var(--heat-2); }
        .heat-3 { background: var(--heat-3); }
        .heat-4 { background: var(--heat-4); }

        .step-badge {
          border-color: rgb(34 211 238 / 35%);
          background: var(--page);
          color: var(--accent);
        }
        .step-line {
          background: linear-gradient(to right, rgb(34 211 238 / 45%), var(--line));
        }

        .habit-row:focus-visible,
        .btn-primary:focus-visible,
        .nav-link:focus-visible,
        .theme-button:focus-visible,
        .secondary-button:focus-visible,
        summary:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 3px;
        }

        .ring-progress { transition: stroke-dashoffset 0.5s ease; }

        @media (prefers-reduced-motion: reduce) {
          .landing-page *,
          .landing-page *::before,
          .landing-page *::after {
            scroll-behavior: auto !important;
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </main>
  );
}

/* ------------------------- Interactive hero preview ------------------------ */

function TodayDemo() {
  const [habits, setHabits] = useState(initialHabits);

  const done = habits.filter((h) => h.done).length;
  const total = habits.length;
  const allDone = done === total;
  const percent = Math.round((done / total) * 100);
  const next = habits.find((h) => !h.done);

  const radius = 52;
  const circumference = useMemo(() => 2 * Math.PI * radius, []);
  const offset = circumference * (1 - done / total);

  function toggle(id: string) {
    setHabits((list) =>
      list.map((h) => (h.id === id ? { ...h, done: !h.done } : h))
    );
  }

  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div className="pointer-events-none absolute -inset-6 -z-10 rounded-full bg-cyan-500/[0.09] blur-3xl" />

      <div className="preview-card overflow-hidden rounded-2xl border shadow-2xl">
        {/* Header with progress ring */}
        <div className="demo-divider flex items-center justify-between gap-4 border-b px-5 py-5 sm:px-6">
          <div>
            <p className="text-lg font-semibold">Today</p>
            <p className="muted-text mt-1 text-sm" aria-live="polite">
              {allDone
                ? "All done. Nice work today."
                : `${done} of ${total} habits done`}
            </p>
            <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-amber-400/15 px-3 py-1 text-xs font-semibold text-amber-500">
              🔥 {allDone ? 13 : 12}-day streak
            </p>
          </div>

          <div className="relative h-28 w-28 shrink-0">
            <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90" aria-hidden="true">
              <circle cx="60" cy="60" r={radius} fill="none" stroke="var(--heat-0)" strokeWidth="10" />
              <circle
                cx="60"
                cy="60"
                r={radius}
                fill="none"
                stroke="#22d3ee"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                className="ring-progress"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-xl font-bold">
              {percent}%
            </span>
          </div>
        </div>

        {/* Habit list */}
        <ul className="space-y-2 p-4 sm:p-5">
          {habits.map((h) => (
            <li key={h.id}>
              <button
                type="button"
                onClick={() => toggle(h.id)}
                aria-pressed={h.done}
                className="habit-row soft-row flex w-full items-center gap-4 rounded-xl px-4 py-3.5 text-left transition hover:bg-cyan-400/10"
              >
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border text-sm font-bold transition ${
                    h.done
                      ? "border-cyan-400 bg-cyan-400 text-slate-950"
                      : "border-[var(--line)] bg-transparent text-transparent"
                  }`}
                >
                  ✓
                </span>
                <span className="min-w-0 flex-1">
                  <span className={`block text-sm font-medium ${h.done ? "muted-text line-through" : ""}`}>
                    {h.label}
                  </span>
                </span>
                <span className="muted-text shrink-0 text-xs">{h.time}</span>
              </button>
            </li>
          ))}
        </ul>

        {/* Next up */}
        <div className="demo-divider border-t px-5 py-4 text-sm sm:px-6">
          {next ? (
            <p>
              <span className="muted-text">Up next: </span>
              <span className="font-semibold">{next.label}</span>
              <span className="muted-text"> at {next.time}</span>
            </p>
          ) : (
            <p className="font-semibold">Plan is complete. Rest up for tomorrow.</p>
          )}
        </div>
      </div>

      <p className="muted-text mt-4 text-center text-xs">
        Try it: tap a habit to check it off.
      </p>
    </div>
  );
}

/* --------------------------------- Footer --------------------------------- */

function FooterGroup({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <nav aria-label={title}>
      <h2 className="text-sm font-semibold">{title}</h2>
      <ul className="muted-text mt-5 space-y-3 text-sm">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="nav-link">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}