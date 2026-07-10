"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/ui/PageHeader";

export default function ExcelPage() {
  return (
    <DashboardLayout>
      <div className="p-8">
        <PageHeader
          title="Excel Intelligence"
          subtitle="Analyze uploaded Excel workbooks and PnL reports."
        />
      </div>
    </DashboardLayout>
  );
}