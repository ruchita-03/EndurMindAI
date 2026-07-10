const API_BASE = "http://127.0.0.1:8000";

export async function getDocuments() {
  const response = await fetch(`${API_BASE}/documents`);

  if (!response.ok) {
    throw new Error("Failed to load documents");
  }

  return response.json();
}

export async function uploadDocument(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE}/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Upload failed");
  }

  return response.json();
}