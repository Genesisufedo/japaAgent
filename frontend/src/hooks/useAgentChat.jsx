import { useState, useCallback } from "react";

export function useAgentChat() {
  const [loading, setLoading] = useState(false);

  const sendMessage = useCallback(async (conversationHistory, profile, schools, checklist, onChunkReceived) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: conversationHistory, profile, schools, checklist }),
      });

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
  }, []);

  return { sendMessage, loading };
}