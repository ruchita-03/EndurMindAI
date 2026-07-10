import { LucideIcon } from "lucide-react";

interface Props {
  title: string;
  value: string;
  icon: LucideIcon;
  color: string;
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  color,
}: Props) {
  return (
    <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 shadow-lg hover:shadow-xl transition-all">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-slate-400 text-sm">{title}</p>

          <h2 className="text-3xl font-bold mt-3">{value}</h2>
        </div>

        <div className={`p-4 rounded-xl ${color}`}>
          <Icon size={30} />
        </div>
      </div>
    </div>
  );
}