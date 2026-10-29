
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Theme = "blue" | "light";

const features = [
  {
    number: "01",
    title: "Build better habits",
    description:
      "Create meaningful habits and build consistency through small, repeatable actions.",
    icon: "✓",
    color: "sky",
  },
  {
    number: "02",
    title: "Plan your routine",
    description:
      "Organize your day, structure your time, and create a routine that works for you.",
    icon: "◷",
    color: "violet",
  },
  {
    number: "03",
    title: "Track your progress",
    description:
      "Understand your progress, review your consistency, and keep moving toward your goals.",
    icon: "↗",
    color: "emerald",
  },
];

const steps = [
  {
    number: "01",
    title: "Set your goals",
    description:
      "Choose the habits and routines that support the person you want to become.",
  },
  {
    number: "02",
    title: "Show up daily",
    description:
      "Complete your habits, follow your routine, and focus on the next step.",
  },
  {
    number: "03",
    title: "Grow consistently",
    description:
      "Review your progress, learn from your experience, and keep improving.",
  },
];

const faqs = [
  {
    question: "What is Habit Tracker?",
    answer:
      "Habit Tracker helps you organize daily habits, manage routines, participate in challenges, and understand your progress.",
  },
  {
    question: "Can I create my own habits?",
    answer:
      "Yes. You can create and manage habits based on your personal goals and daily activities.",
  },
  {
    question: "Can I organize my daily routine?",
    answer:
      "Yes. Create a daily schedule with activities and time slots that fit your lifestyle.",
  },
  {
    question: "Is the website mobile-friendly?",
    answer:
      "The landing page adapts to mobile phones, tablets, and desktop screens.",
  },
];

