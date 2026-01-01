import { geminiAi } from "../config/gemeni.js";

export const generateContent = async (
  prompt: string,
  templateContent: { subject: string; body: string },
  varibles: Record<string, string>,
) => {
  if (!prompt || !prompt.trim()) {
    throw new Error("Prompt cannot be empty");
  }

  if (
    !templateContent ||
    typeof templateContent !== "object" ||
    !templateContent.subject ||
    !templateContent.body
  ) {
    throw new Error(
      "Invalid templateContent: must be an object with subject and body strings",
    );
  }

  console.log("varibales", varibles);

  const fullPrompt = `
${prompt}

You MUST return ONLY valid JSON.
NO explanations.
NO markdown.
NO extra text.

JSON format:
{
  "subject": "string",
  "body": "string"
}

Dummy Subject: ${templateContent.subject}
Dummy Body: ${templateContent.body}

use these variables only
variables: ${varibles}
`;

  try {
    const response = await geminiAi.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: fullPrompt }],
        },
      ],
    });

    const parsedResponse = JSON.parse(response.text!);
    if (!parsedResponse.subject || !parsedResponse.body) {
      throw new Error("AI response missing required 'subject' or 'body' keys");
    }
    return { subject: parsedResponse.subject, body: parsedResponse.body };
  } catch (err) {
    console.error("Gemini API error:", err);
    throw err;
  }
};
