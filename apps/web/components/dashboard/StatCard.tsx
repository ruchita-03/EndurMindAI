interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
}

export default function StatCard({
  title,
  value,
  icon,
}: StatCardProps) {
  return (
    <div className="bg-slate-900 rounded-xl p-6 shadow-lg border border-slate-700">
      <div className="text-4xl">{icon}</div>

      <h3 className="text-gray-400 mt-3 text-sm">
        {title}
      </h3>

      <p className="text-white text-3xl font-bold mt-2">
        {value}
      </p>
    </div>
  );
}