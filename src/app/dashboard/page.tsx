"use client";

import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Sidebar } from "@/components/dashboard/Sidebar";


export default function LoggedInUserPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 p-6">
        <DashboardHeader />

        {/* Dashboard overview */}
        {/* Habit summary */}
        {/* Today's routine */}
        {/* Today's tasks */}
        {/* Progress analytics */}
      </main>
    </div>
  );
}