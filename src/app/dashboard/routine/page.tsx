
"use client";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import {
  addRoutine,
  addRoutineActivity,
  updateRoutineActivity,
  removeRoutineActivity,
  clearRoutineMessages,
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setActivity({
      ...activity,
      [e.target.name]: e.target.value,
    });
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

  const handleSubmit = (e: React.FormEvent) => {
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

  const handleSaveRoutine = async () => {
    if (routine.length === 0) {
      setFormError("Please add at least one routine activity.");
      return;
    }

    const result = await dispatch(addRoutine({ routine }));

    if (addRoutine.fulfilled.match(result)) {
      dispatch(clearRoutineMessages());
    }
  };

  return (
    <main className="min-h-screen bg-[#0B1220] p-4 text-white sm:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl space-y-8">

        {/* Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-medium text-cyan-400">
              DAILY PLANNER
            </p>

            <h1 className="mt-2 text-3xl font-bold">
              My Routine
            </h1>

            <p className="mt-2 text-sm text-slate-400">
              Create and manage your daily activities.
            </p>
          </div>

          <button
            onClick={handleSaveRoutine}
            disabled={isLoading || routine.length === 0}
            className="rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-[#07111F] transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? "Saving..." : "Save Routine"}
          </button>
        </div>

        {/* Total Activities */}
        <div className="rounded-2xl border border-slate-700 bg-[#101C2D] p-5">
          <p className="text-sm text-slate-400">
            Total Routine Activities
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {routine.length}
          </h2>
        </div>

        {/* Messages */}
        {(formError || error || successMessage) && (
          <div
            className={`rounded-xl border p-4 text-sm ${
              formError || error
                ? "border-red-500/30 bg-red-500/10 text-red-400"
                : "border-green-500/30 bg-green-500/10 text-green-400"
            }`}
          >
            {formError || error || successMessage}
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[350px_1fr]">

          {/* Add Routine Form */}
          <section className="h-fit rounded-2xl border border-slate-700 bg-[#101C2D] p-6">
            <h2 className="text-xl font-semibold">
              {editingIndex !== null ? "Edit Activity" : "Add Routine"}
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              Add an activity and choose its duration.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">

              {/* Activity Name */}
              <div>
                <label className="mb-2 block text-sm text-slate-300">
                  Activity Name
                </label>

                <input
                  type="text"
                  name="title"
                  value={activity.title}
                  onChange={handleChange}
                  placeholder="e.g. Study DSA, Gym, Reading..."
                  className="w-full rounded-xl border border-slate-700 bg-[#0B1220] px-4 py-3 text-sm outline-none focus:border-cyan-400"
                />
              </div>

              {/* Start Time */}
              <div>
                <label className="mb-2 block text-sm text-slate-300">
                  Start Time
                </label>

                <input
                  type="time"
                  name="startTime"
                  value={activity.startTime}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-700 bg-[#0B1220] px-4 py-3 text-sm text-white outline-none focus:border-cyan-400"
                />
              </div>

              {/* End Time */}
              <div>
                <label className="mb-2 block text-sm text-slate-300">
                  End Time
                </label>

                <input
                  type="time"
                  name="endTime"
                  value={activity.endTime}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-700 bg-[#0B1220] px-4 py-3 text-sm text-white outline-none focus:border-cyan-400"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-cyan-500 py-3 font-semibold text-[#07111F] transition hover:bg-cyan-400"
              >
                {editingIndex !== null
                  ? "Update Activity"
                  : "+ Add Activity"}
              </button>

              {editingIndex !== null && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="w-full rounded-xl border border-slate-700 py-3 text-sm text-slate-300 hover:bg-slate-800"
                >
                  Cancel
                </button>
              )}
            </form>
          </section>

          {/* Routine List */}
          <section className="rounded-2xl border border-slate-700 bg-[#101C2D] p-6">

            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">
                  My Daily Activities
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  Your personal daily schedule.
                </p>
              </div>

              <span className="rounded-lg bg-cyan-400/10 px-3 py-2 text-xs text-cyan-400">
                {routine.length} Activities
              </span>
            </div>

            {routine.length === 0 ? (
              <div className="flex min-h-64 flex-col items-center justify-center text-center">
                <span className="text-5xl">📋</span>

                <h3 className="mt-4 text-lg font-semibold">
                  No Routine Added
                </h3>

                <p className="mt-2 text-sm text-slate-400">
                  Start by adding your first daily activity.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {routine.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col justify-between gap-4 rounded-xl border border-slate-700 bg-[#0B1220] p-4 sm:flex-row sm:items-center"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10 text-lg">
                        🕒
                      </span>

                      <div className="min-w-0">
                        <p className="break-words font-medium">
                          {item.title}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          {formatTime(item.startTime)} – {formatTime(item.endTime)}
                        </p>
                      </div>
                    </div>

                    <div className="flex shrink-0 gap-2">
                      <button
                        onClick={() => handleEdit(index)}
                        className="rounded-lg border border-slate-700 px-3 py-2 text-xs text-cyan-400 hover:bg-cyan-400/10"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(index)}
                        className="rounded-lg border border-slate-700 px-3 py-2 text-xs text-red-400 hover:bg-red-400/10"
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
