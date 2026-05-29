import { useState } from "react";


export function useAnalyzeProfile() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const analyze = async (cvFile, transcriptFile) => {
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("cv", cvFile);
    formData.append("transcript", transcriptFile);

    try {
      const response = await fetch("http://localhost:8000/analyze", {
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