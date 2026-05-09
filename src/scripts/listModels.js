import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// List all available models
const response = await fetch(
  `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`
);
const data = await response.json();

if (data.models) {
  console.log("✅ Available models:");
  data.models
    .filter(m => m.supportedGenerationMethods?.includes("generateContent"))
    .forEach(m => console.log(" -", m.name));
} else {
  console.error("❌ Error:", JSON.stringify(data));
}
