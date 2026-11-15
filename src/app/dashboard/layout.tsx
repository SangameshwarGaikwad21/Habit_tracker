
import { Sidebar } from "@/components/dashboard/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main
        className="min-w-0 flex-1 p-6"
        style={{
          backgroundColor: "var(--page-bg)",
          color: "var(--text-primary)",
        }}
      >
        {children}
      </main>
    </div>
  );
}
