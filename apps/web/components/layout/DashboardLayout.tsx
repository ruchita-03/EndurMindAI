import Sidebar from "./Sidebar";
import Header from "./Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-slate-900 min-h-screen">
      <Sidebar />

      <div className="ml-72 flex-1">
        <Header />

        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}