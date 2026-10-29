import Link from "next/link";

const features = [
  {
    number: "01",
    title: "Build better habits",
    description:
      "Create meaningful habits and build consistency through small, repeatable actions.",
    icon: "✓",
    color:
      "border-sky-400/20 bg-sky-400/10 text-sky-300 group-hover:border-sky-400/50 group-hover:bg-sky-400 group-hover:text-slate-950",
    glow: "hover:border-sky-400/40 hover:shadow-sky-500/10",
  },
  {
    number: "02",
    title: "Plan your routine",
    description:
      "Organize your day, structure your time, and create a routine that works for you.",
    icon: "◷",
    color:
      "border-violet-400/20 bg-violet-400/10 text-violet-300 group-hover:border-violet-400/50 group-hover:bg-violet-400 group-hover:text-white",
    glow: "hover:border-violet-400/40 hover:shadow-violet-500/10",
  },
  {
    number: "03",
    title: "Track your progress",
    description:
      "Understand your progress, review your consistency, and keep moving toward your goals.",
    icon: "↗",
    color:
      "border-emerald-400/20 bg-emerald-400/10 text-emerald-300 group-hover:border-emerald-400/50 group-hover:bg-emerald-400 group-hover:text-slate-950",
    glow: "hover:border-emerald-400/40 hover:shadow-emerald-500/10",
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
  return (
    <main className="min-h-screen overflow-x-clip bg-[#0b1220] text-slate-100">
      {/* Navbar */}
      <header className="sticky top-0 z-40 border-b border-white/[0.07] bg-[#0b1220]/90 backdrop-blur-xl">
        <nav
          aria-label="Main navigation"
          className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4 lg:px-8"
        >
          <Link href="/" className="flex shrink-0 items-center gap-2 sm:gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 text-lg font-bold text-white sm:h-10 sm:w-10 sm:text-xl">
              H
            </span>

            <span className="text-base font-semibold tracking-tight sm:text-lg">
              habit<span className="text-sky-400">flow</span>
            </span>
          </Link>

          <div className="hidden items-center gap-6 text-sm text-slate-300 md:flex lg:gap-8">
            <a href="#features" className="transition hover:text-sky-300">
              Features
            </a>
            <a
              href="#how-it-works"
              className="transition hover:text-sky-300"
            >
              How it works
            </a>
            <a href="#faq" className="transition hover:text-sky-300">
              FAQ
            </a>
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <Link
              href="/login"
              className="hidden rounded-lg px-2 py-2 text-sm text-slate-300 transition hover:text-white sm:inline-flex sm:px-3"
            >
              Sign in
            </Link>

            <Link
              href="/register"
              className="rounded-xl bg-sky-400 px-3 py-2.5 text-xs font-semibold text-slate-950 transition hover:bg-sky-300 sm:px-4 sm:text-sm"
            >
              Get started <span aria-hidden="true">↗</span>
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

        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:gap-12 sm:px-6 sm:py-20 md:py-24 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-28">
          <div className="min-w-0">
            <div className="mb-6 inline-flex max-w-full items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/[0.07] px-3 py-2 text-xs text-sky-300 sm:mb-7 sm:px-4 sm:text-sm">
              <span className="h-2 w-2 shrink-0 rounded-full bg-sky-400" />
              Your journey to consistency starts here
            </div>

            <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.08] tracking-[-0.045em] text-slate-100 min-[420px]:text-5xl sm:text-6xl lg:text-7xl">
              Build habits
              <br />
              that{" "}
              <span className="bg-gradient-to-r from-sky-400 via-sky-300 to-cyan-300 bg-clip-text text-transparent">
                actually stick.
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-slate-400 sm:mt-7 sm:text-lg sm:leading-8">
              Build routines that last, stay focused on what matters, and turn
              your everyday efforts into meaningful progress.
            </p>

            <div className="mt-7 flex flex-col gap-3 min-[480px]:flex-row min-[480px]:flex-wrap sm:mt-9 sm:gap-4">
              <Link
                href="/register"
                className="group inline-flex w-full items-center justify-center gap-3 rounded-xl bg-sky-400 px-5 py-3.5 font-semibold text-slate-950 shadow-lg shadow-sky-500/20 transition hover:-translate-y-0.5 hover:bg-sky-300 min-[480px]:w-auto sm:px-6"
              >
                Start your journey
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>

              <a
                href="#features"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.03] px-5 py-3.5 text-center font-medium text-slate-200 transition hover:border-white/30 hover:bg-white/[0.07] min-[480px]:w-auto sm:px-6"
              >
                Explore features
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3 text-sm text-slate-400 sm:mt-10 sm:gap-x-6">
              <span>✓ Habit tracking</span>
              <span>✓ Daily routines</span>
              <span>✓ Progress insights</span>
            </div>
          </div>

          {/* Product showcase — no demo user data */}
          <div className="relative mx-auto w-full min-w-0 max-w-xl">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-5 -z-10 rounded-full bg-sky-500/10 blur-3xl sm:-inset-8"
            />

            <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#101a2a] shadow-2xl shadow-black/30">
              <div className="flex items-start justify-between gap-3 border-b border-white/[0.07] px-4 py-4 sm:px-5 sm:py-5">
                <div className="min-w-0">
                  <p className="font-semibold text-white">
                    Your personal space
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-400">
                    Everything you need to keep growing.
                  </p>
                </div>

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-sky-400/20 bg-sky-400/10 text-sky-300 sm:h-10 sm:w-10">
                  ✦
                </div>
              </div>

              <div className="space-y-3 p-3 sm:space-y-4 sm:p-6">
                {/* Daily Habits */}
                <div className="group rounded-xl border border-sky-400/20 bg-gradient-to-br from-sky-400/10 via-blue-500/5 to-transparent p-4 transition-all duration-300 hover:-translate-y-1 hover:border-sky-400/60 hover:bg-sky-400/10 hover:shadow-lg hover:shadow-sky-500/10 sm:p-5">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-sky-400/20 bg-sky-400/10 text-xl text-sky-300 transition-all duration-300 group-hover:border-sky-400/50 group-hover:bg-sky-400 group-hover:text-slate-950 group-hover:shadow-lg group-hover:shadow-sky-400/30 sm:h-12 sm:w-12">
                      ✓
                    </div>
                    <div className="min-w-0">
                      <h2 className="font-semibold text-white transition-colors duration-300 group-hover:text-sky-300">
                        Daily habits
                      </h2>
                      <p className="mt-1 text-sm leading-6 text-slate-400 transition-colors duration-300 group-hover:text-slate-200">
                        Build consistency, one action at a time.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Personal Routines */}
                <div className="group rounded-xl border border-violet-400/20 bg-gradient-to-br from-violet-400/10 via-indigo-500/5 to-transparent p-4 transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/60 hover:bg-violet-400/10 hover:shadow-lg hover:shadow-violet-500/10 sm:p-5">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-400/10 text-xl text-violet-300 transition-all duration-300 group-hover:border-violet-400/50 group-hover:bg-violet-400 group-hover:text-white group-hover:shadow-lg group-hover:shadow-violet-400/30 sm:h-12 sm:w-12">
                      ◷
                    </div>
                    <div className="min-w-0">
                      <h2 className="font-semibold text-white transition-colors duration-300 group-hover:text-violet-300">
                        Personal routines
                      </h2>
                      <p className="mt-1 text-sm leading-6 text-slate-400 transition-colors duration-300 group-hover:text-slate-200">
                        Structure your day around what matters.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Challenges and Growth */}
                <div className="group rounded-xl border border-emerald-400/20 bg-gradient-to-br from-emerald-400/10 via-teal-500/5 to-transparent p-4 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/60 hover:bg-emerald-400/10 hover:shadow-lg hover:shadow-emerald-500/10 sm:p-5">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/10 text-xl text-emerald-300 transition-all duration-300 group-hover:border-emerald-400/50 group-hover:bg-emerald-400 group-hover:text-slate-950 group-hover:shadow-lg group-hover:shadow-emerald-400/30 sm:h-12 sm:w-12">
                      ↗
                    </div>
                    <div className="min-w-0">
                      <h2 className="font-semibold text-white transition-colors duration-300 group-hover:text-emerald-300">
                        Challenges and growth
                      </h2>
                      <p className="mt-1 text-sm leading-6 text-slate-400 transition-colors duration-300 group-hover:text-slate-200">
                        Set goals and work toward meaningful progress.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Motivational Message */}
                <div className="group relative overflow-hidden rounded-xl border border-amber-400/20 bg-gradient-to-r from-amber-400/10 via-orange-400/10 to-rose-400/10 p-4 transition-all duration-300 hover:border-amber-400/50 hover:shadow-lg hover:shadow-amber-500/10">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-r from-amber-400/0 via-amber-300/5 to-rose-400/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                  <p className="relative text-center text-sm leading-6 text-amber-200 transition-colors duration-300 group-hover:text-amber-100">
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
      <section
        id="features"
        className="scroll-mt-24 border-t border-white/[0.07]"
      >
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-400">
              Features
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
              Make consistency your superpower.
            </h2>

            <p className="mt-5 leading-7 text-slate-400">
              Simple tools to help you focus on your goals, build momentum,
              and keep moving forward.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-14 sm:gap-5 md:grid-cols-3">
            {features.map((feature) => (
              <article
                key={feature.number}
                className={`group rounded-2xl border bg-white/[0.025] p-5 shadow-lg transition duration-300 hover:-translate-y-1 sm:p-7 ${feature.glow}`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-xl border text-xl transition-all duration-300 ${feature.color}`}
                  >
                    {feature.icon}
                  </span>
                  <span className="font-mono text-sm text-slate-600">
                    {feature.number}
                  </span>
                </div>

                <h3 className="mt-6 text-xl font-semibold text-white">
                  {feature.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-400">
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
        className="scroll-mt-24 border-t border-white/[0.07] bg-[#0d1727]"
      >
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-400">
              How it works
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
              Three steps to a better routine.
            </h2>
          </div>

          <ol className="mt-10 grid grid-cols-1 gap-8 sm:mt-14 sm:gap-10 md:grid-cols-3">
            {steps.map((step) => (
              <li key={step.number}>
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-sky-400/30 bg-sky-400/10 font-mono text-sky-300">
                  {step.number}
                </span>

                <h3 className="mt-5 text-xl font-semibold text-white sm:mt-6">
                  {step.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-400">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section
        id="faq"
        className="scroll-mt-24 border-t border-white/[0.07]"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1fr_1.6fr] lg:gap-12 lg:px-8 lg:py-24">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Questions, answered.
            </h2>
            <p className="mt-4 max-w-sm leading-7 text-slate-400">
              Everything you need to know before starting your first habit.
            </p>
          </div>

          <div className="divide-y divide-white/[0.08] rounded-2xl border border-white/[0.08] bg-white/[0.02]">
            {faqs.map((faq) => (
              <details key={faq.question} className="group px-4 py-5 sm:px-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-white [&::-webkit-details-marker]:hidden">
                  <span>{faq.question}</span>
                  <span className="shrink-0 text-xl text-sky-300 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>

                <p className="mt-3 max-w-xl leading-7 text-slate-400">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="px-4 pb-14 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-sky-400/20 bg-gradient-to-br from-[#122a43] via-[#102035] to-[#11152d] px-5 py-10 text-center sm:px-8 sm:py-14 lg:px-12 lg:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-sky-400/10 blur-3xl"
          />

          <div className="relative">
            <p className="text-sm font-medium text-sky-300">
              Your next chapter starts today
            </p>

            <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-bold tracking-tight sm:text-5xl">
              Become who you want to be, one habit at a time.
            </h2>

            <p className="mx-auto mt-5 max-w-xl leading-7 text-slate-400">
              Start small. Stay consistent. Let your progress speak for itself.
            </p>

            <Link
              href="/register"
              className="mt-8 inline-flex w-full items-center justify-center gap-3 rounded-xl bg-sky-400 px-6 py-3.5 font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-sky-300 sm:w-auto sm:px-7"
            >
              Create your account <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.07]">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          <div className="grid grid-cols-2 gap-8 sm:gap-10 lg:grid-cols-3">
            <div className="col-span-2 lg:col-span-1">
              <Link href="/" className="font-semibold text-white">
                habit<span className="text-sky-400">flow</span>
              </Link>

              <p className="mt-3 max-w-xs text-sm leading-6 text-slate-400">
                Build habits that actually stick. Made for progress, not
                perfection.
              </p>
            </div>

            {footerGroups.map((group) => (
              <nav key={group.title} aria-label={group.title}>
                <h2 className="text-sm font-semibold text-slate-200">
                  {group.title}
                </h2>

                <ul className="mt-4 space-y-3 text-sm text-slate-400">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="transition hover:text-sky-300"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          <p className="mt-8 border-t border-white/[0.07] pt-6 text-xs text-slate-500 sm:mt-10">
            © 2026 Habit Tracker. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
