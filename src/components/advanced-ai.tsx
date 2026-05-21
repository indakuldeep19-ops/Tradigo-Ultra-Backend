'use client';

import { useEffect, useState } from "react";

export default function AdvancedAI() {
  const [message, setMessage] =
    useState("");

  const [reply, setReply] =
    useState(
      "Tradigo AI Activated."
    );

  const [systemStatus, setSystemStatus] =
    useState("Monitoring app...");

  useEffect(() => {
    const monitor = setInterval(() => {
      setSystemStatus(
        "AI monitoring app performance..."
      );
    }, 5000);

    return () =>
      clearInterval(monitor);
  }, []);

  const askAI = async () => {
    try {
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
      setReply(
        "AI system detected an issue."
      );
    }
  };

  return (
    <div className="p-4 border rounded-xl space-y-4">
      <h2 className="text-2xl font-bold">
        Tradigo Auto AI
      </h2>

      <div className="text-sm">
        {systemStatus}
      </div>

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
        Ask AI
      </button>

      <div className="border rounded-xl p-4">
        {reply}
      </div>
    </div>
  );
}
