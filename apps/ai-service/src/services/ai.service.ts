import { geminiAi } from "../config/gemeni.js";

export const generateContent = async (
  template: any,
  varibles: Record<string, string>,
) => {
  if (!template || typeof template !== "object") {
    throw new Error("Invalid template");
  }

  if (!template.content || typeof template.content !== "object") {
    throw new Error("Invalid template content");
  }

  const content = template.content;

  if (
    !content.systemPrompt ||
    !content.userPrompt ||
    !content.tone ||
    !content.maxLength
  ) {
    throw new Error(
      "Invalid AI template content: must include systemPrompt, userPrompt, tone, and maxLength",
    );
  }

  console.log("variables", varibles);

  const staticPrompt = `You are a professional notification assistant.
Your task is to generate clear, accurate, and engaging messages based on the provided context and variables.

Rules:
- Use ONLY the variables provided to you; do not invent or assume missing information.
- Replace variables naturally in the message where appropriate.
- Match the requested tone and communication style.
- Ensure the message is clear, concise, and easy to understand.
- Follow best practices for the specified communication channel.
- Do not include explanations, placeholders, or variable names in the final output.
- Return only the final message content.`;

  const fullPrompt = `
System: ${content?.systemPrompt || staticPrompt}

User: ${content.userPrompt}

Variables (JSON):
${JSON.stringify(varibles, null, 2)}

Tone: ${content.tone}
Max Length: ${content.maxLength} characters

You MUST return ONLY valid JSON.
NO explanations.
NO markdown.
NO extra text.

JSON format:
{
  "subject": "string",
  "body": "string"
}
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
