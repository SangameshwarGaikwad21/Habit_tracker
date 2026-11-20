
"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import {
  addRoutine,
  addRoutineActivity,
  updateRoutineActivity,
  removeRoutineActivity,
  clearRoutineMessages,
  setRoutine,
} from "@/redux/fetures/routine.slice";

import type { RoutineActivity } from "@/types/routine";

const emptyActivity: RoutineActivity = {
  title: "",
  startTime: "",
  endTime: "",
};

export default function RoutinePage() {
  const dispatch = useAppDispatch();

  const { routine, isLoading, error, successMessage } =
    useAppSelector((state) => state.routine);

  const [activity, setActivity] =
    useState<RoutineActivity>(emptyActivity);

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [formError, setFormError] = useState("");
  const [isHydrated, setIsHydrated] = useState(false);

  // Restore routine from Local Storage
  useEffect(() => {
    try {
      const savedRoutine = localStorage.getItem("routine");

      if (savedRoutine) {
        const parsedRoutine: unknown = JSON.parse(savedRoutine);

        if (
          Array.isArray(parsedRoutine) &&
          parsedRoutine.every(
            (item) =>
              item &&
              typeof item.title === "string" &&
              typeof item.startTime === "string" &&
              typeof item.endTime === "string"
          )
        ) {
          dispatch(setRoutine(parsedRoutine));
        }
      }
    } catch (error) {
      console.error("Failed to load routine:", error);
    } finally {
      setIsHydrated(true);
    }
  }, [dispatch]);

  // Persist every Redux routine change
  useEffect(() => {
    if (!isHydrated) return;

    try {
      localStorage.setItem("routine", JSON.stringify(routine));
    } catch (error) {
      console.error("Failed to save routine:", error);
    }
  }, [routine, isHydrated]);

  const cardClass =
    "rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] p-6";

  const inputClass =
    "w-full rounded-xl border border-[var(--border-color)] bg-[var(--input-bg)] px-4 py-3 text-sm text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-secondary)] focus:border-[var(--accent)]";

  const primaryButton =
    "w-full rounded-xl bg-[var(--accent)] py-3 font-semibold text-[var(--accent-contrast)] transition hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-50";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setActivity((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));
  };

  const resetForm = () => {
    setActivity(emptyActivity);
    setEditingIndex(null);
    setFormError("");
  };

  const formatTime = (time: string) => {
    if (!time) return "";

    const [hours, minutes] = time.split(":").map(Number);
    const date = new Date();

    date.setHours(hours, minutes, 0, 0);

    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !activity.title.trim() ||
      !activity.startTime ||
      !activity.endTime
    ) {
      setFormError("Please fill in all fields.");
      return;
    }

    if (activity.startTime === activity.endTime) {
      setFormError("Start time and end time cannot be the same.");
      return;
    }

    const newActivity: RoutineActivity = {
      title: activity.title.trim(),
      startTime: activity.startTime,
      endTime: activity.endTime,
    };

    if (editingIndex !== null) {
      dispatch(
        updateRoutineActivity({
          index: editingIndex,
          activity: newActivity,
        })
      );
    } else {
      dispatch(addRoutineActivity(newActivity));
    }

    resetForm();
    dispatch(clearRoutineMessages());
  };

  const handleEdit = (index: number) => {
    setActivity({ ...routine[index] });
    setEditingIndex(index);
    setFormError("");
  };

  const handleDelete = (index: number) => {
    dispatch(removeRoutineActivity(index));

    if (editingIndex === index) {
      resetForm();
    } else if (editingIndex !== null && editingIndex > index) {
      setEditingIndex(editingIndex - 1);
    }
  };

  // Save complete routine to MongoDB
  const handleSaveRoutine = async () => {
  setFormError("");
  dispatch(clearRoutineMessages());

  if (routine.length === 0) {
    setFormError("Please add at least one routine activity.");
    return;
  }

  try {
    await dispatch(addRoutine({ routine })).unwrap();

    // Do not clear messages here.
    // Redux will display the success message.
  } catch (error) {
    console.error("Failed to save routine:", error);
  }
};

  if (!isHydrated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[var(--page-bg)] text-[var(--text-primary)]">
        <p className="text-sm text-[var(--text-secondary)]">
          Loading your routine...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--page-bg)] p-4 text-[var(--text-primary)] sm:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl space-y-8">

        {/* HEADER */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-medium text-[var(--accent)]">
              DAILY PLANNER
            </p>

            <h1 className="mt-2 text-3xl font-bold">
              My Routine
            </h1>

            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              Create and manage your daily activities.
            </p>
          </div>

         <button
            type="button"
            onClick={handleSaveRoutine}
            disabled={isLoading || routine.length === 0}
            className="inline-flex w-auto items-center justify-center rounded-xl bg-[var(--accent)] px-6 py-3 font-semibold text-[var(--accent-contrast)] transition hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Saving...
              </>
            ) : (
              "Save Routine"
            )}
          </button>
        </div>

        {/* TOTAL ACTIVITIES */}
        <div className={cardClass}>
          <p className="text-sm text-[var(--text-secondary)]">
            Total Routine Activities
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {routine.length}
          </h2>
        </div>

        {/* MESSAGES */}
        {(formError || error || successMessage) && (
          <div
            className={`rounded-xl border p-4 text-sm ${
              formError || error
                ? "border-red-500/30 bg-red-500/10 text-red-500"
                : "border-emerald-500/30 bg-emerald-500/10 text-emerald-500"
            }`}
          >
            {formError || error || successMessage}
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[350px_1fr]">

          {/* ADD ROUTINE FORM */}
          <section className={`${cardClass} h-fit`}>
            <h2 className="text-xl font-semibold">
              {editingIndex !== null ? "Edit Activity" : "Add Routine"}
            </h2>

            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              Add an activity and choose its duration.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Activity Name
                </label>

                <input
                  type="text"
                  name="title"
                  value={activity.title}
                  onChange={handleChange}
                  placeholder="e.g. Study DSA, Gym, Reading..."
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Start Time
                </label>

                <input
                  type="time"
                  name="startTime"
                  value={activity.startTime}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  End Time
                </label>

                <input
                  type="time"
                  name="endTime"
                  value={activity.endTime}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <button type="submit" className={primaryButton}>
                {editingIndex !== null
                  ? "Update Activity"
                  : "+ Add Activity"}
              </button>

              {editingIndex !== null && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="w-full rounded-xl border border-[var(--border-color)] py-3 text-sm text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
                >
                  Cancel
                </button>
              )}
            </form>
          </section>

          {/* ROUTINE LIST */}
          <section className={cardClass}>
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">
                  My Daily Activities
                </h2>

                <p className="mt-1 text-sm text-[var(--text-secondary)]">
                  Your personal daily schedule.
                </p>
              </div>

              <span className="rounded-lg bg-[var(--accent)]/10 px-3 py-2 text-xs text-[var(--accent)]">
                {routine.length} Activities
              </span>
            </div>

            {routine.length === 0 ? (
              <div className="flex min-h-64 flex-col items-center justify-center text-center">
                <span className="text-5xl">📋</span>

                <h3 className="mt-4 text-lg font-semibold">
                  No Routine Added
                </h3>

                <p className="mt-2 text-sm text-[var(--text-secondary)]">
                  Start by adding your first daily activity.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {routine.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col justify-between gap-4 rounded-xl border border-[var(--border-color)] bg-[var(--input-bg)] p-4 sm:flex-row sm:items-center"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--accent)]/10 text-lg text-[var(--accent)]">
                        🕒
                      </span>

                      <div className="min-w-0">
                        <p className="break-words font-medium">
                          {item.title}
                        </p>

                        <p className="mt-1 text-xs text-[var(--text-secondary)]">
                          {formatTime(item.startTime)} – {formatTime(item.endTime)}
                        </p>
                      </div>
                    </div>

                    <div className="flex shrink-0 gap-2">
                      <button
                        onClick={() => handleEdit(index)}
                        className="rounded-lg border border-[var(--border-color)] px-3 py-2 text-xs text-[var(--accent)] transition hover:bg-[var(--accent)]/10"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(index)}
                        className="rounded-lg border border-red-500/20 px-3 py-2 text-xs text-red-500 transition hover:bg-red-500/10"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
