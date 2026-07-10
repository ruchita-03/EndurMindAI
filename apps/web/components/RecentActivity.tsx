export default function RecentActivity() {
  const activities = [
    "Uploaded DailyPnL.xlsx",
    "Indexed Endur Manual.pdf",
    "Generated SQL Query",
    "AI answered Instrument Fixing",
    "Knowledge Base updated",
  ];

  return (
    <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
      <h2 className="text-xl font-semibold mb-6">
        Recent Activity
      </h2>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity}
            className="bg-slate-800 p-3 rounded-lg"
          >
            {activity}
          </div>
        ))}
      </div>
    </div>
  );
}