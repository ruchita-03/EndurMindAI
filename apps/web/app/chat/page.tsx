export default function ChatPage() {
  return (
    <div className="h-[80vh] bg-slate-900 rounded-xl p-6">

      <h1 className="text-3xl font-bold">
        AI Assistant
      </h1>

      <div className="mt-8 h-[500px] bg-slate-800 rounded-xl p-5">

        <div className="bg-blue-500 p-4 rounded-xl w-fit">

          Explain Instrument Fixing.

        </div>

        <div className="bg-slate-700 mt-6 p-4 rounded-xl">

          Instrument fixing refers to...

          (This response will come from GPT + Endur documents.)

        </div>

      </div>

    </div>
  );
}
