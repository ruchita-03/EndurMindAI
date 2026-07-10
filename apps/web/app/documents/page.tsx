"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";

interface DocumentFile {
  filename: string;
  size: number;
}

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<DocumentFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  async function loadDocuments() {
    try {
      const response = await fetch("http://127.0.0.1:8000/documents/");
      const data = await response.json();
      setDocuments(data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    loadDocuments();
  }, []);

  async function uploadFile() {
    if (!selectedFile) {
      alert("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/upload/", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        setSelectedFile(null);
        loadDocuments();
      } else {
        alert(data.detail);
      }
    } catch (err) {
      console.error(err);
      alert("Upload failed.");
    } finally {
      setLoading(false);
    }
  }

  function formatSize(bytes: number) {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / 1024 / 1024).toFixed(2) + " MB";
  }

  return (
    <DashboardLayout>
      <div className="p-8">

        <h1 className="text-3xl font-bold mb-8 text-white">
          📄 Document Management
        </h1>

        <div className="bg-slate-900 rounded-xl p-8 shadow-lg">

          <h2 className="text-xl font-semibold mb-4 text-white">
            Upload Document
          </h2>

          <input
            type="file"
            className="mb-5 text-white"
            onChange={(e) =>
              setSelectedFile(e.target.files?.[0] || null)
            }
          />

          <br />

          <button
            onClick={uploadFile}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-white"
          >
            {loading ? "Uploading..." : "Upload"}
          </button>

        </div>

        <div className="mt-10 bg-slate-900 rounded-xl p-6">

          <h2 className="text-xl font-semibold mb-5 text-white">
            Uploaded Documents
          </h2>

          <table className="w-full">

            <thead>

              <tr className="border-b border-gray-700">

                <th className="text-left py-3 text-gray-300">
                  File Name
                </th>

                <th className="text-left text-gray-300">
                  Size
                </th>

              </tr>

            </thead>

            <tbody>

              {documents.map((doc, index) => (

                <tr
                  key={index}
                  className="border-b border-gray-800"
                >

                  <td className="py-4 text-white">
                    {doc.filename}
                  </td>

                  <td className="text-gray-400">
                    {formatSize(doc.size)}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

          {documents.length === 0 && (
            <p className="text-gray-500 mt-4">
              No documents uploaded.
            </p>
          )}

        </div>

      </div>
    </DashboardLayout>
  );
}
