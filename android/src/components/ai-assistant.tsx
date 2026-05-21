'use client';

import { useState } from "react";

export default function AIAssistant() {
  const [message, setMessage] =
    useState("");

  const [reply, setReply] =
    useState(
      "Hello, I am Tradigo AI."
    );

  const [loading, setLoading] =
    useState(false);

  const askAI = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "/api/ai",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({
            message
          })
        }
      );

      const data =
        await response.json();

      setReply(data.reply);
    } catch (error) {
      setReply("AI Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 rounded-xl border space-y-4">
      <h2 className="text-2xl font-bold">
        Tradigo AI Assistant
      </h2>

      <input
        value={message}
        onChange={(e) =>
          setMessage(e.target.value)
        }
        placeholder="Ask AI..."
        className="border p-3 rounded-xl w-full text-black"
      />

      <button
        onClick={askAI}
        className="bg-black text-white px-5 py-3 rounded-xl"
      >
        {loading
          ? "Thinking..."
          : "Ask AI"}
      </button>

      <div className="border rounded-xl p-4">
        {reply}
      </div>
    </div>
  );
}
