import { ReactNode } from "react";

interface TableProps {
  children: ReactNode;
}

export default function Table({ children }: TableProps) {
  return (
    <div className="overflow-auto rounded-xl border border-slate-800">
      <table className="min-w-full">
        {children}
      </table>
    </div>
  );
}