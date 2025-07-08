"use client";

import { useState } from "react";

export default function GroqPage() {
    const [prompt, setPrompt] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);

    const sendPrompt = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/groqai", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    prompt,
                    model: "llama3-70b-8192", // or "llama3-8b-8192", etc.
                }),
            });

            const data = await res.json();
            setResponse(data.response || data.error);
        } catch (error) {
            setResponse("Error: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Ask Groq (LLaMA 3)</h1>
            <textarea
                className="w-full p-2 border border-gray-400 rounded mb-4"
                rows={5}
                placeholder="Type your prompt here..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
            />
            <button
                className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
                onClick={sendPrompt}
                disabled={loading}
            >
                {loading ? "Generating..." : "Send to Groq"}
            </button>

            {response && (
                <div className="mt-6 p-4 bg-gray-100 rounded">
                    <h2 className="font-semibold mb-2">Response:</h2>
                    <p>{response}</p>
                </div>
            )}
        </div>
    );
}
