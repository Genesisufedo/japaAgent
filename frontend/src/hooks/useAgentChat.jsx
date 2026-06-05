import { useState, useCallback } from "react";

export function useAgentChat() {
  const [loading, setLoading] = useState(false);
  
  // Pull the URL from the Vite environment variable
  const API_URL = import.meta.env.VITE_API_URL;

  const sendMessage = useCallback(async (conversationHistory, profile, schools, checklist, onChunkReceived) => {
    setLoading(true);
    try {
      // Use the dynamic API_URL
      const response = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: conversationHistory, profile, schools, checklist }),
      });

      if (!response.ok) {
        throw new Error(`Chat request failed: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        accumulatedText += decoder.decode(value, { stream: true });
        onChunkReceived(accumulatedText);
      }
    } catch (err) {
      console.error("Chat Error:", err);
    } finally {
      setLoading(false);
    }
  }, [API_URL]); // Added API_URL as a dependency

  return { sendMessage, loading };
}