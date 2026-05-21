'use client';

import { useState } from "react";

export default function AIAssistant() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("Hello, I am Tradigo AI.");

  const askAI = async () => {
    const response = await fetch("/api/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message
      })
    });

    const data = await response.json();

    setReply(data.reply);
  };

  return (
    <div className="p-4 border rounded-xl space-y-4">
      <h2 className="text-xl font-bold">
        Tradigo AI Assistant
      </h2>

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask AI..."
        className="border p-2 rounded-lg w-full text-black"
      />

      <button
        onClick={askAI}
        className="bg-black text-white px-4 py-2 rounded-lg"
      >
        Ask AI
      </button>

      <div className="border p-3 rounded-lg">
        {reply}
      </div>
    </div>
  );
}
