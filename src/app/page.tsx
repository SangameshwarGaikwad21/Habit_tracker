"use client";

/**
 * Habitflow home page, rebuilt with the editorial master prompt.
 *
 * Install:  npm i framer-motion lenis
 * Fonts:    loaded with next/font below (no extra install)
 */

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Lenis from "lenis";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "700", "800"],
});
const body = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

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
    answer: "Yes. You can create an account and start tracking habits right away.",
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
    answer: "Yes. The site adapts to phones, tablets, and desktop screens.",
  },
];

const marqueeItems = ["Habits", "Daily routine", "Streaks", "Challenges", "Weekly review"];

// Deterministic sample data for the consistency preview (7 weeks x 7 days)
const heatmap = Array.from({ length: 49 }, (_, i) => {
  const week = Math.floor(i / 7);
  const day = i % 7;
  const base = (week * 2 + day * 3 + (i % 5)) % 5;
  return Math.min(4, Math.max(0, base + (week > 3 ? 1 : 0) - (day === 6 ? 1 : 0)));
});

const EASE = [0.22, 1, 0.36, 1] as const;

/* ---------------------------------- Page ---------------------------------- */

export default function Home() {
  const [theme, setTheme] = useState<Theme>("blue");
  const [mounted, setMounted] = useState(false);
  const reduce = useReducedMotion();

  // Restore saved theme
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

  // Smooth scroll (Lenis), skipped when the person prefers reduced motion
  useEffect(() => {
    if (reduce) return;
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, [reduce]);

  return (
    <main
      data-theme={theme}
      className={`${display.variable} ${body.variable} landing-page min-h-screen overflow-x-hidden transition-colors duration-300`}
    >
      {/* Navbar */}
      <header className="site-header sticky top-0 z-50 border-b backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-4 sm:px-8">
          <Link href="/" className="flex shrink-0 items-center gap-3">
            <span className="font-display flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 text-lg font-bold text-black">
              H
            </span>
            <span className="font-display text-xl font-bold tracking-tight">
              habit<span className="accent-text">flow</span>
            </span>
          </Link>

          <div className="hidden items-center gap-9 text-sm md:flex">
            <a href="#features" className="nav-link">Features</a>
            <a href="#how-it-works" className="nav-link">How it works</a>
            <a href="#faq" className="nav-link">FAQ</a>
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setTheme((c) => (c === "blue" ? "light" : "blue"))}
              aria-label={theme === "blue" ? "Switch to light theme" : "Switch to dark theme"}
              className="theme-button flex h-10 w-10 items-center justify-center rounded-xl border text-lg transition hover:scale-105"
            >
              {theme === "blue" ? "☀️" : "🌙"}
            </button>
            <Link href="/login" className="nav-link hidden rounded-lg px-3 py-2 text-sm sm:inline-flex">
              Sign in
            </Link>
            <Link href="/register" className="btn-primary px-4 py-2.5 text-sm">
              Get started
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <Hero reduce={!!reduce} />

      {/* Marquee */}
      <Marquee />

      {/* Statement: words light up as you scroll */}
      <section className="content-section px-5 py-28 sm:px-8 lg:py-40">
        <div className="mx-auto max-w-5xl">
          <ScrollWords
            text="Habits tell you what to repeat. Your routine tells you when. Your progress tells you what is working. Habitflow keeps all three on one screen, so you always know what to do next."
          />
        </div>
      </section>

      {/* Features: bento */}
      <section id="features" className="content-section scroll-mt-20 border-t px-5 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <h2 className="section-heading font-display max-w-3xl text-4xl font-extrabold leading-[1.05] tracking-[-0.035em] sm:text-6xl">
              Everything for a productive day, in one place.
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-5 lg:grid-cols-6">
            <Reveal className="lg:col-span-3">
              <article className="panel h-full rounded-3xl border p-6 sm:p-8">
                <h3 className="font-display text-2xl font-bold tracking-tight">Build habits that last</h3>
                <p className="muted-text mt-3 max-w-md leading-7">
                  Set what you want to repeat and tick it off each day. Small actions add up to a streak.
                </p>
                <div className="mt-8 space-y-3">
                  {[
                    { name: "Morning walk", days: [1, 1, 1, 1, 0, 1, 1] },
                    { name: "Read 20 pages", days: [1, 1, 0, 1, 1, 1, 0] },
                    { name: "No phone after 10 PM", days: [0, 1, 1, 1, 1, 0, 1] },
                  ].map((h) => (
                    <div key={h.name} className="soft-row flex items-center justify-between gap-4 rounded-xl px-4 py-3">
                      <span className="text-sm font-medium">{h.name}</span>
                      <span className="flex gap-1.5" aria-label="Last 7 days">
                        {h.days.map((d, i) => (
                          <span key={i} className={`h-5 w-5 rounded-md ${d ? "bg-cyan-400" : "dot-empty"}`} />
                        ))}
                      </span>
                    </div>
                  ))}
                </div>
              </article>
            </Reveal>

            <Reveal className="lg:col-span-3" delay={0.08}>
              <article className="panel h-full rounded-3xl border p-6 sm:p-8">
                <h3 className="font-display text-2xl font-bold tracking-tight">Plan your routine by the hour</h3>
                <p className="muted-text mt-3 max-w-md leading-7">
                  Give each activity a time slot and follow your day from top to bottom.
                </p>
                <ol className="mt-8 space-y-1">
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
                      <span className={`text-sm ${r.state === "done" ? "muted-text line-through" : "font-medium"}`}>
                        {r.title}
                      </span>
                      {r.state === "now" && (
                        <span className="accent-text ml-auto rounded-full bg-cyan-400/15 px-2.5 py-0.5 text-xs font-semibold">
                          Now
                        </span>
                      )}
                    </li>
                  ))}
                </ol>
              </article>
            </Reveal>

            <Reveal className="lg:col-span-4">
              <article className="panel h-full rounded-3xl border p-6 sm:p-8">
                <h3 className="font-display text-2xl font-bold tracking-tight">See your consistency</h3>
                <p className="muted-text mt-3 max-w-md leading-7">
                  Review the last seven weeks at a glance. Brighter squares mean more habits completed that day.
                </p>
                <div className="mt-8 overflow-x-auto">
                  <div
                    className="grid w-max grid-flow-col grid-rows-7 gap-1.5"
                    role="img"
                    aria-label="Example heatmap of habit completion over seven weeks"
                  >
                    {heatmap.map((level, i) => (
                      <span key={i} className={`heat-cell h-6 w-6 rounded-md heat-${level}`} />
                    ))}
                  </div>
                </div>
                <p className="muted-text mt-4 text-xs">Example data</p>
              </article>
            </Reveal>

            <Reveal className="lg:col-span-2" delay={0.08}>
              <article className="panel h-full rounded-3xl border p-6 sm:p-8">
                <h3 className="font-display text-2xl font-bold tracking-tight">Take on challenges</h3>
                <p className="muted-text mt-3 leading-7">
                  Set a goal for a fixed period and work toward it a day at a time.
                </p>
                <div className="mt-8">
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
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "60%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.1, ease: EASE }}
                      className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-sky-500"
                    />
                  </div>
                </div>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="content-section scroll-mt-20 border-y px-5 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <h2 className="section-heading font-display max-w-3xl text-4xl font-extrabold leading-[1.05] tracking-[-0.035em] sm:text-6xl">
              Start small. Three steps is all it takes.
            </h2>
          </Reveal>

          <ol className="relative mt-20 grid gap-14 md:grid-cols-3 md:gap-8">
            <div aria-hidden="true" className="step-line absolute left-7 top-7 hidden h-px w-[calc(100%-3.5rem)] md:block" />
            {steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.1}>
                <li className="relative list-none">
                  <span className="step-badge font-display relative flex h-14 w-14 items-center justify-center rounded-full border text-lg font-bold">
                    {i + 1}
                  </span>
                  <h3 className="font-display mt-6 text-2xl font-bold tracking-tight">{step.title}</h3>
                  <p className="muted-text mt-3 max-w-sm leading-7">{step.description}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="content-section scroll-mt-20 border-b px-5 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <h2 className="section-heading font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.035em] sm:text-6xl">
              Questions, answered.
            </h2>
            <p className="muted-text mt-5 max-w-sm leading-7">
              Everything to know before you add your first habit.
            </p>
          </Reveal>

          <div className="faq-card divide-y overflow-hidden rounded-3xl border">
            {faqs.map((faq) => (
              <details key={faq.question} className="group p-5 sm:p-7">
                <summary className="font-display flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <span className="accent-text shrink-0 text-2xl transition-transform duration-300 group-open:rotate-45">+</span>
                </summary>
                <p className="muted-text mt-4 max-w-xl leading-7">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="content-section px-5 py-24 sm:px-8 lg:py-32">
        <div className="cta-card relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border px-6 py-20 text-center sm:px-12 sm:py-28">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl"
          />
          <Reveal>
            <h2 className="section-heading font-display relative mx-auto max-w-4xl text-5xl font-extrabold leading-[1] tracking-[-0.045em] sm:text-7xl">
              Your next productive day starts with one habit.
            </h2>
            <p className="muted-text relative mx-auto mt-7 max-w-xl leading-7">
              Create your account, add a habit, and check it off today.
            </p>
            <Link href="/register" className="btn-primary relative mt-10 px-8 py-4 text-base">
              Create your account
            </Link>
          </Reveal>
        </div>
      </section>

      <Footer />

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
          font-family: var(--font-body), system-ui, sans-serif;
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
        .font-display { font-family: var(--font-display), system-ui, sans-serif; }

        .site-header { background: color-mix(in srgb, var(--page) 88%, transparent); border-color: var(--line); }
        .site-footer, .content-section { border-color: var(--line); }

        .accent-text { color: var(--accent); }
        .muted-text, .muted-highlight { color: var(--muted); }
        .hero-heading, .section-heading { color: var(--text); }

        .nav-link { color: var(--muted); transition: color 0.2s; }
        .nav-link:hover { color: var(--accent); }

        .btn-primary {
          display: inline-flex; align-items: center; justify-content: center;
          border-radius: 0.85rem; background: #22d3ee; color: #020617; font-weight: 600;
          transition: background 0.2s, transform 0.25s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .btn-primary:hover { background: #67e8f9; transform: translateY(-2px); }

        .secondary-button, .theme-button { border-color: var(--line); background: var(--button-surface); color: var(--text); }

        .panel, .preview-card, .faq-card, .cta-card { background: var(--surface); border-color: var(--line); color: var(--text); }
        .panel { transition: border-color 0.3s, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1); }
        .panel:hover { border-color: rgb(34 211 238 / 40%); transform: translateY(-4px); }
        .landing-page[data-theme="light"] .panel,
        .landing-page[data-theme="light"] .preview-card { box-shadow: 0 20px 50px rgb(15 23 42 / 7%); }
        .landing-page[data-theme="light"] .cta-card { background: linear-gradient(135deg, #f8fafc, #eef2f7); }

        .soft-row { background: var(--soft); }
        .dot-empty { background: var(--heat-0); border: 1px solid var(--line); }
        .demo-divider { border-color: var(--line); }

        .heat-0 { background: var(--heat-0); }
        .heat-1 { background: var(--heat-1); }
        .heat-2 { background: var(--heat-2); }
        .heat-3 { background: var(--heat-3); }
        .heat-4 { background: var(--heat-4); }

        .step-badge { border-color: rgb(34 211 238 / 35%); background: var(--page); color: var(--accent); }
        .step-line { background: linear-gradient(to right, rgb(34 211 238 / 45%), var(--line)); }

        .marquee-track { animation: marquee 32s linear infinite; }
        .marquee:hover .marquee-track { animation-play-state: paused; }
        @keyframes marquee { to { transform: translateX(-50%); } }

        .ring-progress { transition: stroke-dashoffset 0.6s cubic-bezier(0.22, 1, 0.36, 1); }

        .habit-row:focus-visible, .btn-primary:focus-visible, .nav-link:focus-visible,
        .theme-button:focus-visible, .secondary-button:focus-visible, summary:focus-visible {
          outline: 2px solid var(--accent); outline-offset: 3px;
        }

        @media (prefers-reduced-motion: reduce) {
          .landing-page *, .landing-page *::before, .landing-page *::after {
            scroll-behavior: auto !important;
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </main>
  );
}

/* ---------------------------------- Hero ---------------------------------- */

function Hero({ reduce }: { reduce: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const demoY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 90]);

  const lines = ["Plan your day.", "Check off your habits.", "See what sticks."];

  return (
    <section ref={ref} className="hero-section relative overflow-hidden px-5 pb-24 pt-14 sm:px-8 lg:pb-32 lg:pt-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_70%_20%,rgba(14,165,233,0.16),transparent_55%)]"
      />
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          {/* One orchestrated page-load moment: each line rises out of a mask */}
          <h1 className="hero-heading font-display text-[clamp(2.9rem,7.4vw,6.5rem)] font-extrabold leading-[0.98] tracking-[-0.05em]">
            {lines.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.08em]">
                <motion.span
                  className={`block ${i === 2 ? "muted-highlight" : ""}`}
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.1 + i * 0.12, ease: EASE }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
            className="muted-text mt-8 max-w-xl text-base leading-8 sm:text-lg"
          >
            Habitflow puts your habits, your daily routine, and your progress on one screen, so you always know what to do next.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75, ease: EASE }}
            className="mt-10 flex flex-col gap-4 min-[480px]:flex-row"
          >
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
          </motion.div>

          <ul className="muted-text mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm">
            <li>✓ Free to start</li>
            <li>✓ Set up in a minute</li>
            <li>✓ Works on any screen</li>
          </ul>
        </div>

        <motion.div
          style={{ y: demoY }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: EASE }}
        >
          <TodayDemo />
        </motion.div>
      </div>
    </section>
  );
}

/* --------------------------------- Marquee -------------------------------- */

function Marquee() {
  const row = [...marqueeItems, ...marqueeItems];
  return (
    <div className="marquee content-section overflow-hidden border-y py-6" aria-hidden="true">
      <div className="marquee-track flex w-max items-center">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center">
            {row.map((item, i) => (
              <span key={`${copy}-${i}`} className="flex items-center">
                <span className="font-display muted-text px-8 text-3xl font-bold tracking-tight sm:text-5xl">{item}</span>
                <span className="h-2 w-2 rounded-full bg-cyan-400" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------ Scroll-driven word reveal ----------------------- */

function ScrollWords({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });
  const words = text.split(" ");

  return (
    <p
      ref={ref}
      className="section-heading font-display text-3xl font-bold leading-[1.15] tracking-[-0.03em] sm:text-5xl lg:text-6xl"
    >
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {w}
        </Word>
      ))}
    </p>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">
      {children}
    </motion.span>
  );
}

/* ------------------------------ Reveal wrapper ---------------------------- */

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
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
    setHabits((list) => list.map((h) => (h.id === id ? { ...h, done: !h.done } : h)));
  }

  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div className="pointer-events-none absolute -inset-6 -z-10 rounded-full bg-cyan-500/[0.09] blur-3xl" />

      <div className="preview-card overflow-hidden rounded-3xl border shadow-2xl">
        <div className="demo-divider flex items-center justify-between gap-4 border-b px-5 py-5 sm:px-6">
          <div>
            <p className="font-display text-xl font-bold">Today</p>
            <p className="muted-text mt-1 text-sm" aria-live="polite">
              {allDone ? "All done. Nice work today." : `${done} of ${total} habits done`}
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
            <span className="font-display absolute inset-0 flex items-center justify-center text-2xl font-bold">
              {percent}%
            </span>
          </div>
        </div>

        <ul className="space-y-2 p-4 sm:p-5">
          {habits.map((h) => (
            <li key={h.id}>
              <button
                type="button"
                onClick={() => toggle(h.id)}
                aria-pressed={h.done}
                className="habit-row soft-row flex w-full items-center gap-4 rounded-xl px-4 py-3.5 text-left transition hover:bg-cyan-400/10"
              >
                <motion.span
                  whileTap={{ scale: 0.85 }}
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border text-sm font-bold transition ${
                    h.done
                      ? "border-cyan-400 bg-cyan-400 text-slate-950"
                      : "border-[var(--line)] bg-transparent text-transparent"
                  }`}
                >
                  ✓
                </motion.span>
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

      <p className="muted-text mt-4 text-center text-xs">Try it: tap a habit to check it off.</p>
    </div>
  );
}

/* --------------------------------- Footer --------------------------------- */

function Footer() {
  const [time, setTime] = useState("");

  // Live local clock (set after mount to avoid hydration mismatch)
  useEffect(() => {
    const tick = () =>
      setTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className="site-footer border-t px-5 py-14 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-3">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="font-display text-2xl font-bold">
              habit<span className="accent-text">flow</span>
            </Link>
            <p className="muted-text mt-4 max-w-xs text-sm leading-7">
              Build habits that actually stick. Made for progress, not perfection.
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

        <div className="muted-text mt-14 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--line)] pt-7 text-xs">
          <p>© 2026 Habitflow. All rights reserved.</p>
          <p aria-live="off">Your local time {time}</p>
        </div>
      </div>
    </footer>
  );
}

function FooterGroup({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <nav aria-label={title}>
      <h2 className="font-display text-sm font-bold">{title}</h2>
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