type Props = {
  title: string;
  value: string;
};

export default function KpiCard({ title, value }: Props) {
  return (
    <div className="rounded-xl bg-slate-800 p-6 shadow-lg">
      <p className="text-gray-400">
        {title}
      </p>

      <h2 className="mt-4 text-3xl font-bold text-white">
        {value}
      </h2>
    </div>
  );
}