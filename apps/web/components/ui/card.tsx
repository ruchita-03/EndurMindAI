interface CardProps {
  title?: string;
  children: React.ReactNode;
}

export default function Card({
  title,
  children,
}: CardProps) {
  return (
    <div className="bg-slate-900 rounded-xl border border-slate-700 p-6">
      {title && (
        <h2 className="text-xl font-semibold text-white mb-4">
          {title}
        </h2>
      )}

      {children}
    </div>
  );
}