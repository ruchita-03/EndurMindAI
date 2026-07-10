"use client";

import { FileText, MessageSquare, Database, BarChart3 } from "lucide-react";

const cards = [
  {
    title: "Documents",
    value: "18",
    icon: FileText,
    color: "bg-blue-500",
  },
  {
    title: "AI Chats",
    value: "142",
    icon: MessageSquare,
    color: "bg-green-500",
  },
  {
    title: "Knowledge Chunks",
    value: "12,450",
    icon: Database,
    color: "bg-purple-500",
  },
  {
    title: "PnL Reports",
    value: "37",
    icon: BarChart3,
    color: "bg-orange-500",
  },
];

export default function DashboardCards() {
  return (
    <div className="grid grid-cols-4 gap-6">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-slate-900 rounded-xl p-6 shadow-lg"
        >
          <div className="flex justify-between">
            <div>
              <p className="text-gray-400">{card.title}</p>

              <h2 className="text-3xl font-bold mt-2">{card.value}</h2>
            </div>

            <div
              className={`${card.color} w-14 h-14 rounded-xl flex items-center justify-center`}
            >
              <card.icon />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}