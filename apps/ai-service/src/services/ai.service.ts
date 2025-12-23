import { geminiAi } from "../config/gemeni.js";

export const generateContent = async (prompt: string) => {
  if (!prompt || !prompt.trim()) {
    throw new Error("Prompt cannot be empty");
  }

  try {
    const response = await geminiAi.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    });

    return response.text;
  } catch (err) {
    console.error("Gemini API error:", err);
    throw err;
  }
};
