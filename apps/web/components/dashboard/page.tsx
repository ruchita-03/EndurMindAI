"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="p-8">

        <h1 className="text-4xl font-bold text-white">
          EndurMind AI
        </h1>

        <p className="text-gray-400 mt-2">
          Enterprise AI Copilot for OpenLink Endur
        </p>

        <div className="grid grid-cols-4 gap-6 mt-10">

          <StatCard
            title="Documents"
            value="12"
            icon="📄"
          />

          <StatCard
            title="Excel Files"
            value="4"
            icon="📊"
          />

          <StatCard
            title="AI Chats"
            value="0"
            icon="🤖"
          />

          <StatCard
            title="SQL Queries"
            value="0"
            icon="🗄️"
          />

        </div>

        <div className="mt-10 bg-slate-900 rounded-xl p-8 border border-slate-700">

          <h2 className="text-2xl font-semibold text-white">
            Welcome to EndurMind AI
          </h2>

          <p className="text-gray-400 mt-4 leading-7">
            EndurMind AI is an enterprise assistant designed to help
            energy traders, analysts, and support engineers work with
            Endur documentation, market data, SQL queries, and PnL
            reports using AI.
          </p>

        </div>

      </div>
    </DashboardLayout>
  );
}