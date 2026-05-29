const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const analyzeProfile = async (formData) => {
  const res = await fetch(`${API_URL}/analyze`, {
    method: 'POST',
    body: formData
  });
  if (!res.ok) throw new Error("Analysis failed");
  return res.json();
};

export const chatWithAgent = async (body) => {
  const res = await fetch(`${API_URL}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error("Chat failed");
  return res.body;
};