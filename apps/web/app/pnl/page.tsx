"use client";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const pnlData = [
  { day: "Mon", pnl: 12000 },
  { day: "Tue", pnl: 18000 },
  { day: "Wed", pnl: 9000 },
  { day: "Thu", pnl: 26000 },
  { day: "Fri", pnl: 22000 },
];

const deskData = [
  { name: "Gas", value: 35 },
  { name: "Power", value: 25 },
  { name: "Oil", value: 20 },
  { name: "LNG", value: 20 },
];

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"];

export default function PnlPage() {
  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold">
          PnL Intelligence
        </h1>

        <p className="text-slate-400 mt-2">
          AI-powered Profit & Loss Analytics
        </p>
      </div>

      <div className="grid grid-cols-4 gap-6">

        <div className="bg-slate-900 rounded-xl p-6">
          <h3 className="text-slate-400">Today's PnL</h3>
          <h1 className="text-4xl font-bold text-green-500">
            $2.43M
          </h1>
        </div>

        <div className="bg-slate-900 rounded-xl p-6">
          <h3 className="text-slate-400">Trades</h3>
          <h1 className="text-4xl font-bold">
            1,245
          </h1>
        </div>

        <div className="bg-slate-900 rounded-xl p-6">
          <h3 className="text-slate-400">Risk</h3>
          <h1 className="text-4xl font-bold text-yellow-500">
            Medium
          </h1>
        </div>

        <div className="bg-slate-900 rounded-xl p-6">
          <h3 className="text-slate-400">Anomalies</h3>
          <h1 className="text-4xl font-bold text-red-500">
            3
          </h1>
        </div>

      </div>

      <div className="grid grid-cols-2 gap-8">

        <div className="bg-slate-900 rounded-xl p-6">

          <h2 className="text-xl font-bold mb-4">
            Weekly PnL Trend
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={pnlData}>
              <CartesianGrid stroke="#374151" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="pnl"
                stroke="#3B82F6"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>

        </div>

        <div className="bg-slate-900 rounded-xl p-6">

          <h2 className="text-xl font-bold mb-4">
            Commodity Split
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>

              <Pie
                data={deskData}
                dataKey="value"
                outerRadius={110}
                label
              >
                {deskData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index]}
                  />
                ))}
              </Pie>

            </PieChart>
          </ResponsiveContainer>

        </div>

      </div>

      <div className="bg-slate-900 rounded-xl p-6">

        <h2 className="text-2xl font-bold mb-6">
          AI Insights
        </h2>

        <div className="space-y-4">

          <div className="bg-slate-800 p-4 rounded-lg">
            📈 Oil desk generated the highest profit today.
          </div>

          <div className="bg-slate-800 p-4 rounded-lg">
            ⚠️ Gas desk PnL dropped by 12% compared to yesterday.
          </div>

          <div className="bg-slate-800 p-4 rounded-lg">
            🤖 AI detected unusual price movement in LNG contracts.
          </div>

        </div>

      </div>

    </div>
  );
}