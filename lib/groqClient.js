import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()

const GROQ_API_KEY = process.env.GROQ_API

export const groqClient = axios.create({
    baseURL: "https://api.groq.com/openai/v1", // GROQ's OpenAI-compatible endpoint
    headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
    },
});