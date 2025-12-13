import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateRoomVisualisation = async (
  roomImageBase64: string, 
  productName: string, 
  productDescription: string
): Promise<string> => {
  try {
    const ai = getClient();
    
    // Clean base64 string if it contains metadata
    const cleanBase64 = roomImageBase64.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: {
        parts: [
          {
            inlineData: {
              data: cleanBase64,
              mimeType: 'image/jpeg',
            },
          },
          {
            text: `Object Insertion Task:
                   Insert the following furniture product into the provided room image.
                   Product Name: ${productName}
                   Product Description: ${productDescription}
                   
                   Instructions:
                   1. Analyze the room's perspective, lighting, and available space.
                   2. Place the product naturally in the room (e.g., on the floor, replacing existing furniture if necessary).
                   3. Ensure the product matches the description (futuristic, sci-fi aesthetic).
                   4. Maintain the original room's details, shadows, and lighting conditions.
                   5. The output must be a high-quality photorealistic image of the room with the new product integrated.`
          },
        ],
      },
    });

    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }
    
    throw new Error("No image generated");
  } catch (error) {
    console.error("Gemini AR Error:", error);
    throw error;
  }
};

export const generateInteriorAdvice = async (query: string): Promise<string> => {
  try {
    const ai = getClient();
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: query,
      config: {
        systemInstruction: "You are an advanced AI interior designer for Aether, a futuristic furniture brand. Your advice is concise, visionary, and practical. Focus on lighting, space flow, and integration of smart technology."
      }
    });

    return response.text || "I was unable to generate advice.";
  } catch (error) {
    console.error("Gemini Advice Error:", error);
    return "Connection to Aether Core unstable. Please try again.";
  }
};