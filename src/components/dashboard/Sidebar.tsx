"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CheckCircle2,
  CalendarDays,
  ListTodo,
  Trophy,
  ChartNoAxesCombined,
  Settings,
  ChevronRight,
  Sparkles,
} from "lucide-react";

const navigation = [
  {
    title: "WORKSPACE",
    items: [
      {
        name: "Overview",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        name: "My Habits",
        href: "/dashboard/habits",
        icon: CheckCircle2,
      },
      {
        name: "My Routine",
        href: "/dashboard/routine",
        icon: CalendarDays,
      },
      {
        name: "My Tasks",
        href: "/dashboard/tasks",
        icon: ListTodo,
      },
    ],
  },
  {
    title: "GROWTH",
    items: [
      {
        name: "Challenges",
        href: "/dashboard/challenges",
        icon: Trophy,
      },
      {
        name: "Analytics",
        href: "/dashboard/analytics",
        icon: ChartNoAxesCombined,
      },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="flex min-h-screen w-64 shrink-0 flex-col border-r p-4"
      style={{
        backgroundColor: "var(--section-bg)",
        borderColor: "var(--border-color)",
        color: "var(--text-primary)",
      }}
    >
      {/* Brand */}
      <Link
        href="/dashboard"
        className="mb-10 flex items-center gap-3 px-2"
      >
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl text-xl font-bold"
          style={{
            backgroundColor: "var(--accent)",
            color: "var(--accent-contrast)",
          }}
        >
          H
        </div>

        <div>
          <h1 className="text-xl font-bold tracking-tight">
            habitflow
          </h1>
          <p
            className="text-xs"
            style={{ color: "var(--text-secondary)" }}
          >
            Build better habits
          </p>
        </div>
      </Link>

      {/* Navigation */}
      <nav className="flex-1 space-y-8">
        {navigation.map((group) => (
          <div key={group.title}>
            <p
              className="mb-3 px-3 text-[11px] font-bold tracking-[0.15em]"
              style={{ color: "var(--text-secondary)" }}
            >
              {group.title}
            </p>

            <ul className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;

                const isActive =
                  pathname === item.href ||
                  (item.href !== "/dashboard" &&
                    pathname.startsWith(item.href + "/"));

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      className="group flex items-center justify-between rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200"
                      style={{
                        backgroundColor: isActive
                          ? "var(--accent)"
                          : "transparent",
                        color: isActive
                          ? "var(--accent-contrast)"
                          : "var(--text-secondary)",
                      }}
                    >
                      <span className="flex items-center gap-3">
                        <Icon size={19} strokeWidth={2} />
                        {item.name}
                      </span>

                      {isActive && (
                        <ChevronRight size={16} />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Bottom section */}
      <div className="mt-8 space-y-4">
        <div
          className="rounded-2xl border p-4"
          style={{
            backgroundColor: "var(--card-bg)",
            borderColor: "var(--border-color)",
          }}
        >
          <Sparkles
            size={20}
            style={{ color: "var(--accent)" }}
          />

          <p className="mt-3 text-sm font-semibold">
            Small steps, big results.
          </p>

          <p
            className="mt-1 text-xs leading-5"
            style={{ color: "var(--text-secondary)" }}
          >
            Stay consistent and make every day count.
          </p>
        </div>

        <Link
          href="/dashboard/settings"
          className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors hover:bg-black/5 dark:hover:bg-white/5"
          style={{ color: "var(--text-secondary)" }}
        >
          <Settings size={19} />
          Settings
        </Link>

        <div
          className="flex items-center gap-3 border-t px-2 pt-4"
          style={{ borderColor: "var(--border-color)" }}
        >
          <div
            className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold"
            style={{
              backgroundColor: "var(--accent)",
              color: "var(--accent-contrast)",
            }}
          >
            H
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">
              My Workspace
            </p>
            <p
              className="text-xs"
              style={{ color: "var(--text-secondary)" }}
            >
              Personal account
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