const footerGroups = [
  {
    title: "Explore",
    links: [
      { label: "Features", href: "#features" },
      { label: "How it works", href: "#how-it-works" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Sign in", href: "/login" },
      { label: "Create account", href: "/register" },
    ],
  },
];

export default function Home() {
  const [theme, setTheme] = useState<Theme>("blue");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("habit-theme");

    if (savedTheme === "blue" || savedTheme === "light") {
      setTheme(savedTheme);
    }

    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    document.documentElement.dataset.theme = theme;
    localStorage.setItem("habit-theme", theme);
  }, [theme, mounted]);

  function toggleTheme() {
    setTheme((current) => (current === "blue" ? "light" : "blue"));
  }

  const surface =
    "border-[var(--border-color)] bg-[var(--card-bg)]";
  const muted = "text-[var(--text-secondary)]";
  const heading = "text-[var(--text-primary)]";

  return (
    <main
      data-theme={theme}
      className="min-h-screen overflow-x-clip bg-[var(--page-bg)] text-[var(--text-primary)] transition-colors duration-300"
    >
      {/* Navbar */}
      <header className="sticky top-0 z-40 border-b border-[var(--border-color)] bg-[var(--page-bg)]/90 backdrop-blur-xl">
        <nav
          aria-label="Main navigation"
          className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4 lg:px-8"
        >
          <Link href="/" className="flex shrink-0 items-center gap-2 sm:gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 text-lg font-bold text-white sm:h-10 sm:w-10">
              H
            </span>
            <span className="text-base font-semibold sm:text-lg">
              habit<span className="text-sky-500">flow</span>
            </span>
          </Link>

          <div className={`hidden items-center gap-6 text-sm md:flex ${muted}`}>
            <a href="#features" className="transition hover:text-sky-500">
              Features
            </a>
            <a href="#how-it-works" className="transition hover:text-sky-500">
              How it works
            </a>
            <a href="#faq" className="transition hover:text-sky-500">
              FAQ
            </a>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={
                theme === "blue"
                  ? "Switch to white theme"
                  : "Switch to blue theme"
              }
              title={
                theme === "blue" ? "Switch to light mode" : "Switch to blue mode"
              }
              className={`flex h-10 w-10 items-center justify-center rounded-xl border text-lg transition hover:scale-105 ${surface}`}
            >
              {theme === "blue" ? "☀️" : "🌙"}
            </button>

            <Link
              href="/login"
              className={`hidden rounded-lg px-3 py-2 text-sm transition hover:text-sky-500 sm:inline-flex ${muted}`}
            >
              Sign in
            </Link>

            <Link
              href="/register"
              className="rounded-xl bg-sky-400 px-3 py-2.5 text-xs font-semibold text-slate-950 transition hover:bg-sky-300 sm:px-4 sm:text-sm"
            >
              Get started ↗
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative isolate">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_75%_15%,rgba(14,165,233,0.14),transparent_45%),radial-gradient(ellipse_at_10%_55%,rgba(37,99,235,0.10),transparent_45%)]"
        />

        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-28">
          <div className="min-w-0">
            <div className="mb-6 inline-flex max-w-full items-center gap-2 rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-2 text-xs text-sky-600 dark:text-sky-300 sm:text-sm">
              <span className="h-2 w-2 shrink-0 rounded-full bg-sky-400" />
              Your journey to consistency starts here
            </div>

            <h1 className={`max-w-3xl text-4xl font-extrabold leading-[1.08] tracking-[-0.045em] min-[420px]:text-5xl sm:text-6xl lg:text-7xl ${heading}`}>
              Build habits
              <br />
              that{" "}
              <span className="bg-gradient-to-r from-sky-500 via-sky-400 to-cyan-400 bg-clip-text text-transparent">
                actually stick.
              </span>
            </h1>

            <p className={`mt-5 max-w-xl text-base leading-7 sm:mt-7 sm:text-lg sm:leading-8 ${muted}`}>
              Build routines that last, stay focused on what matters, and turn
              your everyday efforts into meaningful progress.
            </p>

            <div className="mt-7 flex flex-col gap-3 min-[480px]:flex-row sm:mt-9 sm:gap-4">
              <Link
                href="/register"
                className="group inline-flex w-full items-center justify-center gap-3 rounded-xl bg-sky-400 px-5 py-3.5 font-semibold text-slate-950 shadow-lg shadow-sky-500/20 transition hover:-translate-y-0.5 hover:bg-sky-300 min-[480px]:w-auto"
              >
                Start your journey
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>

              <a
                href="#features"
                className={`inline-flex w-full items-center justify-center rounded-xl border px-5 py-3.5 font-medium transition hover:border-sky-400/50 hover:bg-sky-400/10 min-[480px]:w-auto ${surface}`}
              >
                Explore features
              </a>
            </div>

            <div className={`mt-8 flex flex-wrap gap-x-5 gap-y-3 text-sm ${muted}`}>
              <span>✓ Habit tracking</span>
              <span>✓ Daily routines</span>
              <span>✓ Progress insights</span>
            </div>
          </div>

          {/* Showcase without fake user data */}
          <div className="relative mx-auto w-full min-w-0 max-w-xl">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-5 -z-10 rounded-full bg-sky-500/10 blur-3xl sm:-inset-8"
            />

            <div className={`overflow-hidden rounded-2xl border shadow-2xl shadow-black/10 ${surface}`}>
              <div className={`flex items-start justify-between gap-3 border-b px-4 py-4 sm:px-5 sm:py-5 ${surface}`}>
                <div>
                  <p className={`font-semibold ${heading}`}>
                    Your personal space
                  </p>
                  <p className={`mt-1 text-sm leading-6 ${muted}`}>
                    Everything you need to keep growing.
                  </p>
                </div>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-sky-400/30 bg-sky-400/10 text-sky-500">
                  ✦
                </div>
              </div>

              <div className="space-y-3 p-3 sm:space-y-4 sm:p-6">
                <ShowcaseCard
                  icon="✓"
                  title="Daily habits"
                  description="Build consistency, one action at a time."
                  color="sky"
                />
                <ShowcaseCard
                  icon="◷"
                  title="Personal routines"
                  description="Structure your day around what matters."
                  color="violet"
                />
                <ShowcaseCard
                  icon="↗"
                  title="Challenges and growth"
                  description="Set goals and work toward meaningful progress."
                  color="emerald"
                />

                <div className="group relative overflow-hidden rounded-xl border border-amber-400/30 bg-gradient-to-r from-amber-400/10 via-orange-400/10 to-rose-400/10 p-4 transition hover:border-amber-400/60 hover:shadow-lg hover:shadow-amber-500/10">
                  <p className="text-center text-sm leading-6 text-amber-600 dark:text-amber-200">
                    ✨ Progress isn&apos;t about perfection. It&apos;s about
                    showing up consistently.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="scroll-mt-24 border-t border-[var(--border-color)]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <SectionHeading
            eyebrow="Features"
            title="Make consistency your superpower."
            description="Simple tools to help you focus on your goals, build momentum, and keep moving forward."
          />

          <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-14 sm:gap-5 md:grid-cols-3">
            {features.map((feature) => (
              <article
                key={feature.number}
                className={`group rounded-2xl border p-5 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-7 ${surface} ${feature.color === "sky" ? "hover:border-sky-400/50 hover:shadow-sky-500/10" : feature.color === "violet" ? "hover:border-violet-400/50 hover:shadow-violet-500/10" : "hover:border-emerald-400/50 hover:shadow-emerald-500/10"}`}
              >
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-xl border text-xl transition-all duration-300 ${
                    feature.color === "sky"
                      ? "border-sky-400/30 bg-sky-400/10 text-sky-500 group-hover:bg-sky-400 group-hover:text-slate-950"
                      : feature.color === "violet"
                        ? "border-violet-400/30 bg-violet-400/10 text-violet-500 group-hover:bg-violet-400 group-hover:text-white"
                        : "border-emerald-400/30 bg-emerald-400/10 text-emerald-500 group-hover:bg-emerald-400 group-hover:text-slate-950"
                  }`}
                >
                  {feature.icon}
                </span>

                <p className="mt-5 font-mono text-xs text-[var(--text-secondary)]">
                  {feature.number}
                </p>
                <h3 className={`mt-2 text-xl font-semibold ${heading}`}>
                  {feature.title}
                </h3>
                <p className={`mt-3 leading-7 ${muted}`}>
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section
        id="how-it-works"
        className="scroll-mt-24 border-t border-[var(--border-color)] bg-[var(--section-bg)]"
      >
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <SectionHeading
            eyebrow="How it works"
            title="Three steps to a better routine."
          />

          <ol className="mt-10 grid grid-cols-1 gap-8 sm:mt-14 sm:gap-10 md:grid-cols-3">
            {steps.map((step) => (
              <li key={step.number}>
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-sky-400/30 bg-sky-400/10 font-mono text-sky-500">
                  {step.number}
                </span>
                <h3 className={`mt-5 text-xl font-semibold sm:mt-6 ${heading}`}>
                  {step.title}
                </h3>
                <p className={`mt-3 leading-7 ${muted}`}>
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-24 border-t border-[var(--border-color)]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1fr_1.6fr] lg:gap-12 lg:px-8 lg:py-24">
          <div>
            <h2 className={`text-3xl font-bold tracking-tight sm:text-4xl ${heading}`}>
              Questions, answered.
            </h2>
            <p className={`mt-4 max-w-sm leading-7 ${muted}`}>
              Everything you need to know before starting your first habit.
            </p>
          </div>

          <div className={`divide-y divide-[var(--border-color)] rounded-2xl border bg-[var(--card-bg)] ${surface}`}>
            {faqs.map((faq) => (
              <details key={faq.question} className="group px-4 py-5 sm:px-6">
                <summary className={`flex cursor-pointer list-none items-center justify-between gap-4 font-medium ${heading} [&::-webkit-details-marker]:hidden`}>
                  <span>{faq.question}</span>
                  <span className="shrink-0 text-xl text-sky-500 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className={`mt-3 max-w-xl leading-7 ${muted}`}>
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-14 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-sky-400/30 bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100 px-5 py-10 text-center dark:from-[#122a43] dark:via-[#102035] dark:to-[#11152d] sm:px-8 sm:py-14 lg:px-12 lg:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-sky-400/20 blur-3xl"
          />
          <div className="relative">
            <p className="text-sm font-medium text-sky-700 dark:text-sky-300">
              Your next chapter starts today
            </p>
            <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
              Become who you want to be, one habit at a time.
            </h2>
            <p className="mx-auto mt-5 max-w-xl leading-7 text-slate-600 dark:text-slate-400">
              Start small. Stay consistent. Let your progress speak for itself.
            </p>
            <Link
              href="/register"
              className="mt-8 inline-flex w-full items-center justify-center gap-3 rounded-xl bg-sky-400 px-6 py-3.5 font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-sky-300 sm:w-auto sm:px-7"
            >
              Create your account →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--border-color)]">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          <div className="grid grid-cols-2 gap-8 sm:gap-10 lg:grid-cols-3">
            <div className="col-span-2 lg:col-span-1">
              <Link href="/" className={`font-semibold ${heading}`}>
                habit<span className="text-sky-500">flow</span>
              </Link>
              <p className={`mt-3 max-w-xs text-sm leading-6 ${muted}`}>
                Build habits that actually stick. Made for progress, not
                perfection.
              </p>
            </div>

            {footerGroups.map((group) => (
              <nav key={group.title} aria-label={group.title}>
                <h2 className={`text-sm font-semibold ${heading}`}>
                  {group.title}
                </h2>
                <ul className={`mt-4 space-y-3 text-sm ${muted}`}>
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="transition hover:text-sky-500"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          <p className={`mt-8 border-t border-[var(--border-color)] pt-6 text-xs ${muted} sm:mt-10`}>
            © 2026 Habit Tracker. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}

function ShowcaseCard({
  icon,
  title,
  description,
  color,
}: {
  icon: string;
  title: string;
  description: string;
  color: "sky" | "violet" | "emerald";
}) {
  const colors = {
    sky: {
      card: "border-sky-400/20 bg-gradient-to-br from-sky-400/10 via-blue-500/5 to-transparent hover:border-sky-400/60 hover:shadow-sky-500/10",
      icon: "border-sky-400/20 bg-sky-400/10 text-sky-500 group-hover:border-sky-400/50 group-hover:bg-sky-400 group-hover:text-slate-950 group-hover:shadow-sky-400/30",
      title: "group-hover:text-sky-500",
    },
    violet: {
      card: "border-violet-400/20 bg-gradient-to-br from-violet-400/10 via-indigo-500/5 to-transparent hover:border-violet-400/60 hover:shadow-violet-500/10",
      icon: "border-violet-400/20 bg-violet-400/10 text-violet-500 group-hover:border-violet-400/50 group-hover:bg-violet-400 group-hover:text-white group-hover:shadow-violet-400/30",
      title: "group-hover:text-violet-500",
    },
    emerald: {
      card: "border-emerald-400/20 bg-gradient-to-br from-emerald-400/10 via-teal-500/5 to-transparent hover:border-emerald-400/60 hover:shadow-emerald-500/10",
      icon: "border-emerald-400/20 bg-emerald-400/10 text-emerald-500 group-hover:border-emerald-400/50 group-hover:bg-emerald-400 group-hover:text-slate-950 group-hover:shadow-emerald-400/30",
      title: "group-hover:text-emerald-500",
    },
  };

  return (
    <div
      className={`group rounded-xl border p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-5 ${colors[color].card}`}
    >
      <div className="flex items-center gap-3 sm:gap-4">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border text-xl transition-all duration-300 group-hover:shadow-lg sm:h-12 sm:w-12 ${colors[color].icon}`}
        >
          {icon}
        </div>
        <div className="min-w-0">
          <h2 className={`font-semibold text-[var(--text-primary)] transition-colors duration-300 ${colors[color].title}`}>
            {title}
          </h2>
          <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-500">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-5 leading-7 text-[var(--text-secondary)]">
          {description}
        </p>
      )}
    </div>
  );
}
