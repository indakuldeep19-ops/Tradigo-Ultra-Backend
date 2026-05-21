"use client";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export default function VoiceAI() {

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <div>Browser does not support speech recognition.</div>;
  }

  return (
    <div className="p-4 rounded-2xl bg-black text-white">
      <h2 className="text-xl font-bold mb-4">
        Tradigo Voice AI
      </h2>

      <p className="mb-4">{transcript}</p>

      <div className="flex gap-2">

        <button
          onClick={() =>
            SpeechRecognition.startListening({
              continuous: true,
            })
          }
          className="px-4 py-2 rounded-xl bg-green-600"
        >
          Start
        </button>

        <button
          onClick={SpeechRecognition.stopListening}
          className="px-4 py-2 rounded-xl bg-red-600"
        >
          Stop
        </button>

        <button
          onClick={resetTranscript}
          className="px-4 py-2 rounded-xl bg-gray-700"
        >
          Reset
        </button>

      </div>

      <p className="mt-4">
        {listening ? "Listening..." : "Stopped"}
      </p>
    </div>
  );
}
