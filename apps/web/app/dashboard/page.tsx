import DashboardLayout from "@/components/layout/DashboardLayout";
import KpiCard from "@/components/dashboard/KpiCard";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="grid grid-cols-4 gap-6">
        <KpiCard title="Today's PnL" value="₹12.4M" />
        <KpiCard title="Documents" value="245" />
        <KpiCard title="Knowledge" value="15,248" />
        <KpiCard title="AI Status" value="Healthy" />
      </div>
    </DashboardLayout>
  );
}