import { useState } from "react";

export function useAnalyzeProfile() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Pull the URL from the Vite environment variable
  const API_URL = import.meta.env.VITE_API_URL;

  const analyze = async (cvFile, transcriptFile) => {
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("cv", cvFile);
    formData.append("transcript", transcriptFile);

    try {
      // Use the dynamic API_URL here
      const response = await fetch(`${API_URL}/analyze`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Evaluation failed with status: ${response.status}`);
      }

      return await response.json();
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { analyze, loading, error };
}