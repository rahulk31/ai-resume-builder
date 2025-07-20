// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

import { GoogleGenAI } from "@google/genai";

export const generateSummaryAI = async ({
  role,
  experience,
  skills,
}: {
  role: string;
  experience: string;
  skills: string;
}) => {
  const prompt = `Write a resume's profile Summary for a ${role} with ${experience} experience having a skillset of ${skills}. Keep the summary within 150 words to the point no suggestions no crap exact 150 words. Make it look professional in human tone, clear and concise words to convey the message clearly to the recruiter.`;
  let outputText = "";
  const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GOOGLE_GEMINI_API_KEY,
  });
  const tools = [
    {
      googleSearch: {},
    },
  ];
  const config = {
    thinkingConfig: {
      thinkingBudget: -1,
    },
    tools,
    responseMimeType: "text/plain",
  };
  const model = "gemini-2.5-pro";
  const contents = [
    {
      role: "user",
      parts: [
        {
          text: prompt,
        },
      ],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });
  let fileIndex = 0;
  for await (const chunk of response) {
    console.log(chunk.text);
    if (chunk.text) {
      outputText += chunk.text;
    }
  }
  return outputText.trim();
};
