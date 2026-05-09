import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const key = process.env.GEMINI_API_KEY;

if (!key || key === "your_gemini_api_key_here") {
  console.error("❌ GEMINI_API_KEY is not set in .env");
  process.exit(1);
}

console.log("🔑 Key found:", key.slice(0, 10) + "...");

const genAI = new GoogleGenerativeAI(key);

try {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });
  const result = await model.generateContent("Say hello in one word.");
  console.log("✅ Gemini API works! Response:", result.response.text());
} catch (err) {
  console.error("❌ Gemini API Error:", err.message);
  if (err.message.includes("API_KEY_INVALID")) {
    console.error("👉 Fix: Get a valid key from https://aistudio.google.com/app/apikey");
  }
}
