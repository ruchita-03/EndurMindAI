"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/card";

interface AnalysisData {
  filename: string;
  file_size_kb: number;
  sheet_count: number;
  sheet_names: string[];
  rows: number;
  columns: number;
  missing_values: number;
  duplicate_rows: number;
  preview: any[];
}

export default function ExcelPage() {
  const [data, setData] = useState<AnalysisData | null>(null);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<string[]>([]);
const [question, setQuestion] = useState("");
const [answer, setAnswer] = useState("");
const [asking, setAsking] = useState(false);

  useEffect(() => {
    fetchAnalysis();
  }, []);


  async function fetchAnalysis() {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/analysis/excel"
      );

      const json = await response.json();

      if (json.success) {
        setData(json);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function analyzeWorkbook() {
    setAnalyzing(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/ai/analyze",
        {
          method: "POST",
        }
      );

      const json = await response.json();

      if (json.success) {
        setAnalysis(json.analysis);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setAnalyzing(false);
    }
  }
  async function askAI() {

if (!question.trim()) return;

  setAsking(true);

  try {

    const response = await fetch(
      "http://127.0.0.1:8000/ai/chat",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          question
        })
      }
    );

    const json = await response.json();

    if (json.success) {
      setAnswer(json.answer);
    }

  } catch (error) {
    console.error(error);
  }

  setAsking(false);
}

  if (loading) {
    return (
      <DashboardLayout>
        <div className="max-w-7xl mx-auto p-8 text-white">
          Loading workbook...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto p-8">

        <PageHeader
          title="Excel Intelligence"
          subtitle="Analyze uploaded Excel workbooks."
        />

        {!data && (
          <Card>
            <div className="text-center py-12">
              <h2 className="text-2xl text-white">
                No Excel Workbook Found
              </h2>

              <p className="text-gray-400 mt-3">
                Upload an Excel workbook from the Documents page.
              </p>
            </div>
          </Card>
        )}

        {data && (
          <>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">

              <Card title="Rows">
                <div className="flex flex-col items-center justify-center h-24">
                  <h2 className="text-5xl font-bold text-white">
                    {data.rows.toLocaleString()}
                  </h2>
                </div>
              </Card>

              <Card title="Columns">
                <div className="flex flex-col items-center justify-center h-24">
                  <h2 className="text-5xl font-bold text-white">
                    {data.columns}
                  </h2>
                </div>
              </Card>

              <Card title="Sheets">
                <div className="flex flex-col items-center justify-center h-24">
                  <h2 className="text-5xl font-bold text-white">
                    {data.sheet_count}
                  </h2>
                </div>
              </Card>

              <Card title="Missing">
                <div className="flex flex-col items-center justify-center h-24">
                  <h2 className="text-5xl font-bold text-white">
                    {data.missing_values}
                  </h2>
                </div>
              </Card>

              <Card title="Duplicates">
                <div className="flex flex-col items-center justify-center h-24">
                  <h2 className="text-5xl font-bold text-white">
                    {data.duplicate_rows}
                  </h2>
                </div>
              </Card>

            </div>

            <div className="mt-8">

              <Card title="Workbook Information">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  <div>
                    <p className="text-gray-400">File Name</p>
                    <p className="text-white mt-1 font-medium">
                      {data.filename}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400">File Size</p>
                    <p className="text-white mt-1 font-medium">
                      {data.file_size_kb} KB
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400">Worksheets</p>
                    <p className="text-white mt-1 font-medium">
                      {data.sheet_count}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400">Sheet Names</p>
                    <p className="text-white mt-1 font-medium">
                      {data.sheet_names.join(", ")}
                    </p>
                  </div>

                </div>

              </Card>

            </div>

            <div className="mt-8">

              <Card title="Preview">

                <div className="overflow-x-auto overflow-y-auto max-h-[500px] rounded-lg border border-slate-700">

                  {data.preview.length > 0 ? (

                    <table className="w-max min-w-full text-sm">

                      <thead>

                        <tr>

                          {Object.keys(data.preview[0]).map((column) => (

                            <th
                              key={column}
                              className="sticky top-0 bg-slate-900 whitespace-nowrap px-4 py-3 text-left border-b border-slate-700 text-white"
                            >
                              {column}
                            </th>

                          ))}

                        </tr>

                      </thead>

                      <tbody>
                                              {data.preview.map((row, index) => (

                        <tr
                          key={index}
                          className="hover:bg-slate-800 transition"
                        >

                          {Object.values(row).map((value: any, i) => (

                            <td
                              key={i}
                              className="whitespace-nowrap px-4 py-3 border-b border-slate-800 text-gray-300"
                            >
                              {String(value)}
                            </td>

                          ))}

                        </tr>

                      ))}

                    </tbody>

                  </table>

                  ) : (

                    <div className="py-10 text-center text-gray-400">
                      No preview available.
                    </div>

                  )}

                </div>

              </Card>

            </div>

            <div className="mt-8">

              <Card title="🤖 AI Analysis">

                <div className="space-y-3">

                  <div className="flex items-center justify-between border-b border-slate-700 pb-3">

                    <div>

                      <h3 className="text-white text-lg font-semibold">
                        Workbook Health
                      </h3>

                      <p className="text-gray-400 text-sm">
                        Initial workbook diagnostics
                      </p>

                    </div>

                    <button
                      onClick={analyzeWorkbook}
                      disabled={analyzing}
                      className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 transition px-6 py-3 rounded-lg text-white font-medium"
                    >
                      {analyzing
                        ? "Analyzing..."
                        : "Analyze Workbook"}
                    </button>

                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mt-6">

                    <div className="bg-slate-800 rounded-lg p-4">

                      <p className="text-gray-400 text-sm">
                        Status
                      </p>

                      <p className="text-green-400 font-semibold mt-2">
                        Workbook Loaded Successfully
                      </p>

                    </div>

                    <div className="bg-slate-800 rounded-lg p-4">

                      <p className="text-gray-400 text-sm">
                        Records
                      </p>

                      <p className="text-white font-semibold mt-2">
                        {data.rows.toLocaleString()} Rows
                      </p>

                    </div>

                    <div className="bg-slate-800 rounded-lg p-4">

                      <p className="text-gray-400 text-sm">
                        Worksheets
                      </p>

                      <p className="text-white font-semibold mt-2">
                        {data.sheet_count}
                      </p>

                    </div>

                    <div className="bg-slate-800 rounded-lg p-4">

                      <p className="text-gray-400 text-sm">
                        Missing Values
                      </p>

                      <p className="text-white font-semibold mt-2">
                        {data.missing_values}
                      </p>

                    </div>

                  </div>

                  {analysis.length > 0 && (

                    <div className="mt-8">

                      <h3 className="text-xl font-semibold text-white mb-5">
                        AI Generated Insights
                      </h3>

                      <div className="space-y-3">

                        {analysis.map((item, index) => (

                          <div
                            key={index}
                            className="bg-slate-800 border border-slate-700 rounded-lg p-4 text-gray-300"
                          >
                            ✅ {item}
                          </div>

                        ))}

                      </div>

                    </div>

                  )}

                </div>

              </Card>

            </div>

            <div className="mt-8">

  <Card title="💬 Ask EndurMind AI">

    <textarea
      value={question}
      onChange={(e) => setQuestion(e.target.value)}
      placeholder="Ask anything about your workbook..."
      className="w-full h-32 rounded-lg bg-slate-800 border border-slate-700 text-white p-4 outline-none"
    />

    <button
      onClick={askAI}
      disabled={asking}
      className="mt-4 bg-blue-600 hover:bg-blue-700 rounded-lg px-6 py-3 text-white"
    >
      {asking ? "Thinking..." : "Ask AI"}
    </button>

    {answer && (

      <div className="mt-6 bg-slate-800 rounded-lg p-5 border border-slate-700">

        <h3 className="text-white font-semibold mb-3">
          AI Response
        </h3>

        <pre className="whitespace-pre-wrap text-gray-300">
          {answer}
        </pre>

      </div>

    )}

  </Card>

</div>

          </>

        )}

      </div>

    </DashboardLayout>

  );

}