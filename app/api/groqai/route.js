// // /pages/api/groq.js (for App Router use /app/api/groq/route.js)
// import { groqClient } from "../../../lib/groqClient.js";

// export default async function handler(req, res) {
//     if (req.method !== "POST") return res.status(405).end();

//     const { prompt, model } = req.body;

//     try {
//         const response = await groqClient.post("/chat/completions", {
//             model: model || "llama3-70b-8192", // Default to LLaMA 3 70B
//             messages: [{ role: "user", content: prompt }],
//             temperature: 0.6,
//         });

//         res.status(200).json({ response: response.data.choices[0].message.content });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

// app/api/groqai/route.js
import { groqClient } from "@/lib/groqClient";

export async function POST(request) {
    const { prompt, model } = await request.json();

    try {
        const response = await groqClient.post("/chat/completions", {
            model: model || "llama3-70b-8192",
            messages: [{
                role: "system",
                content: "You are a professional F1 enthusiast. Your input includes the year of grand prix. Your output should strictly be the name of team and driver who won that.",
            },
            { role: "user", content: prompt }],
            temperature: 0.7,
        });

        return new Response(
            JSON.stringify({ response: response.data.choices[0].message.content }),
            {
                status: 200,
                headers: { "Content-Type": "application/json" },
            }
        );
    } catch (error) {
        console.error("Groq API error:", error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
