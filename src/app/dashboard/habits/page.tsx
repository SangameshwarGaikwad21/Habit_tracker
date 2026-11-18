"use client";
import { useState } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "@/redux/hooks";
import { createHabit } from "@/redux/fetures/habit.slice";

export default function HabitsPage() {
  const dispatch = useAppDispatch();

  const { habits, isLoading, error, successMessage } =
    useAppSelector((state) => state.habit);

  const [title, setTitle] = useState("");
  const [showForm, setShowForm] = useState(false);

  const completed = habits.filter(
    (habit) => habit.status === "completed"
  ).length;

  const pending = habits.filter(
    (habit) => habit.status === "pending"
  ).length;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim()) return;

    try {
      await dispatch(createHabit({ title: title.trim() })).unwrap();
      setTitle("");
      setShowForm(false);
    } catch (err) {
      console.error("Failed to create habit:", err);
    }
  };

  return (
    <main className="min-h-screen bg-[#0B1220] p-5 text-white sm:p-8">
      <div className="mx-auto max-w-7xl space-y-8">

        {/* HEADER */}
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              My Habits
            </h1>
            <p className="mt-2 text-sm text-[#8296B2]">
              Build consistency, one habit at a time.
            </p>
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center justify-center gap-2 rounded-xl bg-[#35B9EF] px-5 py-3 text-sm font-semibold text-[#071421] transition hover:bg-[#64CCF5]"
          >
            <span className="text-xl">+</span>
            Add New Habit
          </button>
        </div>

        {/* STATISTICS */}
        <section className="grid gap-5 sm:grid-cols-3">

          <StatCard
            title="Total Habits"
            value={habits.length}
            icon="◈"
            accent="text-[#35B9EF]"
          />

          <StatCard
            title="Completed"
            value={completed}
            icon="✓"
            accent="text-emerald-400"
          />

          <StatCard
            title="Pending"
            value={pending}
            icon="◷"
            accent="text-amber-400"
          />

        </section>

        {/* ADD HABIT FORM */}
        {showForm && (
          <section className="rounded-2xl border border-[#26364C] bg-[#101C2D] p-6">
            <div className="mb-5">
              <h2 className="text-lg font-semibold">
                Create a New Habit
              </h2>
              <p className="mt-1 text-sm text-[#8296B2]">
                What do you want to improve today?
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <label
                htmlFor="habit-title"
                className="mb-2 block text-sm font-medium text-[#C2D0E0]"
              >
                Habit title
              </label>

              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  id="habit-title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Read books for 30 minutes"
                  maxLength={150}
                  required
                  className="min-w-0 flex-1 rounded-xl border border-[#293B52] bg-[#0B1220] px-4 py-3 text-sm text-white outline-none transition placeholder:text-[#63758D] focus:border-[#35B9EF] focus:ring-2 focus:ring-[#35B9EF]/10"
                />

                <button
                  type="submit"
                  disabled={isLoading || !title.trim()}
                  className="rounded-xl bg-[#35B9EF] px-6 py-3 text-sm font-semibold text-[#071421] transition hover:bg-[#64CCF5] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isLoading ? "Creating..." : "Create Habit"}
                </button>
              </div>

              {error && (
                <p role="alert" className="mt-3 text-sm text-red-400">
                  {error}
                </p>
              )}

              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setTitle("");
                }}
                className="mt-4 text-sm text-[#8296B2] transition hover:text-white"
              >
                Cancel
              </button>
            </form>
          </section>
        )}

        {successMessage && (
          <p role="status" className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-sm text-emerald-400">
            {successMessage}
          </p>
        )}

        {/* HABIT LIST HEADER */}
        <section>
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">
                All Habits
              </h2>
              <p className="mt-1 text-sm text-[#8296B2]">
                Track your daily activities.
              </p>
            </div>

            <span className="rounded-lg border border-[#26364C] bg-[#101C2D] px-3 py-2 text-xs text-[#8296B2]">
              {habits.length} Total
            </span>
          </div>

          {/* HABITS */}
          {habits.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#293B52] bg-[#101C2D] px-5 py-16 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#35B9EF]/10 text-3xl text-[#35B9EF]">
                +
              </div>

              <h3 className="text-lg font-semibold">
                No habits created yet
              </h3>

              <p className="mt-2 max-w-sm text-sm text-[#8296B2]">
                Start building better habits today.
                Create your first habit and track your progress.
              </p>

              <button
                onClick={() => setShowForm(true)}
                className="mt-6 rounded-xl bg-[#35B9EF] px-5 py-3 text-sm font-semibold text-[#071421] hover:bg-[#64CCF5]"
              >
                Create Your First Habit
              </button>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {habits.map((habit) => (
                <article
                  key={habit._id}
                  className="group rounded-2xl border border-[#26364C] bg-[#101C2D] p-5 transition hover:border-[#35B9EF]/50 hover:bg-[#122237]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#35B9EF]/10 text-xl text-[#35B9EF]">
                        ◈
                      </div>

                      <div className="min-w-0">
                        <h3 className="truncate font-semibold text-white">
                          {habit.title}
                        </h3>
                        <p className="mt-1 text-xs text-[#8296B2]">
                          {new Date(habit.date).toLocaleDateString(
                            "en-IN",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium ${
                        habit.status === "completed"
                          ? "bg-emerald-400/10 text-emerald-400"
                          : "bg-amber-400/10 text-amber-400"
                      }`}
                    >
                      {habit.status === "completed"
                        ? "Completed"
                        : "Pending"}
                    </span>
                  </div>

                  <div className="mt-5 border-t border-[#26364C] pt-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#8296B2]">
                        Habit status
                      </span>
                      <span className="font-medium text-[#35B9EF]">
                        {habit.status === "completed"
                          ? "Done for today"
                          : "Keep going"}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

      </div>
    </main>
  );
}

function StatCard({
  title,
  value,
  icon,
  accent,
}: {
  title: string;
  value: number;
  icon: string;
  accent: string;
}) {
  return (
    <div className="rounded-2xl border border-[#26364C] bg-[#101C2D] p-5 transition hover:border-[#35B9EF]/40">
      <div className="flex items-center justify-between">
        <p className="text-sm text-[#8296B2]">{title}</p>
        <span className={`text-2xl ${accent}`}>{icon}</span>
      </div>

      <h3 className="mt-4 text-3xl font-bold text-white">
        {value}
      </h3>
    </div>
  );
}
