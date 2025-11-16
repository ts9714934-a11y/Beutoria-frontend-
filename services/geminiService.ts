import { GoogleGenAI, Type } from "@google/genai";
import type { AnalysisResult } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    overallScore: {
      type: Type.INTEGER,
      description: "An overall beauty score from 0 to 100, where 100 is best. This should be a holistic assessment.",
    },
    scores: {
      type: Type.ARRAY,
      description: "An array of scores for 8 specific facial attributes, categorized.",
      items: {
        type: Type.OBJECT,
        properties: {
          name: {
            type: Type.STRING,
            description: "The name of the attribute being scored (e.g., 'Skin Clarity', 'Facial Symmetry', 'Eye Radiance', 'Lip Volume', 'Brow Definition', 'Jawline Contour', 'Cheek Fullness', 'Facial Harmony').",
          },
          value: { type: Type.INTEGER, description: "The score for this attribute, from 0 to 100." },
          category: {
            type: Type.STRING,
            description: "The category for this attribute. Must be one of: 'Symmetry & Harmony', 'Skin Health', or 'Key Features'.",
          },
        },
        required: ["name", "value", "category"],
      },
    },
    enhancements: {
      type: Type.ARRAY,
      description: "An array of 3 key areas for improvement with constructive advice.",
      items: {
        type: Type.OBJECT,
        properties: {
          area: {
            type: Type.STRING,
            description: "The name of the area for enhancement (e.g., 'Improving Skin Texture', 'Brightening the Under-eye Area').",
          },
          problem: {
            type: Type.STRING,
            description: "A one-sentence description of the problem identified.",
          },
          solutions: {
            type: Type.ARRAY,
            description: "An array of 2-3 detailed, actionable solutions.",
            items: {
                type: Type.OBJECT,
                properties: {
                    title: { type: Type.STRING, description: "A short title for the solution (e.g., 'Hydration Routine', 'Concealer Technique')."},
                    description: { type: Type.STRING, description: "Detailed advice. Wrap key, actionable words or product types in double asterisks for highlighting, for example: 'Use a **vitamin C** serum in the morning.'."}
                },
                required: ["title", "description"]
            }
          }
        },
        required: ["area", "problem", "solutions"],
      },
    },
    summary: {
        type: Type.STRING,
        description: "A brief, positive and encouraging summary of the analysis, highlighting the best features."
    }
  },
  required: ["overallScore", "scores", "enhancements", "summary"],
};

export const analyzeImage = async (base64Image: string, mimeType: string): Promise<AnalysisResult> => {
  const imagePart = {
    inlineData: {
      data: base64Image,
      mimeType,
    },
  };

  const textPart = {
    text: `You are 'Beutoria', a world-class AI beauty analyst. Your tone is always positive, empowering, and scientific.
    Analyze this facial photo. Provide a detailed beauty analysis covering these 8 metrics: Skin Clarity, Facial Symmetry, Eye Radiance, Lip Volume, Brow Definition, Jawline Contour, Cheek Fullness, and Facial Harmony.
    - Categorize 'Facial Symmetry' and 'Facial Harmony' as 'Symmetry & Harmony'.
    - Categorize 'Skin Clarity' as 'Skin Health'.
    - Categorize the rest ('Eye Radiance', 'Lip Volume', 'Brow Definition', 'Jawline Contour', 'Cheek Fullness') as 'Key Features'.
    - For each of the 3 'enhancements', provide a short 'problem' description. Then provide 2-3 specific 'solutions'. Each solution should have a 'title' and a detailed 'description'. In the description, wrap the most important keywords (like ingredients or techniques) in double asterisks for highlighting (e.g., **hyaluronic acid** or **blending upwards**).
    - Conclude with an uplifting summary celebrating the user's best features.`
  };
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: { parts: [imagePart, textPart] },
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const jsonString = response.text;
    const result = JSON.parse(jsonString);
    
    // Basic validation
    if (!result.overallScore || !result.scores || !result.enhancements || !result.summary) {
        throw new Error("Invalid response structure from API.");
    }

    return result as AnalysisResult;

  } catch (error) {
    console.error("Gemini API call failed:", error);
    throw new Error("Failed to get analysis from the AI. The model may have returned an unexpected format.");
  }
};