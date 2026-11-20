
"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import {
  createHabit,
  fetchHabits,
  updateHabit,
  deleteHabit,
  clearHabitMessages,
} from "@/redux/fetures/habit.slice";

export default function HabitsPage() {
  const dispatch = useAppDispatch();

  const {
    habits,
    isLoading,
    isFetching,
    isUpdating,
    deletingHabitId,
    error,
    successMessage,
  } = useAppSelector((state) => state.habit);

  const [title, setTitle] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState("");

  useEffect(() => {
    dispatch(fetchHabits());
  }, [dispatch]);

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

  const handleEdit = (id: string, currentTitle: string) => {
    dispatch(clearHabitMessages());
    setEditingId(id);
    setEditingTitle(currentTitle);
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!editingId || !editingTitle.trim()) return;

    try {
      await dispatch(
        updateHabit({
          id: editingId,
          title: editingTitle.trim(),
        })
      ).unwrap();

      setEditingId(null);
      setEditingTitle("");
    } catch (err) {
      console.error("Failed to update habit:", err);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this habit?"
    );

    if (!confirmed) return;

    try {
      await dispatch(deleteHabit({ id })).unwrap();
    } catch (err) {
      console.error("Failed to delete habit:", err);
    }
  };

  const cardClass =
    "rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] p-5";

  const inputClass =
    "w-full rounded-xl border border-[var(--border-color)] bg-[var(--input-bg)] px-4 py-3 text-sm text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-secondary)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/10";

  const primaryButton =
    "rounded-xl bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[var(--accent-contrast)] transition hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <main className="min-h-screen bg-[var(--page-bg)] p-5 text-[var(--text-primary)] sm:p-8">
      <div className="mx-auto max-w-7xl space-y-8">

        {/* HEADER */}
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-medium text-[var(--accent)]">
              HABIT MANAGEMENT
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight">
              My Habits
            </h1>

            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              Build consistency, one habit at a time.
            </p>
          </div>

          <button
            onClick={() => {
              dispatch(clearHabitMessages());
              setShowForm(!showForm);
              setEditingId(null);
            }}
            className={primaryButton}
          >
            + Add New Habit
          </button>
        </div>

        {/* STATISTICS */}
        <section className="grid gap-5 sm:grid-cols-3">
          <StatCard title="Total Habits" value={habits.length} icon="◈" />
          <StatCard title="Completed" value={completed} icon="✓" />
          <StatCard title="Pending" value={pending} icon="◷" />
        </section>

        {/* MESSAGES */}
        {error && (
          <div
            role="alert"
            className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-500"
          >
            {error}
          </div>
        )}

        {successMessage && (
          <div
            role="status"
            className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-500"
          >
            ✓ {successMessage}
          </div>
        )}

        {/* ADD HABIT FORM */}
        {showForm && (
          <section className={`${cardClass} p-6`}>
            <h2 className="text-lg font-semibold">
              Create a New Habit
            </h2>

            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              What do you want to improve today?
            </p>

            <form onSubmit={handleSubmit} className="mt-5">
              <label
                htmlFor="habit-title"
                className="mb-2 block text-sm font-medium"
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
                  className={inputClass}
                />

                <button
                  type="submit"
                  disabled={isLoading || !title.trim()}
                  className={primaryButton}
                >
                  {isLoading ? "Creating..." : "Create Habit"}
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setTitle("");
                  dispatch(clearHabitMessages());
                }}
                className="mt-4 text-sm text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
              >
                Cancel
              </button>
            </form>
          </section>
        )}

        {/* HABIT LIST */}
        <section>
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">All Habits</h2>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                Track your daily activities.
              </p>
            </div>

            <span className="rounded-lg border border-[var(--border-color)] bg-[var(--card-bg)] px-3 py-2 text-xs text-[var(--text-secondary)]">
              {habits.length} Total
            </span>
          </div>

          {isFetching ? (
            <div className={`${cardClass} py-16 text-center`}>
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[var(--accent)]/30 border-t-[var(--accent)]" />

              <p className="mt-4 text-sm text-[var(--text-secondary)]">
                Loading your habits...
              </p>
            </div>
          ) : habits.length === 0 ? (
            <div className={`${cardClass} flex flex-col items-center justify-center border-dashed px-5 py-16 text-center`}>
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--accent)]/10 text-3xl text-[var(--accent)]">
                +
              </div>

              <h3 className="text-lg font-semibold">
                No habits created yet
              </h3>

              <p className="mt-2 max-w-sm text-sm text-[var(--text-secondary)]">
                Start building better habits today. Create your first habit and track your progress.
              </p>

              <button
                onClick={() => setShowForm(true)}
                className={`${primaryButton} mt-6`}
              >
                Create Your First Habit
              </button>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {habits.map((habit) => (
                <article
                  key={habit._id}
                  className={`${cardClass} transition hover:border-[var(--accent)]/50`}
                >
                  {editingId === habit._id ? (
                    <form onSubmit={handleUpdate}>
                      <h3 className="mb-4 font-semibold">Edit Habit</h3>

                      <input
                        type="text"
                        value={editingTitle}
                        onChange={(e) => setEditingTitle(e.target.value)}
                        maxLength={150}
                        required
                        autoFocus
                        className={inputClass}
                      />

                      <div className="mt-4 flex gap-2">
                        <button
                          type="submit"
                          disabled={isUpdating || !editingTitle.trim()}
                          className={`${primaryButton} flex-1`}
                        >
                          {isUpdating ? "Saving..." : "Save Changes"}
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setEditingId(null);
                            setEditingTitle("");
                          }}
                          className="rounded-lg border border-[var(--border-color)] px-4 py-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--accent)]/10 text-xl text-[var(--accent)]">
                            ◈
                          </div>

                          <div className="min-w-0">
                            <h3 className="truncate font-semibold">
                              {habit.title}
                            </h3>

                            <p className="mt-1 text-xs text-[var(--text-secondary)]">
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
                              ? "bg-emerald-500/10 text-emerald-500"
                              : "bg-amber-500/10 text-amber-500"
                          }`}
                        >
                          {habit.status === "completed"
                            ? "Completed"
                            : "Pending"}
                        </span>
                      </div>

                      <div className="mt-5 border-t border-[var(--border-color)] pt-4">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-[var(--text-secondary)]">
                            Habit status
                          </span>

                          <span className="font-medium text-[var(--accent)]">
                            {habit.status === "completed"
                              ? "Done for today"
                              : "Keep going"}
                          </span>
                        </div>
                      </div>

                      <div className="mt-5 flex justify-end gap-3 border-t border-[var(--border-color)] pt-4">
                        <button
                          onClick={() =>
                            handleEdit(habit._id, habit.title)
                          }
                          className="rounded-lg border border-[var(--border-color)] px-4 py-2 text-sm font-medium text-[var(--accent)] transition hover:bg-[var(--accent)]/10"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(habit._id)}
                          disabled={deletingHabitId === habit._id}
                          className="rounded-lg border border-red-500/20 px-4 py-2 text-sm font-medium text-red-500 transition hover:bg-red-500/10 disabled:opacity-50"
                        >
                          {deletingHabitId === habit._id
                            ? "Deleting..."
                            : "Delete"}
                        </button>
                      </div>
                    </>
                  )}
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
}: {
  title: string;
  value: number;
  icon: string;
}) {
  return (
    <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] p-5 transition hover:border-[var(--accent)]/40">
      <div className="flex items-center justify-between">
        <p className="text-sm text-[var(--text-secondary)]">{title}</p>
        <span className="text-2xl text-[var(--accent)]">{icon}</span>
      </div>

      <h3 className="mt-4 text-3xl font-bold text-[var(--text-primary)]">
        {value}
      </h3>
    </div>
  );
}
