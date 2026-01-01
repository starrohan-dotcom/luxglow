
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getDesignAdvice = async (userPrompt: string, history: any[]): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history,
        { role: 'user', parts: [{ text: userPrompt }] }
      ],
      config: {
        systemInstruction: "You are 'LuxGlow Assistant', a world-class interior designer and lighting specialist. Help customers choose the right lamp from our catalog based on their room style (modern, industrial, bohemian, etc.). Be professional, helpful, and creative. If they describe a room, suggest a category or specific type of lamp (Pendant, Floor, Table).",
        temperature: 0.7,
      }
    });
    return response.text || "I'm sorry, I couldn't process that. How else can I help you with your lighting design?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having a bit of trouble connecting to my design database. Please try again in a moment!";
  }
};

export const generateProductPitch = async (productName: string, category: string): Promise<string | null> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Write a 2-sentence highly persuasive and luxury marketing pitch for a ${category} lamp named '${productName}'. Focus on ambiance and elegance.`,
      config: {
        temperature: 0.9,
      }
    });
    return response.text || null;
  } catch (error) {
    return null;
  }
};
