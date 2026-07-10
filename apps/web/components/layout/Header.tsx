export default function Header() {
  return (
    <header className="h-20 border-b border-slate-800 bg-slate-950 flex items-center justify-between px-8">
      <div>
        <h2 className="text-2xl font-bold text-white">
          Dashboard
        </h2>

        <p className="text-gray-400">
          Welcome to EndurMind AI
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
          R
        </div>
      </div>
    </header>
  );
}